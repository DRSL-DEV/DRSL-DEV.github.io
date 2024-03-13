import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../../firebase";
import { collection, getDocs, doc, getDoc, addDoc } from "firebase/firestore";

const initialState = {
  storyList: [],
  status: "idle",
  error: null,
  selectedPost: null,
};

// Fetch story list
export const fetchStoryList = createAsyncThunk(
  "items/fetchStoryList",
  async () => {
    const snapshot = await getDocs(collection(db, "post"));
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  }
);

// Fetch story informtiaon by ID for Story Detail Page
export const fetchStoryById = createAsyncThunk(
  "items/fetchStoryById",
  async (postId) => {
    const docRef = doc(db, "post", postId);
    const docSnap = await getDoc(docRef);
    return { id: docSnap.id, ...docSnap.data() };
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

    builder
      .addCase(fetchStoryById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchStoryById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.selectedPost = action.payload;
      })
      .addCase(fetchStoryById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default storyListSlice.reducer;
