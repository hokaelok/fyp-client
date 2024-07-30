import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import rewardsAPI from "@/api/consumer/rewardsAPI";
import { toast } from "sonner";

const initialState = {
  points: 0,
  rewards: {
    active: [],
    upcoming: [],
  },
  selectedReward: null,
  redeemedRewards: {
    active: [],
    used: [],
    expired: [],
  },
  selectedRedeemedReward: null,
  transactionHistory: [],
};

export const getPoints = createAsyncThunk(
  "reward/getPoints",
  async (_, { rejectWithValue }) => {
    try {
      const response = await rewardsAPI.getPoints();
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getRewards = createAsyncThunk(
  "reward/getRewards",
  async (data, { rejectWithValue }) => {
    try {
      const response = await rewardsAPI.getRewards(data);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getReward = createAsyncThunk(
  "reward/getReward",
  async (data, { rejectWithValue }) => {
    try {
      const response = await rewardsAPI.getReward(data);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const redeemReward = createAsyncThunk(
  "reward/redeemReward",
  async (data, { rejectWithValue }) => {
    try {
      const response = await rewardsAPI.redeemReward(data);
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

export const useReward = createAsyncThunk(
  "reward/useReward",
  async (data, { rejectWithValue }) => {
    try {
      const response = await rewardsAPI.useReward(data);
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

export const getRedeemedRewards = createAsyncThunk(
  "reward/getRedeemedRewards",
  async (data, { rejectWithValue }) => {
    try {
      const response = await rewardsAPI.getRedeemedRewards(data);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getRedeemedReward = createAsyncThunk(
  "reward/getRedeemedReward",
  async (data, { rejectWithValue }) => {
    try {
      const response = await rewardsAPI.getRedeemedReward(data);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getTransactionHistory = createAsyncThunk(
  "reward/getTransactionHistory",
  async (_, { rejectWithValue }) => {
    try {
      const response = await rewardsAPI.getTransactionHistory();
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const categorizeRedeemedRewards = (rewards) => {
  const currentTime = new Date();

  return rewards.reduce(
    (acc, reward) => {
      const expiryTime = new Date(reward.reward.expiry_time);
      const usedAt = reward.used_at ? new Date(reward.used_at) : null;

      if (usedAt) {
        acc.used.push(reward);
      } else if (expiryTime < currentTime) {
        acc.expired.push(reward);
      } else {
        acc.active.push(reward);
      }

      return acc;
    },
    { active: [], used: [], expired: [] }
  );
};

const rewardSlice = createSlice({
  name: "reward",
  initialState,
  reducers: {
    clearRewards: (state) => {
      state.rewards = initialState.rewards;
    },
    clearSelectedReward: (state) => {
      state.selectedReward = initialState.selectedReward;
    },
    clearRedeemedRewards: (state) => {
      state.redeemedRewards = initialState.redeemedRewards;
    },
    clearSelectedRedeemedReward: (state) => {
      state.selectedRedeemedReward = initialState.selectedRedeemedReward;
    },
    clearTransactionHistory: (state) => {
      state.transactionHistory = initialState.transactionHistory;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPoints.fulfilled, (state, action) => {
        const { point } = action.payload;

        state.points = point;
      })
      .addCase(getRewards.fulfilled, (state, action) => {
        const { active, upcoming } = action.payload;

        state.rewards.active = active;
        state.rewards.upcoming = upcoming;
      })
      .addCase(getReward.fulfilled, (state, action) => {
        state.selectedReward = action.payload;
      })
      .addCase(getRedeemedRewards.fulfilled, (state, action) => {
        const categorizedRewards = categorizeRedeemedRewards(action.payload);

        state.redeemedRewards = {
          active: categorizedRewards.active,
          used: categorizedRewards.used,
          expired: categorizedRewards.expired,
        };
      })
      .addCase(getRedeemedReward.fulfilled, (state, action) => {
        state.selectedRedeemedReward = action.payload;
      })
      .addCase(getTransactionHistory.fulfilled, (state, action) => {
        state.transactionHistory = action.payload;
      });
  },
});

export const {
  clearRewards,
  clearSelectedReward,
  clearRedeemedRewards,
  clearSelectedRedeemedReward,
  clearTransactionHistory,
} = rewardSlice.actions;

export default rewardSlice.reducer;
