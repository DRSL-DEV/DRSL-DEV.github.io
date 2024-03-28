import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../../firebase";
import {
  collection,
  doc,
  getDoc,
  addDoc,
  onSnapshot,
} from "firebase/firestore";

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

// filtered story list
export const filterStoryList = (selectedTag) => (dispatch) => {
  let query = collection(db, "post");
  
  // If a tag is selected, add a filter based on the selected tag
  if (selectedTag) {
    query = query.where("tags", "array-contains", selectedTag);
  }
  
  const unsubscribe = onSnapshot(query, (snapshot) => {
    const stories = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    dispatch(storyListSlice.actions.updateStoryList(stories));
  });

  return unsubscribe;
};

// Fetch story informtiaon by ID for Story Detail Page
export const fetchStoryById = createAsyncThunk(
  "items/fetchStoryById",
  async (postId) => {
    const docRef = doc(db, "post", postId);
    const docSnap = await getDoc(docRef);
    return { id: docSnap.id, ...docSnap.data() };
  }
);

// export const searchStories = createAsyncThunk(
//   "storyList/searchStories",
//   async (searchTerm) => {
//     const stories = await getDoc(collection(db, "post"));
//     return stories.docs
//       .map((doc) => ({ id: doc.id, ...doc.data() }))
//       .filter(
//         (story) =>
//           story.title.includes(searchTerm) ||
//           story.content.includes(searchTerm)
//       );
//   }
// );

// Add new story
export const addNewStory = createAsyncThunk(
  "storyList/addNewStory",
  async (newStory) => {
    const response = await addDoc(collection(db, "post"), newStory);
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
      // Handle addNewStory
      .addCase(addNewStory.fulfilled, (state, action) => {
        state.storyList.push(action.payload); // Add the new story to the storyList
      })

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
      })
      // .addCase(searchStories.fulfilled, (state, action) => {
      //   state.status = "succeeded";
      //   state.storyList = action.payload;
      // });
  },
});

export default storyListSlice.reducer;
