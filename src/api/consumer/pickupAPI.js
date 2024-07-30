import { axiosInstance } from "..";

const requestPickup = async (data) => {
  try {
    const response = await axiosInstance.post('/pickup/create', {
      name: data.name,
      branch_id: data.branchId,
      contact_number: data.contactNumber,
      waste_payload: data.wastePayload,
      request_pickup_time: data.requestPickupTime,
      city: data.city,
      state: data.state,
      street: data.street,
      zip: data.zip,
      latitude: data.latitude,
      longitude: data.longitude,
    });
    return response.data;
  } catch (err) {
    throw err;
  }
};

const getPickups = async ({ id, type }) => {
  try {
    const response = await axiosInstance.get(`/pickups?type=${type}&id=${id}`);
    return response.data;
  } catch (err) {
    throw err;
  }
};

const getPickup = async (pickupId) => {
  try {
    const response = await axiosInstance.get(`/pickup/${pickupId}`);
    return response.data;
  } catch (err) {
    throw err;
  }
};

const getBookedSlots = async (data) => {
  try {
    const response = await axiosInstance.get(`/pickup/bookedSlots/${data.branchId}`);
    return response.data;
  } catch (err) {
    throw err;
  }
};

const pickupAPI = {
  requestPickup,
  getPickups,
  getPickup,
  getBookedSlots,
};

export default pickupAPI;