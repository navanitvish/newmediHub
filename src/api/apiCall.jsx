// src/api/apiCalls.jsx
import axiosInstance from './axiosInstance';
import { ENDPOINTS } from './apiEndpoint';

export const loginUser = async (userData) => {
  const response = await axiosInstance.post(ENDPOINTS.LOGIN, userData);
  return response.data;
};

export const verifyOtp = async (otpData) => {
  const response = await axiosInstance.put(ENDPOINTS.VERIFY_OTP, otpData);
  return response.data;
};

export const logoutUser = async () => {
  const response = await axiosInstance.post(ENDPOINTS.LOGOUT);
  return response.data;
};

export const getUserProfile = async () => {
  const response = await axiosInstance.get(ENDPOINTS.GET_USER);
  return response.data;
};


export const createAppointment = async (appointmentData) => {
  // Get the token from localStorage or wherever you store it
  const token = localStorage.getItem('TOKEN');
  
  if (!token) {
    throw new Error('Authentication token is missing');
  }
  
  const response = await axiosInstance.post(
    ENDPOINTS.CREATE_APPOINTMENT, 
    appointmentData,
    {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }
  );
  
  return response.data;
};

// Function to get all appointments for a user
export const getUserAppointments = async () => {
  const token = localStorage.getItem('token');
  
  if (!token) {
    throw new Error('Authentication token is missing');
  }
  
  const response = await axiosInstance.get(ENDPOINTS.GET_USER_APPOINTMENTS, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  
  return response.data;
};

// Function to update an appointment
export const updateAppointment = async (appointmentId, appointmentData) => {
  const token = localStorage.getItem('token');
  
  if (!token) {
    throw new Error('Authentication token is missing');
  }
  
  const response = await axiosInstance.put(
    `${ENDPOINTS.UPDATE_APPOINTMENT}/${appointmentId}`, 
    appointmentData,
    {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }
  );
  
  return response.data;
};

// Function to cancel an appointment
export const cancelAppointment = async (appointmentId) => {
  const token = localStorage.getItem('token');
  
  if (!token) {
    throw new Error('Authentication token is missing');
  }
  
  const response = await axiosInstance.delete(
    `${ENDPOINTS.CANCEL_APPOINTMENT}/${appointmentId}`,
    {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }
  );
  
  return response.data;
};