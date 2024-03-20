import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../../firebase";
import { collection, getDocs, doc, getDoc, addDoc, onSnapshot } from "firebase/firestore";

const initialState = {
  storyList: [],
  status: "idle",
  error: null,
  selectedPost: null,
};

// Subscribe to story list
export const subscribeToStoryList = () => (dispatch) => {
  const unsubscribe = onSnapshot(collection(db, "post"), (snapshot) => {
    const stories = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    dispatch(storyListSlice.actions.updateStoryList(stories));
  });

  return unsubscribe;
};

// Fetch story list
export const fetchStoryList = createAsyncThunk(
  "storyList/fetchStoryList",
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


// Add new story
export const addNewStory = createAsyncThunk(
  "storyList/addNewStory",
  async (newStory) => {
    const response = await addDoc(collection(db, "post"), newStory);
    console.log("response", response.id);
    return { id: response.id, ...newStory };
  }
);

export const storyListSlice = createSlice({
  name: "storyList",
  initialState,
  reducers: {
    updateStoryList: (state, action) => {
      state.status = "succeeded";
      state.storyList = action.payload;
    },
  },
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
      })
      // Handle addNewStory
      .addCase(addNewStory.fulfilled, (state, action) => {
        state.storyList.push(action.payload); // Add the new story to the storyList
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
