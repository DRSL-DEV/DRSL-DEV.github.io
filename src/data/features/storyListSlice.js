import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../../firebase";
import {
  collection,
  doc,
  getDoc,
  setDoc,
  onSnapshot,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  deleteDoc,
} from "firebase/firestore";

const initialState = {
  storyList: [],
  status: "idle",
  error: null,
  selectedPost: null,
  bookmarkedStoryList: [],
  authorStoryList: [],
  latestPartnerPost: null,
  latestUserPost: [],
  taggedPosts: {},
  lastVisibleDocIdByTag: {},
  postsBySite: {},
  lastVisibleDocIdBySite: {},
  deleting: false,
  storyCountsBySite: {},
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

// Fetch latest partner post
export const fetchLatestPartnerPost = createAsyncThunk(
  "storyList/fetchLatestPartnerPost",
  async () => {
    const q = query(
      collection(db, "post"),
      where("postType", "==", "partner"),
      orderBy("submitTime", "desc"),
      limit(1)
    );
    const snapshot = await getDocs(q);
    const latestPartnerPost = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return latestPartnerPost.length > 0 ? latestPartnerPost[0] : null;
  }
);

// Fetch latest user post
export const fetchLatestUserPost = createAsyncThunk(
  "storyList/fetchLatestUserPost",
  async () => {
    const q = query(
      collection(db, "post"),
      where("postType", "==", "user"),
      where("status", "==", "approved"),
      orderBy("submitTime", "desc"),
      limit(2)
    );
    const snapshot = await getDocs(q);
    const latestUserPost = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return latestUserPost.length > 0 ? latestUserPost : null;
  }
);

// Fetch posts by tag with pagination
export const fetchPostsByTag = createAsyncThunk(
  "storyList/fetchPostsByTag",
  async ({ tag, lastVisibleDocId }) => {
    let q = query(
      collection(db, "post"),
      where("tags", "array-contains", tag),
      where("status", "==", "approved"),
      orderBy("submitTime", "desc"),
      limit(3)
    );

    if (lastVisibleDocId) {
      const lastVisibleSnapshot = await getDoc(
        doc(db, "post", lastVisibleDocId)
      );
      q = query(q, startAfter(lastVisibleSnapshot), limit(3));
    }
    const snapshot = await getDocs(q);
    const posts = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    const lastDoc = snapshot.docs[snapshot.docs.length - 1];
    return {
      tag,
      posts,
      lastVisibleDocId: lastDoc ? lastDoc.id : null,
    };
  }
);

// Fetch posts by site with pagination
export const fetchPostsBySite = createAsyncThunk(
  "storyList/fetchPostsBySite",
  async ({ siteId, lastVisibleDocId = null }) => {
    let q = query(
      collection(db, "post"),
      where("site", "==", siteId),
      where("status", "==", "approved"),
      orderBy("submitTime", "desc"),
      limit(3)
    );

    if (lastVisibleDocId) {
      const lastDoc = await getDoc(doc(db, "post", lastVisibleDocId));
      q = query(q, startAfter(lastDoc), limit(3));
    }

    const snapshot = await getDocs(q);
    const posts = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    const lastDoc = snapshot.docs[snapshot.docs.length - 1];
    return {
      siteId,
      posts,
      lastVisibleDocId: lastDoc ? lastDoc.id : null,
    };
  }
);

// Fetch count of posts by site
export const fetchPostCountBySite = createAsyncThunk(
  "storyList/fetchPostCountBySite",
  async (siteId, { getState, rejectWithValue }) => {
    try {
      const approvedQuery = query(
        collection(db, "post"),
        where("site", "==", siteId),
        where("postType", "==", "user"),
        where("status", "==", "approved")
      );
      const partnerQuery = query(
        collection(db, "post"),
        where("site", "==", siteId),
        where("postType", "==", "partner"),
      );
      const [approvedSnapshot, partnerSnapshot] = await Promise.all([
        getDocs(approvedQuery),
        getDocs(partnerQuery),
      ]);
      const uniqueDocIds = new Set();
      approvedSnapshot.forEach(doc => {
        uniqueDocIds.add(doc.id);
      });
      partnerSnapshot.forEach(doc => {
        if (!uniqueDocIds.has(doc.id)) {
          uniqueDocIds.add(doc.id);
        }
      });

      return { siteId, count: uniqueDocIds.size };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

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

// Add a new story or update an existing story
export const addOrUpdateStory = createAsyncThunk(
  "storyList/addOrUpdateStory",
  async ({ id, ...storyData }, { rejectWithValue }) => {
    try {
      const storyRef = id ? doc(db, "post", id) : doc(collection(db, "post"));
      await setDoc(storyRef, storyData, { merge: true });
      return { id: storyRef.id, ...storyData };
    } catch (error) {
      return rejectWithValue(error.toString());
    }
  }
);

// Delete a story by ID
export const deletePostById = createAsyncThunk(
  "posts/deletePost",
  async (postId, { rejectWithValue }) => {
    try {
      const postRef = doc(db, "post", postId);
      await deleteDoc(postRef);
      return postId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

//Delete stories by uid
export const deletePostsByAuthorId = createAsyncThunk(
  "posts/deletePostsByAuthorId",
  async (uid, { rejectWithValue }) => {
    try {
      const postsQuery = query(collection(db, "post"), where("userId", "==", uid));
      const snapshot = await getDocs(postsQuery);

      const postDeletionPromises = snapshot.docs.map(async (doc) => {
        await deleteDoc(doc.ref);
        return doc.id;
      });

      await Promise.all(postDeletionPromises);
      return snapshot.docs.map((doc) => doc.id);
    } catch (error) {
      return rejectWithValue(error.message);
    }
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
      // Handle addOrUpdateStory
      .addCase(addOrUpdateStory.fulfilled, (state, action) => {
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
      })
      .addCase(fetchLatestPartnerPost.fulfilled, (state, action) => {
        state.latestPartnerPost = action.payload;
      })
      .addCase(fetchLatestUserPost.fulfilled, (state, action) => {
        state.latestUserPost = action.payload;
      })
      .addCase(fetchLatestPartnerPost.pending, (state) => {
        // console.log("Fetching latest partner post...");
      })
      .addCase(fetchLatestUserPost.pending, (state) => {
        // console.log("Fetching latest user posts...");
      })
      .addCase(fetchLatestPartnerPost.rejected, (state, action) => {
        console.error("Failed to fetch latest partner post:", action.error);
      })
      .addCase(fetchLatestUserPost.rejected, (state, action) => {
        console.error("Failed to fetch latest user posts:", action.error);
      })
      .addCase(fetchPostsByTag.fulfilled, (state, action) => {
        const { tag, posts, lastVisibleDocId } = action.payload;
        const existingPosts = state.taggedPosts[tag] || [];
        const newPosts = posts.filter(
          (p) => !existingPosts.some((ep) => ep.id === p.id)
        );
        state.taggedPosts[tag] = [...existingPosts, ...newPosts];
        state.lastVisibleDocIdByTag[tag] =
          posts.length === 3 ? lastVisibleDocId : null;
      })
      .addCase(fetchPostsByTag.pending, (state) => {
        // console.log("Fetching posts by tag...");
      })
      .addCase(fetchPostsByTag.rejected, (state, action) => {
        console.error("Failed to fetch posts by tag:", action.error);
      })
      .addCase(fetchPostsBySite.fulfilled, (state, action) => {
        const { siteId, posts, lastVisibleDocId } = action.payload;
        const existingPosts = state.postsBySite[siteId] || [];
        const newPosts = posts.filter(
          (p) => !existingPosts.some((ep) => ep.id === p.id)
        );
        state.postsBySite[siteId] = [...existingPosts, ...newPosts];
        state.lastVisibleDocIdBySite[siteId] = lastVisibleDocId;
      })
      .addCase(fetchPostsBySite.pending, (state) => {
        // console.log("Fetching posts by site...");
      })
      .addCase(fetchPostsBySite.rejected, (state, action) => {
        console.error("Failed to fetch posts by site:", action.error);
      })
      .addCase(deletePostById.pending, (state) => {
        state.deleting = true;
      })
      .addCase(deletePostById.fulfilled, (state, action) => {
        state.deleting = false;
      })
      .addCase(deletePostById.rejected, (state, action) => {
        state.deleting = false;
        state.error = action.payload;
      })
      .addCase(fetchPostCountBySite.fulfilled, (state, action) => {
        const { siteId, count } = action.payload;
        state.storyCountsBySite[siteId] = count;
      })
      .addCase(deletePostsByAuthorId.fulfilled, (state, action) => {
        // Handle successful deletion if needed
      })
      .addCase(deletePostsByAuthorId.rejected, (state, action) => {
        // Handle rejection/error if needed
      });
  },
});

export default storyListSlice.reducer;
