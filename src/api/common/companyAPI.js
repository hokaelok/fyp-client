import { axiosInstance } from "..";

const getCompany = async () => {
  try {
    const response = await axiosInstance.get("/company");
    return response.data;
  } catch (error) {
    throw error;
  }
};

const updateCompany = async (data) => {
  try {
    const response = await axiosInstance.post("/company/update", data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getBranches = async (companyId) => {
  try {
    const response = await axiosInstance.get(`/branches?company_id=${companyId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getBranch = async (branchId) => {
  try {
    const response = await axiosInstance.get(`/branch/${branchId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const createBranch = async (data) => {
  try {
    const response = await axiosInstance.post("/branch/create", {
      'company_id': data.companyId,
      'branch_name': data.branchName,
      'branch_email': data.email,
      'branch_phone': data.contactNumber,
      'branch_type': data.branchType,
      'branch_start_hour': data.businessStartHour,
      'branch_end_hour': data.businessEndHour,
      'branch_street': data.street,
      'branch_city': data.city,
      'branch_state': data.state,
      'branch_zip': data.zip,
      'branch_latitude': data.latitude,
      'branch_longitude': data.longitude,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

const updateBranch = async (data) => {
  try {
    const response = await axiosInstance.post(`/branch/update/${data.branchId}`, {
      'branch_name': data.branchName,
      'branch_email': data.email,
      'branch_phone': data.contactNumber,
      'branch_start_hour': data.businessStartHour,
      'branch_end_hour': data.businessEndHour,
      'branch_street': data.street,
      'branch_city': data.city,
      'branch_state': data.state,
      'branch_zip': data.zip,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

const companyAPI = {
  getCompany,
  updateCompany,
  getBranches,
  getBranch,
  createBranch,
  updateBranch,
};

export default companyAPI;