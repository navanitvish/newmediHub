// authActions.js
import { 
  loginStart, 
  loginSuccess, 
  loginFailure, 
  registerStart,
  registerSuccess,
  registerFailure,
  logout, 
  restoreSession, 
  updateProfile,
  setAuthLoading,
  setInitialized
} from './authSlice';
import axiosInstance from '../../api/axiosInstance';
import API_ENDPOINTS from '../../api/apiEndpoint';

// Utility function to clean localStorage
const cleanLocalStorage = () => {
  const keys = Object.keys(localStorage);
  keys.forEach(key => {
    if (key.startsWith('smartmedi')) {
      const value = localStorage.getItem(key);
      if (value === 'undefined' || value === null) {
        localStorage.removeItem(key);
        console.log(`Cleaned corrupted localStorage key: ${key}`);
      }
    }
  });
};

// Utility function to ensure axios is properly configured
const ensureAxiosAuth = (token) => {
  if (!token) {
    console.error('No token provided to ensureAxiosAuth');
    return false;
  }
  
  const authHeader = `Bearer ${token}`;
  axiosInstance.defaults.headers.common['Authorization'] = authHeader;
  
  // Verify it was set
  const currentHeader = axiosInstance.defaults.headers.common['Authorization'];
  console.log('✅ Axios auth header configured:', currentHeader === authHeader);
  
  return currentHeader === authHeader;
};

// Registration action - NEW
export const register = (userData) => async (dispatch) => {
  try {
    dispatch(registerStart());
    
    // Prepare registration data
    const registrationData = {
      name: userData.name,
      email: userData.email,
      mobile: userData.mobile,
      password: userData.password,
      address: userData.address
    };

    console.log('📝 Attempting registration with data:', {
      ...registrationData,
      password: '[HIDDEN]'
    });

    const response = await axiosInstance.post(API_ENDPOINTS.AUTH.REGISTER, registrationData);
    
    console.log('✅ Registration API response:', response.data);
    
    // Handle different response formats
    let token, user;
    
    if (response.data.token && response.data.user) {
      // Format 1: { token, user }
      token = response.data.token;
      user = response.data.user;
    } else if (response.data.data) {
      // Format 2: { data: { token, user } }
      token = response.data.data.token;
      user = response.data.data.user;
    } else if (response.data.access_token) {
      // Format 3: { access_token, user_data }
      token = response.data.access_token;
      user = response.data.user_data || response.data.user;
    } else {
      // Handle registration without immediate login
      dispatch(registerSuccess({
        message: response.data.message || 'Registration successful! Please login.',
        requiresLogin: true
      }));
      return { 
        success: true, 
        requiresLogin: true,
        message: response.data.message || 'Registration successful! Please login.'
      };
    }

    if (token && user) {
      // Auto-login after successful registration
      if (!ensureAxiosAuth(token)) {
        throw new Error('Failed to configure axios authentication');
      }
      
      // Fetch fresh profile data to ensure consistency
      try {
        console.log('📞 Fetching profile after registration...');
        const profileResponse = await axiosInstance.get(API_ENDPOINTS.AUTH.PROFILE);
        console.log('✅ Profile fetched after registration:', profileResponse.data);
        
        dispatch(registerSuccess({ 
          token, 
          user: profileResponse.data,
          autoLogin: true
        }));
      } catch (profileError) {
        console.warn('⚠️ Profile fetch failed, using registration data:', profileError);
        dispatch(registerSuccess({ 
          token, 
          user,
          autoLogin: true
        }));
      }
      
      return { success: true, autoLogin: true };
    }

    return { success: true };
  } catch (error) {
    console.error('❌ Registration failed:', error);
    
    let errorMessage = 'Registration failed';
    
    if (error.response?.data) {
      if (error.response.data.message) {
        errorMessage = error.response.data.message;
      } else if (error.response.data.errors) {
        // Handle validation errors
        const errors = error.response.data.errors;
        if (typeof errors === 'object') {
          errorMessage = Object.values(errors).flat().join(', ');
        } else {
          errorMessage = errors;
        }
      }
    }
    
    dispatch(registerFailure(errorMessage));
    return { success: false, error: errorMessage };
  }
};

// Login action - EXISTING (with minor improvements)
export const login = (credentials) => async (dispatch) => {
  try {
    dispatch(loginStart());
    const response = await axiosInstance.post(API_ENDPOINTS.AUTH.LOGIN, credentials);
    const { token, user } = response.data;
    
    // Ensure axios auth header is properly set
    if (!ensureAxiosAuth(token)) {
      throw new Error('Failed to configure axios authentication');
    }
    
    // Always fetch fresh profile data after login
    try {
      console.log('📞 Making profile API call after login...');
      const profileResponse = await axiosInstance.get(API_ENDPOINTS.AUTH.PROFILE);
      console.log('✅ Profile fetched successfully after login:', profileResponse.data);
      
      // Use the profile data instead of login response user data
      dispatch(loginSuccess({ 
        token, 
        user: profileResponse.data 
      }));
    } catch (profileError) {
      console.error('❌ Failed to fetch profile after login:', profileError);
      // Fallback to user data from login response
      dispatch(loginSuccess({ token, user }));
    }
    
    return { success: true };
  } catch (error) {
    console.error('❌ Login failed:', error);
    const errorMessage = error.response?.data?.message || 'Login failed';
    dispatch(loginFailure(errorMessage));
    return { success: false, error: errorMessage };
  }
};

