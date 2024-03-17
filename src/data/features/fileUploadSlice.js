import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

const storage = getStorage();

// Upload file
export const uploadFile = createAsyncThunk(
  "fileUpload/uploadFile",
  async ({ file, folderPath }, { rejectWithValue }) => {
    try {
      const storageRef = ref(storage, `${folderPath}/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      return new Promise((resolve, reject) => {
        uploadTask.on(
          "state_changed",
          () => {}, // Handle progress here if needed
          (error) => {
            reject(rejectWithValue(error));
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              resolve(downloadURL);
            });
          }
        );
      });
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const fileUploadSlice = createSlice({
  name: "fileUpload",
  initialState: {
    uploadStatus: "idle", // 'idle', 'uploading', 'succeeded', 'failed'
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(uploadFile.pending, (state) => {
        state.uploadStatus = "uploading";
      })
      .addCase(uploadFile.fulfilled, (state, action) => {
        state.uploadStatus = "succeeded";
      })
      .addCase(uploadFile.rejected, (state, action) => {
        state.uploadStatus = "failed";
        state.error = action.error.message;
      });
  },
});

export default fileUploadSlice.reducer;
