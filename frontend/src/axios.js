import axios from 'axios';

// Create an axios instance
const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://127.0.0.1:3000',  // Dynamic base URL via environment variables
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to headers if available
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');  // JWT token stored in localStorage after login
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Handle response errors globally (e.g., token expiry, network errors)
axiosInstance.interceptors.response.use(
  (response) => response, // Successful response, return it as is
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        // Handle token expiry, force logout or redirect to login
        localStorage.removeItem('token');
        // Optional: redirect to login page
        window.location.href = '/login';
      }
      // Log other API errors globally if needed
      console.error('API Error:', error.response.data);
    } else if (error.request) {
      // No response received (network error, server down, etc.)
      console.error('Network Error:', error.message);
    } else {
      // Something else happened while setting up the request
      console.error('Error:', error.message);
    }
    return Promise.reject(error);  // Propagate the error further
  }
);

export default axiosInstance;
