import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const initialState = {
    user: Cookies.get("userInfo") ? JSON.parse(Cookies.get("userInfo")) : null,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        userLogin: (state, action) => {
            // Are we storing token here? Not sure. We need it! 👇🧠🟠
            Cookies.set("userInfo", JSON.stringify(action.payload));
            //  localStorage.setItem("token", response.data.token);
            state.user = action.payload;
        },
        userLogout: (state) => {
            console.log("userLogout invoked");
            Cookies.remove("userInfo");
            state.user = null;
        },
    },
});

export const { userLogin, userLogout, storeEmailToken } = userSlice.actions; // ACTIONS
export const selectUserState = (state) => state.user.user; // SELECTOR

export default userSlice;
