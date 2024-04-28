import { createSlice } from "@reduxjs/toolkit";
// import Cookies from "js-cookie";

const initialState = {
    selectedItem: undefined,
    loading: false,
    itemIsLoaded: false,
    error: undefined,
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
            state.error = undefined;
        },
        clearItem: (state) => {
            state.selectedItem = undefined;
            state.loading = false;
            state.itemIsLoaded = false;
        },
        activateLoadingItem: (state) => {
            // Cookies.set("userInfo", JSON.stringify(action.payload));
            state.itemIsLoaded = false;
            state.loading = true;
            state.error = undefined;
        },
        setStoreError: (state, action) => {
            state.error = action.payload;
        },
    },
});

// ACTIONS
export const { selectItem, clearItem, activateLoadingItem, setStoreError } =
    itemSlice.actions;
// SELECTORS
export const selectItemStore = (state) => state.itemStore;
export const selectSelectedItem = (state) => state.itemStore.selectedItem;
export const selectItemIsLoading = (state) => state.itemStore.loading;
export const selectItemIsLoaded = (state) => state.itemStore.itemIsLoaded;
export const selectItemStoreError = (state) => state.itemStore.error;

export default itemSlice;
