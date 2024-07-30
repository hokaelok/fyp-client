import { axiosInstance } from "..";

const getEvents = async (companyId) => {
  try {
    const response = await axiosInstance.get(`/events?company_id=${companyId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getEvent = async (eventId) => {
  try {
    const response = await axiosInstance.get(`/event/${eventId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const createEvent = async (data) => {
  try {
    const response = await axiosInstance.post("/event/create", {
      'company_id': data.companyId,
      'name': data.name,
      'image': data.image,
      'description': data.description,
      'start_time': data.startTime,
      'end_time': data.endTime,
      'street': data.street,
      'city': data.city,
      'state': data.state,
      'zip': data.zip,
      'latitude': data.latitude,
      'longitude': data.longitude,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

const updateEvent = async (data) => {
  try {
    const response = await axiosInstance.post(`/event/update/${data.id}`, {
      'company_id': data.companyId,
      'name': data.name,
      'image': data.image,
      'description': data.description,
      'start_time': data.startTime,
      'end_time': data.endTime,
      'street': data.street,
      'city': data.city,
      'state': data.state,
      'zip': data.zip,
      'latitude': data.latitude,
      'longitude': data.longitude,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const eventAPI = {
  getEvents,
  getEvent,
  createEvent,
  updateEvent,
};

export default eventAPI;