import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import userAPI from "@/api/common/userAPI";
import { logoutUser } from "./authSlice";

import { toast } from "sonner";

const initialState = {
  user: {
    id: null,
    name: null,
    email: null,
    country: null,
  },
  userType: 'guest',
  address: {
    street: null,
    city: null,
    state: null,
    zip: null,
    latitude: null,
    longitude: null,
  },
};

export const getUser = createAsyncThunk(
  "user/getUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await userAPI.getUser();
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async (data, { rejectWithValue }) => {
    try {
      const response = await userAPI.updateUser(data);
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

export const deleteAddress = createAsyncThunk(
  "user/deleteAddress",
  async (_, { rejectWithValue }) => {
    try {
      const response = await userAPI.deleteAddress();
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

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUser.fulfilled, (state, action) => {
        const { id, name, email, country, user_type, address } = action.payload;

        state.user.id = id;
        state.user.name = name;
        state.user.email = email;
        state.user.country = country;
        state.userType = user_type;

        if (address) {
          state.address.street = address.street;
          state.address.state = address.state;
          state.address.city = address.city;
          state.address.zip = address.zip;
          state.address.latitude = address.latitude;
          state.address.longitude = address.longitude;
        }
      })
      .addCase(deleteAddress.fulfilled, (state) => {
        state.address = initialState.address;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        return initialState;
      });
  },
});

export const {
  setUser,
} = userSlice.actions;

export default userSlice.reducer;