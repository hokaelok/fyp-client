import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import pickupAPI from "@/api/collector/pickupAPI";

const initialState = {
  pickups: [],
  selectedPickup: null,
};

export const getPickups = createAsyncThunk(
  "pickup/getPickups",
  async (data, { rejectWithValue }) => {
    try {
      const response = await pickupAPI.getBizPickups(data);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getPickup = createAsyncThunk(
  "pickup/getPickup",
  async (pickupId, { rejectWithValue }) => {
    try {
      const response = await pickupAPI.getBizPickup(pickupId);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const updatePickup = createAsyncThunk(
  "pickup/updatePickup",
  async (data, { rejectWithValue }) => {
    try {
      const response = await pickupAPI.updateBizPickup(data);
      return response;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const pickupSlice = createSlice({
  name: "pickup",
  initialState,
  reducers: {
    clearPickupList: (state) => {
      state.pickups = initialState.pickups;
    },
    clearSelectedPickup: (state) => {
      state.selectedPickup = initialState.selectedPickup;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPickups.fulfilled, (state, action) => {
        state.pickups = action.payload;
      })
      .addCase(getPickup.fulfilled, (state, action) => {
        state.selectedPickup = action.payload;
      });
  },
});

export const {
  clearPickupList,
  clearSelectedPickup
} = pickupSlice.actions;

export default pickupSlice.reducer;