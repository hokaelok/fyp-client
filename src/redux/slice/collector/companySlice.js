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

const companySlice = createSlice({
  name: "company",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCompany.fulfilled, (state, action) => {
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
    });
  },
});

export default companySlice.reducer;