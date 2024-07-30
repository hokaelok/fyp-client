import { axiosInstance } from "..";

const getBizPickups = async ({ id, type }) => {
  try {
    const response = await axiosInstance.get(`/business/pickups?type=${type}&id=${id}`);
    return response.data;
  } catch (err) {
    throw err;
  }
};

const getBizPickup = async (pickupId) => {
  try {
    const response = await axiosInstance.get(`/business/pickup/${pickupId}`);
    return response.data;
  } catch (err) {
    throw err;
  }
};

const updateBizPickup = async (data) => {
  try {
    const response = await axiosInstance.post(`/business/pickup/update/${data.pickupId}`, {
      decision: data.decision,
      remark: data.remark,
    });
    return response.data;
  } catch (err) {
    throw err;
  }
};

const pickupAPI = {
  getBizPickups,
  getBizPickup,
  updateBizPickup,
};

export default pickupAPI;