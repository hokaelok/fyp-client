import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import authAPI from '@/api/auth/authAPI';
import { setToken } from '@/api';
import { toast } from 'sonner';

const initialState = {
  token: null,
  isAuthenticated: false,
};

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (user, { rejectWithValue }) => {
    try {
      const response = await authAPI.register(user);
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

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (user, { rejectWithValue }) => {
    try {
      const response = await authAPI.login(user);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async (user, { rejectWithValue }) => {
    try {
      const response = await authAPI.logout(user);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        const { token } = action.payload;

        setToken(token);
        state.token = token;
        state.isAuthenticated = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        setToken(null);
        return initialState;
      });
  },
});

export const {
  logout
} = authSlice.actions;

export default authSlice.reducer;
