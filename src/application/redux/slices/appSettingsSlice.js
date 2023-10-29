import { createSlice } from "@reduxjs/toolkit";
import appSettingsDefault from "@/src/application/settings/appSettingsDefault.js";

const initialState = appSettingsDefault;

const appSettingsSlice = createSlice({
    name: "appSettings",
    initialState,
    reducers: {
        changeSettings: (state, action) => {
            state.appSettings = action.payload;
        },
        restoreDefaultSettings: (state) => {
            state.appSettings = initialState;
        },
    },
});

export const { changeSettings, restoreDefaultSettings } =
    appSettingsSlice.actions;
export const selectAppSettings = (state) => state.appSettings.appSettings;
export default appSettingsSlice;
