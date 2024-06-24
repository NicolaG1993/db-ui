import { createSlice, current } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { shuffle } from "@/src/application/utils/orderData";
import calcTournamentStructure from "@/src/domains/tournament/utils/calcTournamentStructure";
import generateTableSequences from "@/src/domains/tournament/utils/generateTableSequences";
import setupNextStageMatch from "@/src/domains/tournament/utils/setupNextStageMatch";
import setupFinalStages from "@/src/domains/tournament/utils/setupFinalStages";
import filterKeys from "@/src/domains/tournament/utils/filterKeys";
import getCurrentMatchLoser from "@/src/domains/tournament/utils/getCurrentMatchLoser";

// utility function to check for the presence of sessionStorage.
const isBrowser = () =>
    typeof window !== "undefined" &&
    typeof window.sessionStorage !== "undefined";
// Function to get data from sessionStorage
function getStoredData(name) {
    if (isBrowser() && sessionStorage.getItem(name)) {
        const storedData = sessionStorage.getItem(name);
        return storedData ? JSON.parse(storedData) : [];
    }
} // make utils 🧠
function getStoredCookie(name) {
    return Cookies.get(name) ? JSON.parse(Cookies.get(name)) : [];
}
function getStoredSettings() {
    return Cookies.get("tournamentSettings")
        ? JSON.parse(Cookies.get("tournamentSettings"))
        : { contendersPerMatch: 2, totContenders: undefined, order: "index" };
}

const initialState = {
    // tournamentData: Cookies.get("tournamentData")
    //     ? JSON.parse(Cookies.get("tournamentData"))
    //     : [],
    tournamentData: getStoredData("tournamentData"),
    notSelectedData: getStoredData("notSelectedData"),
    isLoaded: false,
    isStarted: false,
    isFinished: false,
    tournamentTable: {
        setup: {
            ...getStoredSettings(),
            totStages: undefined,
            tableRows: undefined,
            tableColumns: undefined,
            totMatches: undefined,
            tableRowsSequences: undefined,
            firstStageTotMatches: undefined,
        }, // honestly after setting tournamentTable becomes useless - we could not store this, if not as pure infos
        tournamentStructure: undefined,
        matchError: undefined,
        tournamentFinalOverview: { podium: {} },
        // matchSelectorNav: undefined,
    }, // probably need cookies only here
};

