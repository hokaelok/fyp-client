import { axiosInstance } from "..";

const getPoints = async () => {
  try {
    const response = await axiosInstance.get("/points");
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getRewards = async () => {
  try {
    const response = await axiosInstance.get("/rewards");
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getReward = async (rewardId) => {
  try {
    const response = await axiosInstance.get(`/reward/${rewardId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const redeemReward = async (data) => {
  try {
    const response = await axiosInstance.post(`/reward/redeem/${data.rewardId}`, {
      user_id: data.userId,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

const useReward = async (data) => {
  try {
    const response = await axiosInstance.post(`/reward/use/${data.redeemId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getRedeemedRewards = async () => {
  try {
    const response = await axiosInstance.get("/rewards/redeemed");
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getRedeemedReward = async (rewardId) => {
  try {
    const response = await axiosInstance.get(`/reward/redeemed/${rewardId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getTransactionHistory = async () => {
  try {
    const response = await axiosInstance.get("/points/history");
    return response.data;
  } catch (error) {
    throw error;
  }
};

const rewardsAPI = {
  getPoints,
  getRewards,
  getReward,
  redeemReward,
  useReward,
  getRedeemedRewards,
  getRedeemedReward,
  getTransactionHistory,
};

export default rewardsAPI;
