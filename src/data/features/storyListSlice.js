import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../../firebase";
import {
  collection,
  doc,
  getDoc,
  addDoc,
  onSnapshot,
  getDocs,
  query,
  where,
} from "firebase/firestore";

const initialState = {
  storyList: [],
  status: "idle",
  error: null,
  selectedPost: null,
  bookmarkedStoryList: [],
  authorStoryList: [],
};

// Subscribe to story list
export const subscribeToStoryList = () => (dispatch) => {
  const unsubscribe = onSnapshot(collection(db, "post"), (snapshot) => {
    const stories = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    dispatch(storyListSlice.actions.updateStoryList(stories));
  });

  return unsubscribe;
};

// export const filterStoryList = (selectedTag, selectedLocation, selectedAuthor, selectedDate) => (dispatch) => {
//   let query = collection(db, "post");

//   // If a tag is selected, add a filter based on the selected tag
//   if (selectedTag) {
//     query = query.where("tags", "array-contains", selectedTag);
//   }

//   // Add additional filters for location, author, and date if selected
//   if (selectedLocation) {
//     query = query.where("site", "==", selectedLocation);
//   }

//   if (selectedAuthor) {
//     if (selectedAuthor === 'user') {
//       query = query.where("postType", "!=", "admin");
//     } else if (selectedAuthor === 'detroitRiverStoryLab') {
//       query = query.where("postType", "==", "admin");
//     }
//   }

//   // Add other filters for author and date if needed

//   const unsubscribe = onSnapshot(query, (snapshot) => {
//     const stories = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
//     dispatch(storyListSlice.actions.updateStoryList(stories));
//   });

//   return unsubscribe;
// };

// Fetch story list by author id
export const fetchStorysByAuthorId = createAsyncThunk(
  "items/fetchStorysByAuthorId",
  async (authorId) => {
    const q = query(collection(db, "post"), where("userId", "==", authorId));
    const snapshot = await getDocs(q);
    const authorStoryList = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return authorStoryList;
  }
);

// Fetch story list by id list
export const fetchBookmarkedStorysByIds = createAsyncThunk(
  "items/fetchBookmarkedStorysByIds",
  async (postIdList) => {
    const storyList = await Promise.all(
      postIdList.map(async (postId) => {
        const docRef = doc(db, "post", postId);
        const docSnap = await getDoc(docRef);
        return { id: docSnap.id, ...docSnap.data() };
      })
    );
    return storyList;
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
      .addCase(fetchBookmarkedStorysByIds.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBookmarkedStorysByIds.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.bookmarkedStoryList = action.payload;
      })
      .addCase(fetchBookmarkedStorysByIds.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchStorysByAuthorId.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchStorysByAuthorId.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.authorStoryList = action.payload;
      })
      .addCase(fetchStorysByAuthorId.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default storyListSlice.reducer;
