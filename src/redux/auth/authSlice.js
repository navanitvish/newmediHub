// authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: localStorage.getItem('smartmeditoken') || null,
  isAuthenticated: !!localStorage.getItem('smartmeditoken'),
  loading: false,
  error: null,
  user: null,
  loginRedirect: localStorage.getItem('smartmediloginRedirect') !== 'false',
  initialized: false,
  // Registration specific states
  registrationLoading: false,
  registrationError: null,
  registrationSuccess: false,
  registrationMessage: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Login actions
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.loginRedirect = false;
      state.initialized = true;
      // Clear registration states on successful login
      state.registrationSuccess = false;
      state.registrationMessage = null;
      state.registrationError = null;
      
      localStorage.setItem('smartmeditoken', action.payload.token);
      localStorage.setItem('smartmediuserData', JSON.stringify(action.payload.user));
      localStorage.setItem('smartmediloginRedirect', 'false');
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.initialized = true;
    },

    // Registration actions
    registerStart: (state) => {
      state.registrationLoading = true;
      state.registrationError = null;
      state.registrationSuccess = false;
      state.registrationMessage = null;
    },
    registerSuccess: (state, action) => {
      state.registrationLoading = false;
      state.registrationSuccess = true;
      
      if (action.payload.autoLogin) {
        // Auto-login after registration
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.loginRedirect = false;
        state.initialized = true;
        state.registrationMessage = 'Registration successful! Welcome to Smart Medihub.';
        
        localStorage.setItem('smartmeditoken', action.payload.token);
        localStorage.setItem('smartmediuserData', JSON.stringify(action.payload.user));
        localStorage.setItem('smartmediloginRedirect', 'false');
      } else {
        // Registration without auto-login
        state.registrationMessage = action.payload.message || 'Registration successful! Please login to continue.';
      }
    },
    registerFailure: (state, action) => {
      state.registrationLoading = false;
      state.registrationError = action.payload;
      state.registrationSuccess = false;
    },

    // Clear registration states
    clearRegistrationState: (state) => {
      state.registrationLoading = false;
      state.registrationError = null;
      state.registrationSuccess = false;
      state.registrationMessage = null;
    },

    // General auth actions
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.loginRedirect = true;
      state.initialized = true;
      // Clear registration states
      state.registrationLoading = false;
      state.registrationError = null;
      state.registrationSuccess = false;
      state.registrationMessage = null;
      
      localStorage.removeItem('smartmeditoken');
      localStorage.removeItem('smartmediuserData');
      localStorage.setItem('smartmediloginRedirect', 'true');
    },
    updateProfile: (state, action) => {
      if (state.user && action.payload) {
        state.user = {...state.user, ...action.payload};
        localStorage.setItem('smartmediuserData', JSON.stringify(state.user));
        console.log('Updated user data:', state.user);
      } else {
        console.error('Cannot update profile: missing user or payload data');
      }
    },
    restoreSession: (state) => {
      const token = localStorage.getItem('smartmeditoken');
      const user = localStorage.getItem('smartmediuserData');
      const loginRedirect = localStorage.getItem('smartmediloginRedirect');
     
      console.log('Restore session - token:', !!token);
      console.log('Restore session - user:', user ? 'exists' : 'null');
      console.log('Restore session - loginRedirect:', loginRedirect);
     
      if (token && user && user !== 'undefined') {
        try {
          const userData = JSON.parse(user);
          state.token = token;
          state.user = userData;
          state.isAuthenticated = true;
          state.loginRedirect = loginRedirect !== 'false';
          state.initialized = true;
          console.log('Session restored for user:', userData.email || userData.username || userData.id);
        } catch (error) {
          console.error('Error parsing user data:', error);
          localStorage.removeItem('smartmediuserData');
          state.initialized = true;
        }
      } else {
        state.initialized = true;
      }
    },
    resetLoginRedirect: (state) => {
      state.loginRedirect = true;
      localStorage.setItem('smartmediloginRedirect', 'true');
    },
    setAuthLoading: (state, action) => {
      state.loading = action.payload;
    },
    setInitialized: (state) => {
      state.initialized = true;
    }
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  registerStart,
  registerSuccess,
  registerFailure,
  clearRegistrationState,
  logout,
  updateProfile,
  restoreSession,
  resetLoginRedirect,
  setAuthLoading,
  setInitialized
} = authSlice.actions;

export default authSlice.reducer;