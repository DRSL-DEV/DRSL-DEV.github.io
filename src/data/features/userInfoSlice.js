import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../../firebase";
import { collection, getDoc, addDoc, doc, setDoc  } from "firebase/firestore";
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

// Fetch user informtiaon by UID to validate login
export const fetchUserById = createAsyncThunk(
  "items/fetchUserById",
  async (uid, { rejectWithValue }) => {
    try{
      const docRef = doc(db, "user", uid);
      const docSnap = await getDoc(docRef);


      if (docSnap.exists()) {
        console.log("User found: ", docSnap.data());
        return { id: docSnap.id, ...docSnap.data() };
      } else {
        console.log("No such user!");
        return rejectWithValue("User not found in Firestore");
      }
    }
    catch (error) {
      console.error("Error fetching user by ID: ", error.message);
      return rejectWithValue(error.message);
    }
  }
);

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
      }).addCase(fetchUserById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { setUser, clearUser } = userInfoSlice.actions;
export default userInfoSlice.reducer;
