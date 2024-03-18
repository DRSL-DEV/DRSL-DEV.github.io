import { configureStore } from "@reduxjs/toolkit";

// import slices
import storyListSlice from "./features/storyListSlice";
import fileUploadSlice from "./features/fileUploadSlice";
import userInfoSlice from "./features/userInfoSlice";

export const store = configureStore({
  reducer: {
    userInfo: userInfoSlice,
    storyList: storyListSlice,
    fileUpload: fileUploadSlice,
    // Add other reducers here
  },
});
