import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import rewardAPI from "@/api/business/rewardAPI";

import { toast } from "sonner";

const initialState = {
  rewards: [],
  selectedReward: {
    id: null,
    name: "",
    image: null,
    description: "",
    points: 0,
    startTime: "",
    endTime: "",
    expiryTime: "",
  },
};

export const getRewards = createAsyncThunk(
  "reward/getRewards",
  async (data, { rejectWithValue }) => {
    try {
      const response = await rewardAPI.getRewards(data);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getReward = createAsyncThunk(
  "reward/getReward",
  async (rewardId, { rejectWithValue }) => {
    try {
      const response = await rewardAPI.getReward(rewardId);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const createReward = createAsyncThunk(
  "reward/createReward",
  async (data, { rejectWithValue }) => {
    try {
      const response = await rewardAPI.createReward(data);
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

export const updateReward = createAsyncThunk(
  "reward/updateReward",
  async (data, { rejectWithValue }) => {
    try {
      const response = await rewardAPI.updateReward(data);
      toast(response.notify.title, {
        description: response.notify.description,
        type: "success",
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const deleteReward = createAsyncThunk(
  "reward/deleteReward",
  async (rewardId, { rejectWithValue }) => {
    try {
      const response = await rewardAPI.deleteReward(rewardId);
      toast(response.notify.title, {
        description: response.notify.description,
        type: "success",
      });
      return rewardId;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const rewardSlice = createSlice({
  name: "reward",
  initialState,
  reducers: {
    clearRewards: (state) => {
      state.rewards = [];
    },
    clearSelectedReward: (state) => {
      state.selectedReward = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getRewards.fulfilled, (state, action) => {
        state.rewards = action.payload;
      })
      .addCase(getReward.fulfilled, (state, action) => {
        const { payload } = action;

        state.selectedReward = {
          id: payload.id,
          name: payload.name,
          image: payload.image,
          description: payload.description,
          points: payload.required_points,
          startTime: payload.start_time,
          endTime: payload.end_time,
          expiryTime: payload.expiry_time,
        };
      })
      .addCase(updateReward.fulfilled, (state, action) => {
      })
      .addCase(deleteReward.fulfilled, (state, action) => {
        state.rewards = state.rewards.filter(
          (reward) => reward.id !== action.payload
        );
      });
  }
});

export const {
  clearRewards,
  clearSelectedReward,
} = rewardSlice.actions;

export default rewardSlice.reducer;
