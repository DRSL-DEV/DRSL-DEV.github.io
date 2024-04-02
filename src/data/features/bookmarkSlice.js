import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../../firebase";
import { getDoc, doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const initialState = {
  bookmarks: [],
  status: "idle",
  error: null,
};

export const toggleBookmark = createAsyncThunk(
  "bookmarks/toggleBookmark",
  async (postId) => {
    try {
      const auth = getAuth();
      const currentUser = auth.currentUser;
      const userId = currentUser.uid;

      const userDocRef = doc(db, "user", userId);
      const userDocSnapshot = await getDoc(userDocRef);

      if (userDocSnapshot.exists() && userDocSnapshot.data().bookmarks) {
        const isPostBookmarked = userDocSnapshot.data().bookmarks.includes(postId);

        if (isPostBookmarked) {
          // Remove postId from bookmarks array
          await updateDoc(userDocRef, {
            bookmarks: arrayRemove(postId)
          });
        } else {
          // Add postId to bookmarks array
          await updateDoc(userDocRef, {
            bookmarks: arrayUnion(postId)
          });
        }
      } else {
        // If bookmarks array doesn't exist, create it with postId
        await updateDoc(userDocRef, {
          bookmarks: [postId]
        });
      }

      return postId;
    } catch (error) {
      console.error("Error toggling bookmark:", error);
      throw error;
    }
  }
);

const bookmarkSlice = createSlice({
  name: "bookmarks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(toggleBookmark.pending, (state) => {
        state.status = "loading";
      })
      .addCase(toggleBookmark.fulfilled, (state, action) => {
        state.status = "succeeded";

        // Toggle the presence of postId in bookmarks array
        const index = state.bookmarks.indexOf(action.payload);
        if (index !== -1) {
          state.bookmarks.splice(index, 1);
        } else {
          state.bookmarks.push(action.payload);
        }
      })
      .addCase(toggleBookmark.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default bookmarkSlice.reducer;