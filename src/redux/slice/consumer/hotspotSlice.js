import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import hotspotAPI from "@/api/consumer/hotspotAPI";

const initialState = {
  hotspots: [],
  selectedHotspot: null,
  isFetching: false,
};

export const getHotspots = createAsyncThunk(
  "hotspot/getHotspots",
  async (data, { rejectWithValue }) => {
    try {
      const response = await hotspotAPI.getHotspots(data);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getHotspot = createAsyncThunk(
  "hotspot/getHotspot",
  async (data, { rejectWithValue }) => {
    try {
      const response = await hotspotAPI.getHotspot(data);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const hotspotSlice = createSlice({
  name: "hotspot",
  initialState,
  reducers: {
    clearHotspots: (state) => {
      state.hotspotList = initialState.hotspotList;
    },
    clearSelectedHotspot: (state) => {
      state.selectedHotspot = initialState.selectedHotspot;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getHotspots.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(getHotspots.fulfilled, (state, action) => {
        state.hotspots = action.payload;
        state.isFetching = false;
      })
      .addCase(getHotspots.rejected, (state) => {
        state.isFetching = false;
      })
      .addCase(getHotspot.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(getHotspot.fulfilled, (state, action) => {
        state.selectedHotspot = action.payload;
        state.isFetching = false;
      })
      .addCase(getHotspot.rejected, (state) => {
        state.isFetching = false;
      });
  },
});

export const {
  clearHotspots,
  clearSelectedHotspot,
} = hotspotSlice.actions;

export default hotspotSlice.reducer;