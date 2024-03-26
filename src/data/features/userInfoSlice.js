import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../../firebase";
import { collection, getDocs, addDoc, doc, setDoc  } from "firebase/firestore";
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

export const addUser = createAsyncThunk(
  'userInfo/addUser',
  async (userDetails, { rejectWithValue }) => {
    try {
      const { uid, ...detailsWithoutUid } = userDetails;
      await setDoc(doc(db, 'user', uid), detailsWithoutUid);
      console.log("Document successfully written: ", detailsWithoutUid);
      return { id: uid, ...detailsWithoutUid };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

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
  extraReducers: (builder) => {
    builder
      .addCase(addUser.fulfilled, (state, action) => {
        state.user=action.payload;
      })
      .addCase(addUser.rejected, (state, action) => {
        // Handle the state update when addUserDetails is rejected
        // ...
      });
  },
});

export const { setUser, clearUser } = userInfoSlice.actions;
export default userInfoSlice.reducer;
