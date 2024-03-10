import { configureStore } from "@reduxjs/toolkit";

// import slices
import storyListSlice from "./features/storyListSlice";

export const store = configureStore({
  reducer: {
    storyList: storyListSlice,
    // Add other reducers here
  },
});
