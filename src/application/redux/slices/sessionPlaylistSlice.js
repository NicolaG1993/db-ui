import { createSlice } from "@reduxjs/toolkit";
import { shuffle } from "@/src/application/utils/orderData";
import { getStoredPersistenData } from "@/src/domains/_app/utils/getStoredData";

const initialState = {
    sessionPlaylist: getStoredPersistenData("sessionPlaylist"),
};

// TESTARE: Ho due tab aperte e modifico SessionPlaylist da entrambe
// devo sempre guardare cosa giá cé in cookie
const sessionPlaylistSlice = createSlice({
    name: "sessionPlaylist",
    initialState,
    reducers: {
        addToSessionPlaylist: (state, action) => {
            let newState = getStoredPersistenData("sessionPlaylist");
            console.log("addToSessionPlaylist: ", {
                newState,
                payload: action.payload,
            });
            newState.push(action.payload);
            localStorage.setItem("sessionPlaylist", JSON.stringify(newState));
            state.sessionPlaylist = newState;
        },
        // used to remove directly from playlist
        removeFromSessionPlaylist: (state, action) => {
            let newState = getStoredPersistenData("sessionPlaylist")
                ? getStoredPersistenData("sessionPlaylist")
                : state.sessionPlaylist;
            newState.splice(action.payload, 1);
            localStorage.setItem("sessionPlaylist", JSON.stringify(newState));
            state.sessionPlaylist = newState;
        },
        // used to remove playlist element from outside playlist
        removeElementFromSessionPlaylist: (state, action) => {
            let newState = getStoredPersistenData("sessionPlaylist")
                ? getStoredPersistenData("sessionPlaylist")
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
            localStorage.setItem("sessionPlaylist", JSON.stringify(newState));
            state.sessionPlaylist = newState;
        },

        shuffleSessionPlaylist: (state, action) => {
            let newState = shuffle(state.sessionPlaylist);
            localStorage.setItem("sessionPlaylist", JSON.stringify(newState));
            state.sessionPlaylist = newState;
        },

        deleteSessionPlaylist: (state) => {
            localStorage.removeItem("sessionPlaylist");
            state.sessionPlaylist = [];
        },

        getSessionPlaylist: (state) => {
            state.sessionPlaylist = getStoredPersistenData("sessionPlaylist");
        },
        loadSessionPlaylist: (state, action) => {
            localStorage.setItem(
                "sessionPlaylist",
                JSON.stringify(action.payload)
            );
            state.sessionPlaylist = action.payload;
        },
        updateSessionPlaylist: (state, action) => {
            localStorage.setItem(
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
    getSessionPlaylist,
    loadSessionPlaylist,
    updateSessionPlaylist,
} = sessionPlaylistSlice.actions;

export const selectSessionPlaylist = (state) =>
    state.sessionPlaylist.sessionPlaylist;

export default sessionPlaylistSlice;
