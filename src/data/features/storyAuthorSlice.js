import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../../firebase";
import { getDoc, doc } from "firebase/firestore";

// Fetch story list
export const fetchStoryAuthor = createAsyncThunk(
  "storyAuthor/fetchStoryAuthor",
  async (uid) => {
    const docSnap = await getDoc(doc(db, "user", uid));
    return { uid, ...docSnap.data() };
  }
);
const storyAuthorSlice = createSlice({
  name: "storyAuthor",
  initialState: {
    authorInfo: "",
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStoryAuthor.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchStoryAuthor.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.authorInfo = action.payload;
      })
      .addCase(fetchStoryAuthor.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default storyAuthorSlice.reducer;
