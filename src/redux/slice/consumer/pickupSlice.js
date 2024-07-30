import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import pickupAPI from "@/api/consumer/pickupAPI";

const initialState = {
  pickupList: [],
  selectedPickup: null,
  bookedSlots: [],
};

export const requestPickup = createAsyncThunk(
  "pickup/requestPickup",
  async (data, { rejectWithValue }) => {
    try {
      const response = await pickupAPI.requestPickup(data);
      return response;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getPickups = createAsyncThunk(
  "pickup/getPickups",
  async (data, { rejectWithValue }) => {
    try {
      const response = await pickupAPI.getPickups(data);
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
      const response = await pickupAPI.getPickup(pickupId);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getBookedSlots = createAsyncThunk(
  "pickup/getBookedSlots",
  async (data, { rejectWithValue }) => {
    try {
      const response = await pickupAPI.getBookedSlots(data);
      return response.data;
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
      state.pickupList = initialState.pickupList;
    },
    clearSelectedPickup: (state) => {
      state.selectedPickup = initialState.selectedPickup;
    },
    clearBookedSlots: (state) => {
      state.bookedSlots = initialState.bookedSlots;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPickups.fulfilled, (state, action) => {
        state.pickupList = action.payload;
      })
      .addCase(getPickup.fulfilled, (state, action) => {
        state.selectedPickup = action.payload;
      })
      .addCase(getBookedSlots.fulfilled, (state, action) => {
        state.bookedSlots = action.payload;
      });
  },
});

export const {
  clearPickupList,
  clearSelectedPickup,
  clearBookedSlots,
} = pickupSlice.actions;

export default pickupSlice.reducer;
