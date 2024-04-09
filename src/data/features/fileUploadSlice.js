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
      const storageRef = ref(
        storage,
        `${folderPath}/${new Date().getTime()}_${file.name}`
      );
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

//upload User Image
export const uploadUserImg = createAsyncThunk(
  "fileUpload/uploadUserImg",
  async ({ file, userId }) => {
    try {
      const folderPath = `user/profile/${userId}`;
      const storageRef = ref(
        storage,
        `${folderPath}/${userId}_profile_${new Date().getTime()}_${file.name}`
      );
      console.log({storageRef})
      const uploadTask = uploadBytesResumable(storageRef, file);
      const downloadURL = await new Promise((resolve, reject) => {
        uploadTask.on(
          "state_changed",
          null,
          (error) => reject(error),
          () => {
            getDownloadURL(uploadTask.snapshot.ref)
              .then((url) => resolve(url))
              .catch((error) => reject(error));
          }
        );
      });
      return (
        downloadURL
      );
    } catch (error) {
      throw error;
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
