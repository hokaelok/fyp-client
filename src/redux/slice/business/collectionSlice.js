import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import collectionAPI from "@/api/business/collectionAPI";

import { toast } from "sonner";

const initialState = {
  collections: [],
  selectedCollection: null,
  bookedSlots: [],
};

export const requestCollection = createAsyncThunk(
  "collection/requestCollection",
  async (data, { rejectWithValue }) => {
    try {
      const response = await collectionAPI.requestCollection(data);
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

export const getCollectionList = createAsyncThunk(
  "collection/getCollectionList",
  async (data, { rejectWithValue }) => {
    try {
      const response = await collectionAPI.getCollectionList(data);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getCollection = createAsyncThunk(
  "collection/getCollection",
  async (collectionId, { rejectWithValue }) => {
    try {
      const response = await collectionAPI.getCollection(collectionId);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getBookedSlots = createAsyncThunk(
  "collection/getBookedSlots",
  async (data, { rejectWithValue }) => {
    try {
      const response = await collectionAPI.getBookedSlots(data);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const collectionSlice = createSlice({
  name: "collection",
  initialState,
  reducers: {
    clearCollectionList: (state) => {
      state.collections = initialState.collections;
    },
    clearSelectedCollection: (state) => {
      state.selectedCollection = initialState.selectedCollection;
    },
    clearBookedSlots: (state) => {
      state.bookedSlots = initialState.bookedSlots;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCollectionList.fulfilled, (state, action) => {
        state.collections = action.payload;
      })
      .addCase(getCollection.fulfilled, (state, action) => {
        state.selectedCollection = action.payload;
      })
      .addCase(getBookedSlots.fulfilled, (state, action) => {
        state.bookedSlots = action.payload;
      });
  },
});

export const {
  clearCollectionList,
  clearSelectedCollection,
  clearBookedSlots,
} = collectionSlice.actions;

export default collectionSlice.reducer;
