// sitelocationslice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";

const initialState = {
  siteLocation: [],
  status: "idle",
  error: null,
};

export const fetchSiteLocation = createAsyncThunk(
  "siteLocation/fetchSiteLocation",
  async (siteLocationId) => {
    try {
      const docRef = doc(db, "site", siteLocationId);
      const docSnap = await getDoc(docRef);
      return { siteLocationId: docSnap.id, ...docSnap.data() };
    } catch (error) {
      throw error;
    }
  }
);

export const siteLocationSlice = createSlice({
  name: "siteLocation",
  initialState,
  reducers: {
    // Add any reducers if needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSiteLocation.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSiteLocation.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.siteLocation = action.payload;
      })
      .addCase(fetchSiteLocation.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default siteLocationSlice.reducer;
