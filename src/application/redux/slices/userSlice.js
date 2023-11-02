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
            Cookies.set("userInfo", JSON.stringify(action.payload));
            state.user = action.payload;
        },
        userLogout: (state) => {
            Cookies.remove("userInfo");
            Cookies.remove("cartItems");
            state.user = null;
            state.cart = null;
        },
    },
});

export const { userLogin, userLogout } = userSlice.actions; // ACTIONS
export const selectUserState = (state) => state.user.user; // SELECTOR
export default userSlice;
