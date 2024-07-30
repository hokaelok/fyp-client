import { axiosInstance } from "..";

const register = async (data) => {
  const response = await axiosInstance.post('/register', {
    'email': data.email,
    'name': data.name,
    'country': data.country,
    'company_name': data.companyName,
    'password': data.password,
    'password_confirmation': data.confirmPassword,
    'user_type': data.userType,
  });
  return response.data;
};

const login = async (credential) => {
  const response = await axiosInstance.post('/login', credential);
  return response.data;
};

const logout = async (user) => {
  const response = await axiosInstance.post('/logout', user);
  return response.data;
};

const authAPI = {
  register,
  login,
  logout,
};

export default authAPI;
