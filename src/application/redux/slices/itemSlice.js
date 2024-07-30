import { createSlice } from "@reduxjs/toolkit";
// import Cookies from "js-cookie";

const initialState = {
    selectedItem: undefined,
    loading: false,
    itemIsLoaded: false,
    itemIsChanged: false,
};

const itemSlice = createSlice({
    name: "itemStore",
    initialState,
    reducers: {
        selectItem: (state, action) => {
            // Cookies.set("userInfo", JSON.stringify(action.payload));
            state.loading = false;
            state.selectedItem = action.payload;
            state.itemIsLoaded = true;
            state.itemIsChanged = false;
        },
        clearItem: (state) => {
            state.selectedItem = undefined;
            state.loading = false;
            state.itemIsLoaded = false;
            state.itemIsChanged = false;
        },
        activateLoadingItem: (state) => {
            // Cookies.set("userInfo", JSON.stringify(action.payload));
            state.itemIsLoaded = false;
            state.loading = true;
        },
        reloadItem: (state) => {
            console.log("reloadItem invoked!");
            state.itemIsChanged = true;
            // TODO: refetch item in UI 🧠🔴🧠🔴 hint: use "selectedItem"
        },
    },
});

// ACTIONS
export const { selectItem, clearItem, activateLoadingItem, reloadItem } =
    itemSlice.actions;
// SELECTORS
export const selectItemStore = (state) => state.itemStore;
export const selectSelectedItem = (state) => state.itemStore.selectedItem;
export const selectItemIsLoading = (state) => state.itemStore.loading;
export const selectItemIsLoaded = (state) => state.itemStore.itemIsLoaded;
export const selectItemIsChanged = (state) => state.itemStore.itemIsChanged;

export default itemSlice;
