import { axiosInstance } from "..";

const getBizHotspots = async () => {
  try {
    const response = await axiosInstance.get('/business/hotspots/');
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getBizHotspot = async (hotspotId) => {
  try {
    const response = await axiosInstance.get(`/business/hotspot/${hotspotId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const hotspotAPI = {
  getBizHotspots,
  getBizHotspot,
};

export default hotspotAPI;