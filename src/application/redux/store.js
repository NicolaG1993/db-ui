import { configureStore } from "@reduxjs/toolkit";
import appSettingsSlice from "./slices/appSettingsSlice";
import sessionPlaylistSlice from "./slices/sessionPlaylistSlice";
import userSlice from "./slices/userSlice";
import itemSlice from "./slices/itemSlice";

// config the store
const store = configureStore({
    reducer: {
        appSettings: appSettingsSlice.reducer,
        sessionPlaylist: sessionPlaylistSlice.reducer,
        user: userSlice.reducer,
        itemStore: itemSlice.reducer,
    },
    devTools: true,
});

export default store;
