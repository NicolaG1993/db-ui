import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { shuffle } from "@/src/application/utils/orderData";

const initialState = {
    tournamentData: Cookies.get("tournamentData")
        ? JSON.parse(Cookies.get("tournamentData"))
        : [],
    isLoaded: false,
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
    },
});

export const {
    updateTournamentData,
    shuffleTournamentData,
    resetTournamentStore,
} = tournamentSlice.actions;

export const selectTournamentData = (state) =>
    state.tournamentStore.tournamentData;
export const selectTournamentIsLoaded = (state) =>
    state.tournamentStore.isLoaded;

export default tournamentSlice;
