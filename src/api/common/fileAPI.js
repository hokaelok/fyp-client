import { axiosInstance } from "..";

export const uploadFile = async (key, file) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('key', file.name);

  try {
    const response = await axiosInstance.post("file/create", formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getFile = async (key) => {
  try {
    const response = await axiosInstance.get(`file/${key}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteFile = async (key) => {
  const response = await api.delete(`/file/delete/${key}`);
  return response.data;
};

const fileAPI = {
  uploadFile,
  getFile,
  deleteFile,
};

export default fileAPI;
