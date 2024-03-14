import { configureStore } from "@reduxjs/toolkit";

// import slices
import storyListSlice from "./features/storyListSlice";
import fileUploadSlice from "./features/fileUploadSlice";

export const store = configureStore({
  reducer: {
    storyList: storyListSlice,
    fileUpload: fileUploadSlice,
    // Add other reducers here
  },
});
