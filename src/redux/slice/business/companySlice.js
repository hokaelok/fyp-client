import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import companyAPI from "@/api/common/companyAPI";

import { toast } from "sonner";

const initialState = {
  company: {
    id: null,
    name: null,
    logo: null,
    website: null,
  },
  headquarter: {
    email: null,
    phone: null,
    address: null,
    startHour: null,
    endHour: null,
  },
  branches: [],
  selectedBranch: null,
};

export const getCompany = createAsyncThunk(
  "company/getCompany",
  async (_, { rejectWithValue }) => {
    try {
      const response = await companyAPI.getCompany();
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const updateCompany = createAsyncThunk(
  "company/updateCompany",
  async (data, { rejectWithValue }) => {
    try {
      const response = await companyAPI.updateCompany(data);
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

export const getBranches = createAsyncThunk(
  "company/getBranches",
  async (companyId, { rejectWithValue }) => {
    try {
      const response = await companyAPI.getBranches(companyId);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getBranch = createAsyncThunk(
  "company/getBranch",
  async (branchId, { rejectWithValue }) => {
    try {
      const response = await companyAPI.getBranch(branchId);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const createBranch = createAsyncThunk(
  "company/createBranch",
  async (data, { rejectWithValue }) => {
    try {
      const response = await companyAPI.createBranch(data);
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

export const updateBranch = createAsyncThunk(
  "company/updateBranch",
  async (data, { rejectWithValue }) => {
    try {
      const response = await companyAPI.updateBranch(data);
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

const companySlice = createSlice({
  name: "company",
  initialState,
  reducers: {
    clearBranches: (state) => {
      state.branches = initialState.branches;
    },
    clearSelectedBranch: (state) => {
      state.selectedBranch = initialState.selectedBranch;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCompany.fulfilled, (state, action) => {
        const { company, headquarter } = action.payload;
        const { operational_time } = headquarter;

        state.company = {
          id: company.id,
          name: company.name,
          logo: company.logo,
          website: company.website,
        };
        state.headquarter = {
          email: headquarter?.email,
          phone: headquarter?.phone,
          address: headquarter?.address,
          startHour: operational_time?.open_time || null,
          endHour: operational_time?.close_time || null,
        };
      })
      .addCase(getBranches.fulfilled, (state, action) => {
        state.branches = action.payload;
      })
      .addCase(getBranch.fulfilled, (state, action) => {
        const { address, operational_time } = action.payload;

        state.selectedBranch = {
          id: action.payload.id,
          name: action.payload.name,
          email: action.payload.email,
          phone: action.payload.phone,
          address: address,
          startHour: operational_time.open_time,
          endHour: operational_time.close_time,
        };
      });
  },
});

export const {
  clearBranches,
  clearSelectedBranch,
} = companySlice.actions;

export default companySlice.reducer;
