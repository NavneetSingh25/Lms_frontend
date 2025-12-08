// src/Helpers/axiosInstance.js
import axios from "axios";

const BASE_URL = "http://localhost:3000/api/v1";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

// ✅ Inject token into every request
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token && token !== "undefined") {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
export default axiosInstance;