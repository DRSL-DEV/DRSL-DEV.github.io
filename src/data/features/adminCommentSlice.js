import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { db } from "../../firebase";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";

export const addComment = createAsyncThunk(
  "adminComment/addComment",
  async ({ postId, newComment }) => {
    try {
      await updateDoc(doc(db, "post", postId), {
        adminComment: arrayUnion(newComment),
        status: "rejected",
        latestReviewTime: newComment.commentTime,
      });
      return "Comment added successfully!";
    } catch (error) {
      return error.message;
    }
  }
);

export const approvePost = createAsyncThunk(
  "adminComment/approvePost",
  async ({ postId, approveTime }) => {
    try {
      await updateDoc(doc(db, "post", postId), {
        status: "approved",
        latestReviewTime: approveTime,
      });
      return "Post approved successfully!";
    } catch (error) {
      return error.message;
    }
  }
);

const initialState = {
  status: "idle", // 'idle', 'loading', 'succeeded', 'failed'
  error: null,
};

const adminCommentSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addComment.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addComment.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(addComment.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(approvePost.fulfilled, (state) => {
        state.status = "succeeded";
      });
  },
});

export default adminCommentSlice.reducer;
