import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../../firebase";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { getAuth, signOut } from "firebase/auth";

const initialState = {
  user: JSON.parse(localStorage.getItem("userInfo")) || null,
  status: "idle",
  error: null,
};

export const signOutUser = () => async (dispatch) => {
  const auth = getAuth();
  signOut(auth)
    .then(() => {
      // Dispatch clearUser when sign-out is successful
      dispatch(clearUser());
      console.log("User signed out");
    })
    .catch((error) => {
      // Handle any errors here
      console.error("Error signing out: ", error);
    });
};

const userInfoSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
      localStorage.removeItem("userInfo");
    },
  },
});

export const { setUser, clearUser } = userInfoSlice.actions;
export default userInfoSlice.reducer;
