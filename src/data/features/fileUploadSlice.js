import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

const storage = getStorage();

// Upload file
export const uploadFile = createAsyncThunk(
  "fileUpload/uploadFile",
  async ({ fileName, file, folderPath }, { rejectWithValue }) => {
    try {
      const storageRef = ref(
        storage,
        `${folderPath}/${new Date().getTime()}_${fileName}`
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

// Function to delete a file by URL
const deleteFileByUrl = async (fileUrl) => {
  // Extract the file path from the URL
  const decodedUrl = decodeURIComponent(fileUrl);
  const matches = decodedUrl.match(/\/o\/(.+)\?alt=media/);
  if (matches && matches.length > 1) {
    const filePath = matches[1];

    // Create a reference to the file to delete
    const fileRef = ref(storage, filePath);

    // Delete the file
    try {
      await deleteObject(fileRef);
      console.log("File deleted successfully");
      return true;
    } catch (error) {
      console.error("Error deleting file:", error);
      return false;
    }
  } else {
    console.error("File path not found in URL");
    return false;
  }
};

export const deleteFile = createAsyncThunk(
  "files/deleteFile",
  async (fileUrl, { rejectWithValue }) => {
    try {
      const result = await deleteFileByUrl(fileUrl);
      if (!result) {
        throw new Error("Deletion failed due to file path issues.");
      }
      return fileUrl; // Returning the URL as confirmation of deletion
    } catch (error) {
      return rejectWithValue(error.toString());
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
      })
      .addCase(deleteFile.pending, (state) => {
        state.uploadStatus = "deleting";
      })
      .addCase(deleteFile.fulfilled, (state, action) => {
        state.uploadStatus = "succeeded";
      })
      .addCase(deleteFile.rejected, (state, action) => {
        state.uploadStatus = "failed";
        state.error = action.error.message;
      })
      .addCase(uploadUserImg.pending, (state) => {
        state.uploadStatus = "uploading";
        state.error = null;
      })
      .addCase(uploadUserImg.fulfilled, (state) => {
        state.uploadStatus = "succeeded";
      })
      .addCase(uploadUserImg.rejected, (state, action) => {
        state.uploadStatus = "failed";
        state.error = action.error.message;
      });
  },
});

export default fileUploadSlice.reducer;
