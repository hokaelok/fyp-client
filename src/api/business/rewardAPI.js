import { axiosInstance } from "..";

const getRewards = async (companyId) => {
  try {
    const response = await axiosInstance.get(`/business/rewards?companyId=${companyId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getReward = async (rewardId) => {
  try {
    const response = await axiosInstance.get(`/business/reward/${rewardId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const createReward = async (data) => {
  try {
    const response = await axiosInstance.post("/business/reward/create", {
      'company_id': data.companyId,
      'image': data.image,
      'name': data.name,
      'description': data.description,
      'required_points': data.points,
      'start_time': data.startTime,
      'end_time': data.endTime,
      'expiry_time': data.expiryTime,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

const updateReward = async (data) => {
  try {
    const response = await axiosInstance.post(`/business/reward/update/${data.id}`, {
      'image': data.image,
      'name': data.name,
      'description': data.description,
      'required_points': data.points,
      'start_time': data.startTime,
      'end_time': data.endTime,
      'expiry_time': data.expiryTime,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

const deleteReward = async (rewardId) => {
  try {
    const response = await axiosInstance.post("/business/reward/delete", {
      'reward_id': rewardId,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

const rewardAPI = {
  getRewards,
  getReward,
  createReward,
  updateReward,
  deleteReward,
};

export default rewardAPI;
