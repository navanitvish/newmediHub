// src/api/apiEndpoint.jsx
export const API_BASE_URL = 'http://localhost:9001';

export const ENDPOINTS = {
  LOGIN: '/login',
  VERIFY_OTP: '/verify-otp',
  LOGOUT: '/auth/logout',
  GET_USER: '/user/profile',
  CREATE_APPOINTMENT: '/appointments',
  GET_USER_APPOINTMENTS: '/appointments/user',
  UPDATE_APPOINTMENT: '/appointments',
  CANCEL_APPOINTMENT: '/appointments'
};