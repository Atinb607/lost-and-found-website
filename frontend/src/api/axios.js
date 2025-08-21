import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE || "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Set token from localStorage on app initialization
const token = localStorage.getItem('authToken');
if (token) {
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

// Add request interceptor for debugging and token management
api.interceptors.request.use((config) => {
  console.log("📤 API Request:", config.method.toUpperCase(), config.url);
  console.log("📤 Request headers:", config.headers);
  
  // Ensure token is always set if available
  const currentToken = localStorage.getItem('authToken');
  if (currentToken && !config.headers.Authorization) {
    config.headers.Authorization = `Bearer ${currentToken}`;
  }
  
  return config;
});

// Add response interceptor for debugging
api.interceptors.response.use(
  (response) => {
    console.log("📥 API Response:", response.status, response.data);
    return response;
  },
  (error) => {
    console.error("📥 API Error:", error.response?.status, error.response?.data);
    
    // Auto logout on 401 errors
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken');
      delete api.defaults.headers.common['Authorization'];
      // Redirect to login or trigger logout in your app
      window.location.href = '/auth';
    }
    
    return Promise.reject(error);
  }
);

export default api;
