import axios from "axios";

const URL = 'http://localhost:8000/api';

const axiosInstance = axios.create({
  baseURL: URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
});

const setToken = (token) => {
  axiosInstance.interceptors.request.use((config) => {
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  }, (error) => {
    return Promise.reject(error);
  });
};

export { axiosInstance, setToken };
