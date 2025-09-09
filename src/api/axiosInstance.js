import axios from 'axios';

<<<<<<< HEAD
const baseURL = 'https://medisawabackend.onrender.com/';
=======
const baseURL = 'https://medisawabackend.onrender.com';
>>>>>>> 3cfe3ff933be9d8ecde1a3a3ff5d7b304d8107d8

const axiosInstance = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add token to requests
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('newMedihubToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle token expiration
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('newMedihubToken');
      localStorage.removeItem('newMedihubUser');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
