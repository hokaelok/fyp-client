import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import pickupAPI from "@/api/business/pickupAPI";
import { toast } from "sonner";

const initialState = {
  pickupList: [],
  selectedPickup: null,
};

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

export const updatePickup = createAsyncThunk(
  "pickup/updatePickup",
  async (data, { rejectWithValue }) => {
    try {
      const response = await pickupAPI.updatePickup(data);
      if (response?.notify) {
        toast(response.notify.title, {
          description: response.notify.description,
          type: "success",
        });
      }
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
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPickups.fulfilled, (state, action) => {
        state.pickupList = action.payload;
      })
      .addCase(getPickup.fulfilled, (state, action) => {
        state.selectedPickup = action.payload;
      });
  },
});

export const {
  clearPickupList,
  clearSelectedPickup,
} = pickupSlice.actions;

export default pickupSlice.reducer;
