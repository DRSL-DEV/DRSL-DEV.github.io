import { configureStore } from "@reduxjs/toolkit";

// import slices
import storyListSlice from "./features/storyListSlice";
import fileUploadSlice from "./features/fileUploadSlice";
import userInfoSlice from "./features/userInfoSlice";
import storyAuthorSlice from "./features/storyAuthorSlice";
import adminCommentSlice from "./features/adminCommentSlice";
import bookmarkSlice from "./features/bookmarkSlice";
import siteLocationSlice from "./features/siteLocationSlice";

export const store = configureStore({
  reducer: {
    userInfo: userInfoSlice,
    storyList: storyListSlice,
    fileUpload: fileUploadSlice,
    storyAuthor: storyAuthorSlice,
    adminComment: adminCommentSlice,
    bookmark: bookmarkSlice,
    siteLocation: siteLocationSlice,
    // Add other reducers here
  },
});