// Logout action - EXISTING
export const logoutUser = () => async (dispatch) => {
  try {
    // Clear token from axios headers
    delete axiosInstance.defaults.headers.common['Authorization'];
    
    await axiosInstance.post(API_ENDPOINTS.AUTH.LOGOUT);
    dispatch(logout());
  } catch (error) {
    console.error('Logout error:', error);
    // Even if the API call fails, we still want to clear local state
    dispatch(logout());
  }
};

// Get user profile - EXISTING
export const getUserProfile = () => async (dispatch) => {
  try {
    const token = localStorage.getItem('smartmeditoken');
    if (!token) {
      console.error('❌ No token found for profile fetch');
      return { success: false, error: 'No authentication token' };
    }

    // Ensure axios is configured properly
    if (!ensureAxiosAuth(token)) {
      console.error('❌ Failed to configure axios for profile fetch');
      return { success: false, error: 'Authentication configuration failed' };
    }

    console.log('📞 Fetching user profile...');
    const response = await axiosInstance.get(API_ENDPOINTS.AUTH.PROFILE);
    console.log('✅ Profile response:', response.data);
    
    // Use loginSuccess to properly update both user and token in state and localStorage
    dispatch(loginSuccess({ 
      token: token, 
      user: response.data 
    }));
    
    return { success: true, user: response.data };
  } catch (error) {
    console.error('❌ Get profile error:', error);
    const errorMessage = error.response?.data?.message || 'Failed to fetch profile';
    return { success: false, error: errorMessage };
  }
};

// Initialize authentication - EXISTING
export const initializeAuth = () => async (dispatch) => {
  console.log('🚀 Initializing authentication...');
  dispatch(setAuthLoading(true));
  
  try {
    const result = await dispatch(checkAuth());
    console.log('✅ Authentication initialization complete:', result.success);
    return result;
  } catch (error) {
    console.error('❌ Authentication initialization failed:', error);
    dispatch(setInitialized());
    return { success: false, error: error.message };
  } finally {
    dispatch(setAuthLoading(false));
  }
};

// Check and restore authentication on page reload - EXISTING
export const checkAuth = () => async (dispatch) => {
  try {
    // Clean any corrupted localStorage first
    cleanLocalStorage();
    
    const token = localStorage.getItem('smartmeditoken');
    const userStr = localStorage.getItem('smartmediuserData');

    console.log("🔍 checkAuth - token exists:", !!token);
    console.log("🔍 checkAuth - userStr exists:", !!userStr);
    
    if (!token) {
      console.log('❌ No token found, user not authenticated');
      dispatch(logout()); // Ensure clean state
      return { success: false, error: 'No token found' };
    }

    // CRITICAL: Ensure axios auth header is properly configured
    if (!ensureAxiosAuth(token)) {
      console.error('❌ Failed to configure axios authentication header');
      dispatch(logout());
      return { success: false, error: 'Failed to configure authentication' };
    }
    
    // If we have valid user data, restore session first to prevent UI flicker
    if (userStr && userStr !== 'undefined') {
      try {
        const userData = JSON.parse(userStr);
        console.log('🔄 Restoring session from localStorage for user:', userData.email || userData.username || userData.id || 'unknown');
        dispatch(restoreSession());
      } catch (error) {
        console.error('❌ Error parsing stored user data:', error);
        localStorage.removeItem('smartmediuserData');
      }
    }
    
    // Always verify token and fetch fresh user data
    console.log('📞 Making profile API call to verify token on page refresh...');
    console.log('🔗 API Endpoint:', API_ENDPOINTS.AUTH.PROFILE);
    console.log('🔑 Auth Header:', axiosInstance.defaults.headers.common['Authorization']?.substring(0, 20) + '...');
    
    const response = await axiosInstance.get(API_ENDPOINTS.AUTH.PROFILE);
    console.log('✅ Profile API call successful on refresh:', response.data);
    
    // Update with fresh data
    dispatch(loginSuccess({ 
      token: token, 
      user: response.data 
    }));
    
    return { success: true, user: response.data };
    
  } catch (error) {
    console.error('❌ checkAuth failed on page refresh:', error);
    console.error('📋 Error details:', {
      status: error.response?.status,
      statusText: error.response?.statusText,
      message: error.response?.data?.message,
      url: error.config?.url,
      method: error.config?.method,
      headers: error.config?.headers
    });
    
    // If token is invalid or API call fails, clear authentication
    dispatch(logout());
    
    // Clear axios header as well
    delete axiosInstance.defaults.headers.common['Authorization'];
    
    return { 
      success: false, 
      error: error.response?.data?.message || 'Authentication expired' 
    };
  }
};