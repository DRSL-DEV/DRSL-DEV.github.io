import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../../firebase";
import { collection, getDocs, addDoc } from "firebase/firestore";

const initialState = {
  storyList: [],
  status: "idle",
  error: null,
};

// Fetch story list
export const fetchStoryList = createAsyncThunk(
  "items/fetchStoryList",
  async () => {
    const snapshot = await getDocs(collection(db, "post"));
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  }
);

const storyListSlice = createSlice({
  name: "storyList",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStoryList.pending, (state) => {
        state.status = "loading"; // Set status to loading
      })
      .addCase(fetchStoryList.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.storyList = action.payload; // Set storyList to the payload
      })
      .addCase(fetchStoryList.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default storyListSlice.reducer;
