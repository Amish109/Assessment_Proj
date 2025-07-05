// services/axiosService.js
import axios from 'axios';
import { API_URL } from '../constants';

const baseURL = API_URL; // replace with your actual API base URL

const axiosInterceptor = axios.create({
  baseURL,
  timeout: 10000, // 10 seconds
  headers: {
    'Content-Type': 'application/json',
  },
});

// Optional: Add request interceptor (e.g., for adding tokens)
axiosInterceptor.interceptors.request.use(
  (config) => {
    // Example: add auth token if exists
    const token = localStorage.getItem('token'); // or use cookies
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Optional: Response interceptor
axiosInterceptor.interceptors.response.use(
  (response) => response,
  (error) => {
    // You can centralize error handling here
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default axiosInterceptor;
