import { configureStore } from "@reduxjs/toolkit";
import appSettingsSlice from "./slices/appSettingsSlice";
import sessionPlaylistSlice from "./slices/sessionPlaylistSlice";
import userSlice from "./slices/userSlice";

// config the store
const store = configureStore({
    reducer: {
        appSettings: appSettingsSlice.reducer,
        sessionPlaylist: sessionPlaylistSlice.reducer,
        user: userSlice.reducer,
    },
    devTools: true,
});

export default store;
