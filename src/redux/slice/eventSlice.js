import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import eventAPI from "@/api/common/eventAPI";

import { toast } from "sonner";

const initialState = {
  events: [],
  selectedEvent: {
    id: null,
    company_id: null,
    name: "",
    image: null,
    description: "",
    startTime: "",
    endTime: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    latitude: "",
    longitude: "",
  },
};

export const getEvents = createAsyncThunk(
  "event/getEvents",
  async (companyId, { rejectWithValue }) => {
    try {
      const response = await eventAPI.getEvents(companyId);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getEvent = createAsyncThunk(
  "event/getEvent",
  async (eventId, { rejectWithValue }) => {
    try {
      const response = await eventAPI.getEvent(eventId);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const createEvent = createAsyncThunk(
  "event/createEvent",
  async (data, { rejectWithValue }) => {
    try {
      const response = await eventAPI.createEvent(data);
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

export const updateEvent = createAsyncThunk(
  "event/updateEvent",
  async (data, { rejectWithValue }) => {
    try {
      const response = await eventAPI.updateEvent(data);
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

const eventSlice = createSlice({
  name: "event",
  initialState,
  reducers: {
    clearEvents: (state) => {
      state.events = initialState.events;
    },
    clearSelectedEvent: (state) => {
      state.selectedEvent = initialState.selectedEvent;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getEvents.fulfilled, (state, action) => {
        state.events = action.payload;
      })
      .addCase(getEvent.fulfilled, (state, action) => {
        const { payload } = action;

        state.selectedEvent = {
          id: payload.id,
          company_id: payload.company_id,
          name: payload.name,
          image: payload.image,
          description: payload.description,
          startTime: payload.start_time,
          endTime: payload.end_time,
          street: payload.street,
          city: payload.city,
          state: payload.state,
          zip: payload.zip,
          latitude: payload.latitude,
          longitude: payload.longitude,
        };
      });
  }
});

export const {
  clearEvents,
  clearSelectedEvent,
} = eventSlice.actions;

export default eventSlice.reducer;
