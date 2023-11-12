import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { shuffle } from "@/src/application/utils/orderData";

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
        // used to remove directly from playlist
        removeFromSessionPlaylist: (state, action) => {
            let newState = state.sessionPlaylist;
            newState.splice(action.payload, 1);
            Cookies.set("sessionPlaylist", JSON.stringify(newState));
            state.sessionPlaylist = newState;
        },
        // used to remove playlist element from outside playlist
        removeElementFromSessionPlaylist: (state, action) => {
            let newState = state.sessionPlaylist;
            if (action.payload.id) {
                newState = newState.filter(
                    ({ id }) => id !== action.payload.id
                );
            } else if (action.payload.url) {
                newState = newState.filter(
                    ({ url }) => url !== action.payload.url
                );
            }
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

        loadSessionPlaylist: (state, action) => {
            Cookies.set("sessionPlaylist", JSON.stringify(action.payload));
            state.sessionPlaylist = action.payload;
        },
    },
});

export const {
    addToSessionPlaylist,
    removeFromSessionPlaylist,
    removeElementFromSessionPlaylist,
    shuffleSessionPlaylist,
    deleteSessionPlaylist,
    loadSessionPlaylist,
} = sessionPlaylistSlice.actions;

export const selectSessionPlaylist = (state) =>
    state.sessionPlaylist.sessionPlaylist;

export default sessionPlaylistSlice;
