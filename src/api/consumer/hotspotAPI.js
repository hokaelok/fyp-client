import { axiosInstance } from "..";

const getHotspots = async () => {
  try {
    const response = await axiosInstance.get('/hotspots/');
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getHotspot = async ({ hotspotType, hotspotId }) => {
  try {
    const response = await axiosInstance.get(`/hotspot?type=${hotspotType}&id=${hotspotId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const hotspotAPI = {
  getHotspots,
  getHotspot,
};

export default hotspotAPI;
