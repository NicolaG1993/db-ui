import { configureStore } from "@reduxjs/toolkit";
import appSettingsSlice from "./slices/appSettingsSlice";
import sessionPlaylistSlice from "./slices/sessionPlaylistSlice";

// config the store
const store = configureStore({
    reducer: {
        sessionPlaylist: sessionPlaylistSlice.reducer,
        appSettings: appSettingsSlice.reducer,
    },
    devTools: true,
});

export default store;
