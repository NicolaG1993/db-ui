import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { shuffle } from "@/src/application/utils/orderData";
import calcTournamentStructure from "@/src/domains/tournament/utils/calcTournamentStructure";

const initialState = {
    tournamentData: Cookies.get("tournamentData")
        ? JSON.parse(Cookies.get("tournamentData"))
        : [],
    isLoaded: false,
    tournamentTable: {
        setup: {
            totMatches: undefined,
            contendersPerMatch: undefined,
        }, // honestly after setting tournamentTable becomes useless - we could not store this, if not as pure infos
        tournamentStructure: undefined,
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
            const { contendersPerMatch, order } = action.payload;
            ////new Version
            const result = calcTournamentStructure({
                allContenders: state.tournamentData,
                contendersPerMatch,
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
            state.tournamentTable = {
                setup: {
                    contendersPerMatch,
                    totStages: result.totStages + 1,
                    tableRows: result.tableRows,
                    tableColumns: (result.totStages - 1) * 2 + 2,
                    totMatches: result.totMatches,
                    totContenders: result.totMatches * contendersPerMatch,
                },
                tournamentStructure: result.tournamentStructure,
            };
        },
    },
});

export const {
    updateTournamentData,
    shuffleTournamentData,
    resetTournamentStore,
    setupTournament,
} = tournamentSlice.actions;

export const selectTournamentData = (state) =>
    state.tournamentStore.tournamentData;
export const selectTournamentIsLoaded = (state) =>
    state.tournamentStore.isLoaded;
export const selectTournamentStructure = (state) =>
    state.tournamentStore.tournamentTable.tournamentStructure;
export const selectTournamentSetup = (state) =>
    state.tournamentStore.tournamentTable.setup;

export default tournamentSlice;
