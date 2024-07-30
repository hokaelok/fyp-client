import { axiosInstance } from "..";

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

const updatePickup = async (data) => {
  try {
    const response = await axiosInstance.post(`/pickup/update/${data.pickupId}`, {
      decision: data.decision,
      remark: data.remark,
      points: data.points,
    });
    return response.data;
  } catch (err) {
    throw err;
  }
};

const pickupAPI = {
  getPickups,
  getPickup,
  updatePickup,
};

export default pickupAPI;