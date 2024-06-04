import { configureStore } from "@reduxjs/toolkit";
import appSettingsSlice from "./slices/appSettingsSlice";
import sessionPlaylistSlice from "./slices/sessionPlaylistSlice";
import userSlice from "./slices/userSlice";
import itemSlice from "./slices/itemSlice";
import formSlice from "./slices/formSlice";
import tournamentSlice from "./slices/tournamentSlice";

// config the store
const store = configureStore({
    reducer: {
        appSettings: appSettingsSlice.reducer,
        sessionPlaylist: sessionPlaylistSlice.reducer,
        user: userSlice.reducer,
        itemStore: itemSlice.reducer,
        formStore: formSlice.reducer,
        tournamentStore: tournamentSlice.reducer,
    },
    devTools: true,
});

export default store;
