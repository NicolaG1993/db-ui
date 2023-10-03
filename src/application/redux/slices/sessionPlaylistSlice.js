import { shuffle } from "@/src/lib/domains/_app/actions/orderData.js";
import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const initialState = {
    sessionPlaylist: Cookies.get("sessionPlaylist")
        ? JSON.parse(Cookies.get("sessionPlaylist"))
        : [],
};

const sessionPlaylistSlice = createSlice({
    name: "sessionPlaylist",
    initialState,
    reducers: {
        addToSessionPlaylist: (state, action) => {
            let newState = state.sessionPlaylist;
            newState.push(action.payload);
            Cookies.set("sessionPlaylist", JSON.stringify(newState));
            state.sessionPlaylist = newState;
        },
        removeFromSessionPlaylist: (state, action) => {
            let newState = state.sessionPlaylist;
            newState.splice(action.payload, 1);
            Cookies.set("sessionPlaylist", JSON.stringify(newState));
            state.sessionPlaylist = newState;
        },
        shuffleSessionPlaylist: (state, action) => {
            let newState = shuffle(state.sessionPlaylist);
            Cookies.set("sessionPlaylist", JSON.stringify(newState));
            state.sessionPlaylist = newState;
        },
        deleteSessionPlaylist: (state) => {
            Cookies.remove("sessionPlaylist");
            state.sessionPlaylist = [];
        },
    },
});

export const {
    addToSessionPlaylist,
    removeFromSessionPlaylist,
    shuffleSessionPlaylist,
    deleteSessionPlaylist,
} = sessionPlaylistSlice.actions;
export const selectSessionPlaylist = (state) =>
    state.sessionPlaylist.sessionPlaylist;
export default sessionPlaylistSlice;
