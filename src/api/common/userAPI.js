import { axiosInstance } from "..";

const getUser = async () => {
  const response = await axiosInstance.get("/user");
  return response.data;
};

const updateUser = async (data) => {
  const response = await axiosInstance.post("/user/update", {
    'name': data.name,
    'email': data.email,
    'country': data.country,
    'password': data.password,
    'new_password': data.new_password,
    'confirm_new_password': data.confirm_new_password,
    'address': data.address,
  });
  return response.data;
};

const deleteAddress = async () => {
  const response = await axiosInstance.post("/user/address/delete");
  return response.data;
};

const userAPI = {
  getUser,
  updateUser,
  deleteAddress,
};

export default userAPI;
