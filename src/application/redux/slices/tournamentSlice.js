import { createSlice, current } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { shuffle } from "@/src/application/utils/orderData";
import calcTournamentStructure from "@/src/domains/tournament/utils/calcTournamentStructure";
import generateTableSequences from "@/src/domains/tournament/utils/generateTableSequences";
import getNextStageMatch from "@/src/domains/tournament/utils/getNextStageMatch";
import filterKeys from "@/src/domains/tournament/utils/filterKeys";

const initialState = {
    tournamentData: Cookies.get("tournamentData")
        ? JSON.parse(Cookies.get("tournamentData"))
        : [],
    notSelectedData: [], // need cookie here 🧠
    isLoaded: false,
    isStarted: false,
    tournamentTable: {
        setup: {
            contendersPerMatch: undefined,
            totStages: undefined,
            tableRows: undefined,
            tableColumns: undefined,
            totMatches: undefined,
            totContenders: undefined,
            tableRowsSequences: undefined,
            firstStageTotMatches: undefined,
        }, // honestly after setting tournamentTable becomes useless - we could not store this, if not as pure infos
        tournamentStructure: undefined,
        matchError: undefined,
        // matchSelectorNav: undefined,
    }, // probably need cookies only here
};

const tournamentSlice = createSlice({
    name: "tournament",
    initialState,
    reducers: {
        updateTournamentData: (state, action) => {
            Cookies.set("tournamentData", JSON.stringify(action.payload));
            state.tournamentData = action.payload;
            state.isLoaded = true;
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
            const { contendersPerMatch, order, totContenders } = action.payload;
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
                state.tournamentData.slice(totContenders)
            );
            state.notSelectedData = [...state.tournamentData].slice(
                totContenders
            );
            state.tournamentTable = {
                setup: {
                    contendersPerMatch,
                    totStages: result.totStages + 1,
                    tableRows: result.tableRows * 2,
                    tableColumns: (result.totStages - 1) * 2 + 2,
                    totMatches: result.totMatches,
                    // totContenders:
                    //     result.firstStageTotMatches * contendersPerMatch,
                    totContenders,
                    tableRowsSequences: generateTableSequences(
                        result.tableRows * 2
                    ),
                    firstStageTotMatches: result.firstStageTotMatches,
                },
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

            // update current match and stage
            let newMatch = { ...match, winner };
            let newStageMatches = {
                ...stage.stageMatches,
                [`${match.matchId}`]: newMatch,
            };
            let newStage = { ...stage, stageMatches: newStageMatches };

            // update current stage in state
            state.tournamentTable.tournamentStructure[stage.stageId] = newStage;

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
            let currentMatchesColumn = isEven ? res1.evenKeys : res1.oddKeys;

            let res2 = filterKeys(nextStage.stageMatches);
            let nextMatchesColumn = isEven ? res2.evenKeys : res2.oddKeys;

            // .... 🧠🧠🧠
            const result = getNextStageMatch({
                // selected: currentMatchIndex,
                currentMatchesColumn,
                nextMatchesColumn,
                currentMatch: newMatch,
                // currentMatches: newStage.stageMatches,
                // nextMatches: nextStage.stageMatches,
                // matchId: newMatch.matchId,
                // contenderId: winner.id,
            });
            console.log(
                "🧠🧠🧠🧠🧠🧠🧠🧠🧠getNextStageMatch🧠🧠🧠🧠🧠🧠🧠🧠🧠",
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

            Object.values(result.newNextColumn).map((el) =>
                console.log("EL from result.newNextColumn: ", current(el))
            );

            let newNextStageMatches = {
                ...nextStage.stageMatches,
                ...result.newNextColumn,
            };

            state.tournamentTable.tournamentStructure[nextStage.stageId] = {
                ...nextStage,
                stageMatches: newNextStageMatches,
            };
        },
    },
});

export const {
    updateTournamentData,
    shuffleTournamentData,
    resetTournamentStore,
    setupTournament,
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