// src/redux/slices/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { loginUser, verifyOtp, logoutUser, getUserProfile } from '../../api/apiCall';

// Check if token exists in localStorage on initial load
const token = localStorage.getItem('token');

// Async thunks
export const login = createAsyncThunk(
  'auth/login',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await loginUser(userData);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: 'Login failed' });
    }
  }
);

export const verifyOtpThunk = createAsyncThunk(
  'auth/verifyOtp',
  async (otpData, { rejectWithValue }) => {
    try {
      const response = await verifyOtp(otpData);
      // Store token in localStorage
      if (response.token) {
        localStorage.setItem('token', response.token);
      }
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: 'OTP verification failed' });
    }
  }
);

export const logout = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await logoutUser();
      localStorage.removeItem('token');
      return null;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: 'Logout failed' });
    }
  }
);

export const fetchUserProfile = createAsyncThunk(
  'auth/fetchUserProfile',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getUserProfile();
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: 'Failed to fetch user profile' });
    }
  }
);

// Initialize state based on token presence
const initialState = {
  user: null,
  isAuthenticated: !!token, // Set to true if token exists
  isOtpSent: false,
  email: '',
  loading: false,
  error: null,
  token: token || null, // Store token in state as well
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearErrors: (state) => {
      state.error = null;
    },
    resetAuth: () => {
      // Keep token during reset if it exists
      const token = localStorage.getItem('token');
      return {
        ...initialState,
        isAuthenticated: !!token,
        token: token || null,
      };
    },
    // Add a new reducer to initialize auth state from localStorage
    initAuthFromStorage: (state) => {
      const token = localStorage.getItem('token');
      if (token) {
        state.token = token;
        state.isAuthenticated = true;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Login reducers
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.isOtpSent = true;
        state.email = action.payload.email || action.meta.arg.email;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Login failed';
      })
      
      // OTP verification reducers
      .addCase(verifyOtpThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyOtpThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.isOtpSent = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(verifyOtpThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'OTP verification failed';
      })
      
      // Logout reducers
      .addCase(logout.pending, (state) => {
        state.loading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        return initialState;
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Logout failed';
      })
      
      // Fetch user profile reducers
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        // Only reset authentication if there's a 401 Unauthorized error
        if (action.payload?.statusCode === 401) {
          state.isAuthenticated = false;
          state.user = null;
        } else {
          state.error = action.payload?.message || 'Failed to fetch user profile';
        }
      });
  },
});

export const { clearErrors, resetAuth, initAuthFromStorage } = authSlice.actions;

export default authSlice.reducer;