import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../../firebase";
import {
  getDoc,
  getDocs,
  doc,
  setDoc,
  updateDoc,
  query,
  collection,
  where,
  arrayRemove,
} from "firebase/firestore";
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
    try {
      const docRef = doc(db, "user", uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return { uid: docSnap.id, ...docSnap.data() };
      } else {
        return rejectWithValue("User not found in Firestore");
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addUser = createAsyncThunk(
  "userInfo/addUser",
  async (userDetails, { rejectWithValue }) => {
    try {
      const { uid, ...detailsWithoutUid } = userDetails;
      await setDoc(doc(db, "user", uid), detailsWithoutUid);
      return { uid: uid, ...detailsWithoutUid };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateUser = createAsyncThunk(
  "userInfo/updateUser",
  async ({ userDetails, uid }, { rejectWithValue }) => {
    try {
      const userDocRef = doc(db, "user", uid);
      const userDocSnapshot = await getDoc(userDocRef);
      if (userDocSnapshot.exists()) {
        await updateDoc(userDocRef, userDetails);
        const updatedDocSnap = await getDoc(userDocRef);
        if (updatedDocSnap.exists()) {
          const updatedUser = {
            uid: updatedDocSnap.id,
            ...updatedDocSnap.data(),
          };
          return updatedUser;
        } else {
          return rejectWithValue("No updated document found!");
        }
      } else {
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const removeFromBookmarks = createAsyncThunk(
  "users/removeFromBookmarks",
  async (bookmarkToRemove, { rejectWithValue }) => {
    try {
      const q = query(
        collection(db, "user"),
        where("bookmarks", "array-contains", bookmarkToRemove)
      );
      const querySnapshot = await getDocs(q);

      const updatePromises = querySnapshot.docs.map((doc) =>
        updateDoc(doc.ref, {
          bookmarks: arrayRemove(bookmarkToRemove),
        })
      );

      await Promise.all(updatePromises);

      return bookmarkToRemove;
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
        state.user = action.payload;
      })
      .addCase(addUser.rejected, (state, action) => {
        state.status = "failed in adding user";
        state.error = action.error.message;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.status = "failed in updating user";
        state.error = action.error.message;
      })
      .addCase(fetchUserById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(removeFromBookmarks.pending, (state) => {
        state.status = "removing from bookmarks";
      })
      .addCase(removeFromBookmarks.fulfilled, (state, action) => {
        state.user.bookmarks = state.user.bookmarks.filter(
          (bookmark) => bookmark !== action.payload
        );
        state.status = "removed from bookmarks";
      })
      .addCase(removeFromBookmarks.rejected, (state, action) => {
        state.status = "failed to remove from bookmarks";
        state.error = action.error.message;
      });
  },
});

export const { setUser, clearUser } = userInfoSlice.actions;
export default userInfoSlice.reducer;
