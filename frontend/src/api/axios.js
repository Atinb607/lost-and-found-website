import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api", // Make sure this matches your backend URL
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Add request interceptor for debugging
api.interceptors.request.use((config) => {
  console.log("📤 Making request:", config.method.toUpperCase(), config.url);
  console.log("📤 Request data:", config.data);
  console.log("📤 Request headers:", config.headers);
  return config;
});

// Add response interceptor for debugging
api.interceptors.response.use(
  (response) => {
    console.log("📥 Response received:", response.status, response.data);
    return response;
  },
  (error) => {
    console.error("📥 Response error:", error.response?.status, error.response?.data);
    return Promise.reject(error);
  }
);

export default api;