const tournamentSlice = createSlice({
    name: "tournament",
    initialState,
    reducers: {
        updateTournamentData: (state, action) => {
            if (action.payload) {
                // Serialize the array to a JSON string
                const serializedArray = JSON.stringify(action.payload); // TOO BIG FOR COOKIE
                // Cookies.set("tournamentData", serializedArray);
                sessionStorage.setItem("tournamentData", serializedArray);

                console.log(" 🟨 updateTournamentData: ", {
                    payload: action.payload,
                    serializedArray,
                });

                state.tournamentData = action.payload;
                state.isLoaded = true;
            }
        },
        shuffleTournamentData: (state) => {
            state.isLoaded = false;
            let newState = shuffle(state.tournamentData);
            Cookies.set("tournamentData", JSON.stringify(newState));
            state.tournamentData = action.payload;
            state.isLoaded = true;
        },
        resetTournamentStore: () => {
            Cookies.remove("tournamentData");
            return initialState;
        },
        resetTournament: (state) => {
            // TODO:
            // go back to table first render // dont reset the whole store! we have resetTournamentStore for that already
            // solve the annoying page reload issue, seams related
        },
        setupTournament: (state, action) => {
            // group contenders for first phase (create matches)
            // calculate total phases
            // store groups and use the to render the table
            /* {
                sedicesimi: [[1, 2], [3, 4], ...],
                ottavi: undefined,
                quarti: undefined,
                semifinale: undefined,
                finale: undefined,
            }  
            */
            // let { contendersPerMatch, order, totContenders } = action.payload;
            // use stored values if payload doesnt provide them

            let contendersPerMatch =
                !action.payload?.contendersPerMatch &&
                state.tournamentTable.setup.contendersPerMatch
                    ? state.tournamentTable.setup.contendersPerMatch
                    : action.payload?.contendersPerMatch ||
                      initialState.tournamentTable.setup.contendersPerMatch;

            let order =
                !action.payload?.order && state.tournamentTable.setup.order
                    ? state.tournamentTable.setup.order
                    : action.payload?.order ||
                      initialState.tournamentTable.setup.order;

            let totContenders =
                !action.payload?.totContenders &&
                state.tournamentTable.setup.totContenders
                    ? state.tournamentTable.setup.totContenders
                    : action.payload?.totContenders |
                      initialState.tournamentTable.setup.totContenders;

            const serializedData = JSON.stringify({
                contendersPerMatch,
                order,
                totContenders,
            });
            Cookies.set("tournamentSettings", serializedData);

            ////new Version
            const result = calcTournamentStructure({
                allContenders: state.tournamentData,
                contendersPerMatch,
                totContenders,
            });
            console.log("💫 result 💫: ", result);

            /* 
            const totMatches = Math.ceil(
                state.tournamentData.length / contendersPerMatch
            );

            // group first matches
            let matches = [];

            let matchAccumulator = [];
            state.tournamentData.map((it, i, arr) => {
                matchAccumulator.push(it);
                if (
                    (i + 1) % contendersPerMatch === 0 ||
                    // (i + 1) / contendersPerMatch === 1 ||
                    arr.length - 1 === i
                ) {
                    matches.push(matchAccumulator);
                    matchAccumulator = [];
                }
            });

            // calculate table route
            // ...totMatches....
            const totBlocks = Math.ceil(totMatches / 4);

            // set state
            state.tournamentTable = {
                setup: { contendersPerMatch, totMatches, totBlocks },
                matches,
            };
            */
            console.log(
                "state.tournamentData.slice(totContenders): ",
                current(state.tournamentData).slice(totContenders)
            );
            state.notSelectedData = [...state.tournamentData].slice(
                totContenders
            );

            const serializedArray = JSON.stringify(state.notSelectedData);
            sessionStorage.setItem("notSelectedData", serializedArray);

            let setup = {
                ...state.tournamentTable.setup,
                // totContenders:
                //     result.firstStageTotMatches * contendersPerMatch,
                totContenders,
                order,
                contendersPerMatch,
                totStages: result.totStages + 1,
                tableRows: result.tableRows * 2,
                tableColumns: (result.totStages - 1) * 2 + 2,
                totMatches: result.totMatches,
                tableRowsSequences: generateTableSequences(
                    result.tableRows * 2
                ),
                firstStageTotMatches: result.firstStageTotMatches,
            };

            state.tournamentTable = {
                ...state.tournamentTable,
                setup,
                tournamentStructure: result.tournamentStructure,
            };
        },
        updateFirstStage: (state, action) => {
            const { newCurrentMatch, newSelectedMatch } = action.payload;

            const firstStage =
                state.tournamentTable.tournamentStructure["1"].stageMatches;

            if (newCurrentMatch && newSelectedMatch) {
                // switch contenders between matches
                const newFirstStage = {
                    ...firstStage,
                    [newCurrentMatch.matchId]: newCurrentMatch,
                    [newSelectedMatch.matchId]: newSelectedMatch,
                };

                state.tournamentTable.tournamentStructure["1"].stageMatches =
                    newFirstStage;
            } else if (newCurrentMatch && !newSelectedMatch) {
                // simply update match
                const newFirstStage = {
                    ...firstStage,
                    [newCurrentMatch.matchId]: newCurrentMatch,
                };
                state.tournamentTable.tournamentStructure["1"].stageMatches =
                    newFirstStage;
            }
        },
        updateMatchError: (state, action) => {
            state.tournamentTable.matchError = action.payload.matchId;
        },
        startTournament: (state) => {
            // todo: check if firstMatch é stato riempito
            state.isStarted = true;
            // se no torna error
        },
        quitTournament: (state) => {
            state.isStarted = false;
            // Todo...
            // posso usare direttamente resetTournamentStore()? 🧠
        },
        initNextMatch: (state, action) => {
            state.tournamentTable.matchError = undefined;
            // TODO: use this action when a new match is open (next stage)
            // setup new match
            // check for errors here ? maybe before ? in component?

            const { firstStageTotMatches, contendersPerMatch } =
                state.tournamentTable.setup;

            if (
                state.tournamentData.length ===
                firstStageTotMatches * contendersPerMatch
            ) {
                // Do action ....
            } else {
                // Error: Missing contenders.
                // TODO: map data and select first match without contenders
                state.tournamentTable.matchError = 16; // tournamentData.length / 2 + 1; // test 🟨 // mi serve .ceil() ???
                // 🔴🔴🔴 Error not showing up in table!
            }
        },
        updateNotSelectedData: (state, action) => {
            const { toAdd, toRemove } = action.payload;
            let newData = state.notSelectedData;
            if (toAdd && toRemove) {
                state.notSelectedData = newData.map((el) =>
                    el.id !== toRemove.id ? el : toAdd
                );
            } else {
                if (toAdd) {
                    newData.push(toAdd);
                    state.notSelectedData = newData;
                } else if (toRemove) {
                    state.notSelectedData = newData.filter(
                        (el) => el.id !== toRemove.id
                    );
                }
            }
        },
        setMatchWinner: (state, action) => {
            const { stage, match, winner } = action.payload;
            const isSemifinals =
                stage.stageId === state.tournamentTable.setup.totStages - 1;
            const isFinalStage =
                stage.stageId === state.tournamentTable.setup.totStages ||
                stage.stageId === state.tournamentTable.setup.totStages + 1;

            // update current match and stage
            let newMatch = { ...match, winner };
            let newStageMatches = {
                ...stage.stageMatches,
                [`${match.matchId}`]: newMatch,
            };
            let newStage = { ...stage, stageMatches: newStageMatches };

            // update current stage in state
            state.tournamentTable.tournamentStructure[stage.stageId] = newStage;

            if (!isSemifinals && !isFinalStage) {
                // update next match and stage

                // TODO: 👇🧠
                /**
                 * get next stage and next match dynamicaly
                 * update them
                 * update store
                 */
                let nextStage =
                    state.tournamentTable.tournamentStructure[
                        `${stage.stageId + 1}`
                    ];
                // let nextMatch = nextStage

                ////// TESTING  👇
                let totPrevStageMatches = stage.stageMatches.length; // 8
                let totNextStageMatches = nextStage.stageMatches.length; // 4
                let prevMatchId = match.matchId; // 3

                // let { evenKeys, oddKeys } = filterKeys(stage.stageMatches);
                let isEven = match.matchId % 2 === 0;

                let res1 = filterKeys(newStage.stageMatches);
                let currentMatchesColumn = isEven
                    ? res1.evenKeys
                    : res1.oddKeys;

                let res2 = filterKeys(nextStage.stageMatches);
                let nextMatchesColumn = isEven ? res2.evenKeys : res2.oddKeys;

                let currentMatchIndex;
                Object.values(currentMatchesColumn).map((match, i) => {
                    if (match.matchId === newMatch.matchId) {
                        currentMatchIndex = i;
                    }
                });

                const result = setupNextStageMatch({
                    // selected: currentMatchIndex,
                    currentMatchesColumn,
                    nextMatchesColumn,
                    currentMatch: newMatch,
                    currentMatchIndex,
                    // currentMatches: newStage.stageMatches,
                    // nextMatches: nextStage.stageMatches,
                    // matchId: newMatch.matchId,
                    // contenderId: winner.id,
                });
                console.log(
                    "🧠🧠🧠🧠🧠🧠🧠🧠🧠setupNextStageMatch🧠🧠🧠🧠🧠🧠🧠🧠🧠",
                    {
                        result,
                        // nextStage: {
                        //     ...nextStage,
                        //     ...result.newNextColumn,
                        // },
                        nextStage: current(nextStage),
                        // newNextColumn: { ...result.newNextColumn },
                    }
                );

                // Object.values(result.newNextColumn).map((el) =>
                //     console.log("EL from result.newNextColumn: ", current(el))
                // );

                let newNextStageMatches = {
                    ...nextStage.stageMatches,
                    ...result.newNextColumn,
                };

                state.tournamentTable.tournamentStructure[nextStage.stageId] = {
                    ...nextStage,
                    stageMatches: newNextStageMatches,
                };
            } else if (isFinalStage) {
                // TODO .... 🧠🧠🧠🧠🧠🧠
                // dont check for next stage logic
                // set final object for result overview
                // // like: top 3, more votes, mvp's, etc...

                let tournamentFinalOverview = {
                    ...state.tournamentTable.tournamentFinalOverview,
                };
                console.log(
                    "🦉💫➡️ state.tournamentTable: ",
                    current(state.tournamentTable)
                );
                let podium = {
                    ...tournamentFinalOverview.podium,
                };
                if (
                    stage.stageId ===
                    state.tournamentTable.setup.totStages + 1
                ) {
                    // is finalMatch

                    // tournamentFinalOverview.podium = {
                    //     ...tournamentFinalOverview.podium,
                    // };

                    podium = {
                        ...podium,
                        1: winner,
                        2: getCurrentMatchLoser(
                            newMatch.contenders,
                            newMatch.winner
                        ),
                    };

                    // tournamentFinalOverview.podium["1"] = winner;
                    // tournamentFinalOverview.podium["2"] = getCurrentMatchLoser(
                    //     currentMatch.contenders,
                    //     currentMatch.winner
                    // );
                } else {
                    // is thirdPlaceMatch
                    podium = {
                        ...podium,
                        3: winner,
                    };
                    // tournamentFinalOverview.podium["3"] = winner;
                }

                state.tournamentTable.tournamentFinalOverview = {
                    ...tournamentFinalOverview,
                    podium,
                };

                // end tournament
                state.isFinished = true;
            } else if (isSemifinals) {
                //////////// FIX: 3rdPlace not working!!!! 🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴

                // set Final
                let finalStage =
                    state.tournamentTable.tournamentStructure[
                        `${state.tournamentTable.setup.totStages + 1}`
                    ];
                // set 3rd-Place
                let thirdPlaceStage =
                    state.tournamentTable.tournamentStructure[
                        `${state.tournamentTable.setup.totStages}`
                    ];
                console.log(
                    "thirdPlaceStage 🔴🔴🔴🔴🔴🔴🔴: ",
                    current(thirdPlaceStage)
                );

                let isEven = match.matchId % 2 === 0;

                let currentMatchIndex = 0;
                // let currentMatchIndex;
                // Object.values(newStage.stageMatches).map((match, i) => {
                //     if (match.matchId === newMatch.matchId) {
                //         currentMatchIndex = i;
                //     }
                // });

                const totMatches = state.tournamentTable.setup.totMatches;
                const totStages = state.tournamentTable.setup.totStages;

                const { newThirdPlaceStage, newFinalStage } = setupFinalStages({
                    // currentMatchesColumn,
                    finalStage,
                    thirdPlaceStage,
                    currentMatch: newMatch,
                    currentMatchIndex,
                    isEven,
                    totMatches,
                });

                Object.values(newFinalStage.stageMatches).map((el) =>
                    console.log(
                        "EL from newFinalStage.stageMatches): ",
                        current(el)
                    )
                );
                Object.values(newThirdPlaceStage.stageMatches).map((el) =>
                    console.log(
                        "EL from newThirdPlaceStage.stageMatches): ",
                        current(el)
                    )
                );

                state.tournamentTable.tournamentStructure[totStages + 1] =
                    newFinalStage;
                state.tournamentTable.tournamentStructure[totStages] =
                    newThirdPlaceStage;
            }
        },
    },
});

export const {
    updateTournamentData,
    shuffleTournamentData,
    resetTournamentStore,
    setupTournament,
    resetTournament,
    updateFirstStage,
    updateMatchError,
    startTournament,
    quitTournament,
    initNextMatch,
    updateNotSelectedData,
    setMatchWinner,
} = tournamentSlice.actions;

export const selectTournamentData = (state) =>
    state.tournamentStore.tournamentData;
export const selectNotSelectedData = (state) =>
    state.tournamentStore.notSelectedData;
export const selectTournamentIsLoaded = (state) =>
    state.tournamentStore.isLoaded;
export const selectTournamentIsStarted = (state) =>
    state.tournamentStore.isStarted;
export const selectTournamentStructure = (state) =>
    state.tournamentStore.tournamentTable.tournamentStructure;
export const selectTournamentSetup = (state) =>
    state.tournamentStore.tournamentTable.setup;
export const selectMatchError = (state) =>
    state.tournamentStore.tournamentTable.matchError;

export default tournamentSlice;
