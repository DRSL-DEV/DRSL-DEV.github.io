// sitelocationslice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";

const initialState = {
  siteLocation: "", // Initial state should match the data structure you expect
  status: "idle",
  error: null,
};

export const fetchSiteLocation = createAsyncThunk(
  "siteLocation/fetchSiteLocation",
  async (siteLocationId) => {
    try {
      const docRef = doc(db, "site", siteLocationId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const siteLocationData = docSnap.data().siteName;
        return siteLocationData;
      } else {
        throw new Error("Site location data not found");
      }
    } catch (error) {
      throw error;
    }
  }
);

// export const siteLocationSlice = createSlice({
//   name: "siteLocation",
//   initialState,
//   reducers: {
//     // Add any reducers if needed
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchSiteLocation.pending, (state) => {
//         state.status = "loading";
//       })
//       .addCase(fetchSiteLocation.fulfilled, (state, action) => {
//         state.status = "succeeded";
//         state.siteLocation = action.payload;
//       })
//       .addCase(fetchSiteLocation.rejected, (state, action) => {
//         state.status = "failed";
//         state.error = action.error.message;
//       });
//   },
// });

export default siteLocationSlice.reducer;
