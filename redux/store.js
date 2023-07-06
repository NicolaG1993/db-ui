import { configureStore } from "@reduxjs/toolkit";
import sessionPlaylistSlice from "./slices/sessionPlaylistSlice";

// config the store
const store = configureStore({
    reducer: {
        sessionPlaylist: sessionPlaylistSlice.reducer,
    },
    devTools: true,
});

export default store;
