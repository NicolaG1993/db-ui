import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { shuffle } from "@/src/application/utils/orderData";
import { getStoredData } from "@/src/domains/_app/utils/getStoredData";

const initialState = {
    sessionPlaylist: getStoredData("sessionPlaylist"),
};

// TESTARE: Ho due tab aperte e modifico SessionPlaylist da entrambe
// devo sempre guardare cosa giá cé in cookie
const sessionPlaylistSlice = createSlice({
    name: "sessionPlaylist",
    initialState,
    reducers: {
        addToSessionPlaylist: (state, action) => {
            let newState = getStoredData("sessionPlaylist")
                ? getStoredData("sessionPlaylist")
                : state.sessionPlaylist;
            newState.push(action.payload);
            sessionStorage.setItem("sessionPlaylist", JSON.stringify(newState));
            state.sessionPlaylist = newState;
        },
        // used to remove directly from playlist
        removeFromSessionPlaylist: (state, action) => {
            let newState = getStoredData("sessionPlaylist")
                ? getStoredData("sessionPlaylist")
                : state.sessionPlaylist;
            newState.splice(action.payload, 1);
            sessionStorage.setItem("sessionPlaylist", JSON.stringify(newState));
            state.sessionPlaylist = newState;
        },
        // used to remove playlist element from outside playlist
        removeElementFromSessionPlaylist: (state, action) => {
            let newState = getStoredData("sessionPlaylist")
                ? getStoredData("sessionPlaylist")
                : state.sessionPlaylist;
            if (action.payload.id) {
                newState = newState.filter(
                    ({ id }) => id !== action.payload.id
                );
            } else if (action.payload.url) {
                newState = newState.filter(
                    ({ url }) => url !== action.payload.url
                );
            }
            sessionStorage.setItem("sessionPlaylist", JSON.stringify(newState));
            state.sessionPlaylist = newState;
        },

        shuffleSessionPlaylist: (state, action) => {
            let newState = shuffle(state.sessionPlaylist);
            sessionStorage.setItem("sessionPlaylist", JSON.stringify(newState));
            state.sessionPlaylist = newState;
        },

        deleteSessionPlaylist: (state) => {
            Cookies.remove("sessionPlaylist");
            state.sessionPlaylist = [];
        },

        loadSessionPlaylist: (state, action) => {
            sessionStorage.setItem(
                "sessionPlaylist",
                JSON.stringify(action.payload)
            );
            state.sessionPlaylist = action.payload;
        },
        updateSessionPlaylist: (state, action) => {
            sessionStorage.setItem(
                "sessionPlaylist",
                JSON.stringify(action.payload)
            );
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
    updateSessionPlaylist,
} = sessionPlaylistSlice.actions;

export const selectSessionPlaylist = (state) =>
    state.sessionPlaylist.sessionPlaylist;

export default sessionPlaylistSlice;
