import { loginStart, loginSuccess, loginFailure, logout, restoreSession } from './authSlice';
import axiosInstance from '../../api/axiosInstance';
import API_ENDPOINTS from '../../api/apiEndpoint';

// Login action
export const login = (credentials) => async (dispatch) => {
  try {
    dispatch(loginStart());
    const response = await axiosInstance.post(API_ENDPOINTS.AUTH.LOGIN, credentials);
    
    // Check if response.data contains the expected properties
    if (!response.data || !response.data.token || !response.data.user) {
      throw new Error('Invalid response format from server');
    }
    
    const { token, user } = response.data;
    
    // Save to localStorage
    localStorage.setItem('newMedihubToken', token);
    localStorage.setItem('newMedihubUser', JSON.stringify(user));
    
    // Set token in axios headers for subsequent requests
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    
    dispatch(loginSuccess({ token, user }));
    return { success: true };
  } catch (error) {
    console.error('Login error:', error);
    const errorMessage = error.response?.data?.message || error.message || 'Login failed';
    dispatch(loginFailure(errorMessage));
    return { success: false, error: errorMessage };
  }
};

// Logout action
export const logoutUser = () => async (dispatch) => {
  try {
    // Clear token from axios headers
    delete axiosInstance.defaults.headers.common['Authorization'];
    
    // Clear localStorage
    localStorage.removeItem('newMedihubToken');
    localStorage.removeItem('newMedihubUser');
    
    // Try to call logout endpoint, but don't wait for it to complete the logout process
    axiosInstance.post(API_ENDPOINTS.AUTH.LOGOUT).catch(err => {
      console.warn('Logout API call failed:', err);
    });
    
    // Always dispatch logout regardless of API success
    dispatch(logout());
    return { success: true };
  } catch (error) {
    console.error('Logout error:', error);
    // Even if there's an error, we still want to clear local state
    dispatch(logout());
    return { success: false, error: error.message || 'Logout failed' };
  }
};

// Get user profile
export const getUserProfile = () => async (dispatch) => {
  try {
    // Check if we have a token before making the request
    const token = localStorage.getItem('newMedihubToken');
    if (!token) {
      return { success: false, error: 'No authentication token found' };
    }
    
    // Ensure token is set in headers
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    
    const response = await axiosInstance.get(API_ENDPOINTS.AUTH.PROFILE);
    
    // Validate response
    if (!response.data) {
      throw new Error('Invalid response from server');
    }
    
    // Update localStorage with fresh user data
    localStorage.setItem('newMedihubUser', JSON.stringify(response.data));
    
    dispatch(loginSuccess({
      token: token,
      user: response.data
    }));
    return { success: true };
  } catch (error) {
    console.error('Get profile error:', error);
    const errorMessage = error.response?.data?.message || error.message || 'Failed to fetch profile';
    
    // If we get a 401/403, the token is likely invalid, clear auth state
    if (error.response?.status === 401 || error.response?.status === 403) {
      dispatch(logout());
    }
    
    return { success: false, error: errorMessage };
  }
};

// Check and restore authentication on page reload
export const checkAuth = () => async (dispatch) => {
  try {
    const token = localStorage.getItem('newMedihubToken');
    const userStr = localStorage.getItem('newMedihubUser');
    
    console.log("token", token);
    console.log("userStr", userStr);
    
    if (!token) {
      return { success: false, error: 'No token found' };
    }
    
    // Set authorization header for all future requests
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    
    let user = null;
    
    // Safely parse user data
    try {
      user = userStr ? JSON.parse(userStr) : null;
    } catch (parseError) {
      console.error('Error parsing user data:', parseError);
      // Clear invalid user data
      localStorage.removeItem('newMedihubUser');
    }
    
    if (user) {
      // First, restore from localStorage to avoid flickering UI
      dispatch(restoreSession({ token, user }));
    } else {
      // We have a token but no valid user data
      console.warn('Token exists but no valid user data found');
    }
    
    // Verify token with backend and get fresh user data
    try {
      const response = await axiosInstance.get(API_ENDPOINTS.AUTH.PROFILE);
      
      if (!response.data) {
        throw new Error('Invalid response from server');
      }
      
      // Update localStorage with fresh user data
      localStorage.setItem('newMedihubUser', JSON.stringify(response.data));
      
      dispatch(loginSuccess({
        token: token,
        user: response.data
      }));
      
      return { success: true };
    } catch (apiError) {
      console.error('Token validation failed:', apiError);
      
      // If API call fails, clear authentication
      localStorage.removeItem('newMedihubToken');
      localStorage.removeItem('newMedihubUser');
      delete axiosInstance.defaults.headers.common['Authorization'];
      
      dispatch(logout());
      return { 
        success: false, 
        error: apiError.response?.status === 401 ? 'Authentication expired' : 'Failed to validate session' 
      };
    }
  } catch (error) {
    console.error('CheckAuth unexpected error:', error);
    dispatch(logout());
    return { success: false, error: error.message || 'Session verification failed' };
  }
};