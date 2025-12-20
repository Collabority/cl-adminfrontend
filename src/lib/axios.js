import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
});
instance.interceptors.request.use(
  (config) => {
    // 1. Get token from storage
    const token = localStorage.getItem("token");
    
    // 2. Attach it to the Authorization header
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
// ------------------------------------

export default instance;
