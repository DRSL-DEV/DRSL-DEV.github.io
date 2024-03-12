import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../../firebase";
import { collection, getDocs, addDoc } from "firebase/firestore";

const initialState = {
    user: JSON.parse(localStorage.getItem("user")) || null,
    status: "idle",
    error: null,
};

const userInfoSlice = createSlice({
    name: "userInfo",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
            localStorage.setItem("user", JSON.stringify(action.payload));
        },
        clearUser: (state) => {
            state.user = null;
            localStorage.removeItem("user");
        },
    },
});

export const { setUser, clearUser } = userInfoSlice.actions;
export default userInfoSlice.reducer;
