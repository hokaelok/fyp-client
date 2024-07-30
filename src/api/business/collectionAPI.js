import { axiosInstance } from "..";

const requestCollection = async (data) => {
  try {
    const response = await axiosInstance.post('/business/pickup/create', {
      'requestor_branch_id': data.requestorBranchId,
      'collector_branch_id': data.collectorBranchId,
      'waste_payload': data.wastePayload,
      'request_pickup_time': data.requestPickupTime,
    });
    return response.data;
  } catch (err) {
    throw err;
  }
};

const getCollectionList = async ({ id, type }) => {
  try {
    const response = await axiosInstance.get(`/business/pickups?type=${type}&id=${id}`);
    return response.data;
  } catch (err) {
    throw err;
  }
};

const getCollection = async (collectionId) => {
  try {
    const response = await axiosInstance.get(`/business/pickup/${collectionId}`);
    return response.data;
  } catch (err) {
    throw err;
  }
};

const getBookedSlots = async (data) => {
  try {
    const response = await axiosInstance.get(`/business/pickup/bookedSlots/${data.branchId}`);
    return response.data;
  } catch (err) {
    throw err;
  }
};

const collectionAPI = {
  requestCollection,
  getCollectionList,
  getCollection,
  getBookedSlots,
};

export default collectionAPI;