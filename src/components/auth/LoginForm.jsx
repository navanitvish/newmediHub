import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, register } from '../../redux/auth/authActions';
import { clearRegistrationState } from '../../redux/auth/authSlice';

const AuthForms = () => {
  const dispatch = useDispatch();
  const { 
    loading, 
    error, 
    registrationLoading, 
    registrationError, 
    registrationSuccess, 
    registrationMessage,
    isAuthenticated 
  } = useSelector(state => state.auth);

  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  
  // Login form state
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  // Register form state
  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    mobile: '',
    password: '',
    address: ''
  });

  // Form validation
  const [validationErrors, setValidationErrors] = useState({});

  // Clear registration state when switching forms
  useEffect(() => {
    if (registrationSuccess || registrationError) {
      const timer = setTimeout(() => {
        dispatch(clearRegistrationState());
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [registrationSuccess, registrationError, dispatch]);

  // Validation functions
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateMobile = (mobile) => {
    const mobileRegex = /^[0-9]{10}$/;
    return mobileRegex.test(mobile);
  };

  const validateLoginForm = () => {
    const errors = {};
    
    if (!loginData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!validateEmail(loginData.email)) {
      errors.email = 'Please enter a valid email address';
    }
    
    if (!loginData.password.trim()) {
      errors.password = 'Password is required';
    } else if (loginData.password.length < 5) {
      errors.password = 'Password must be at least 5 characters';
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validateRegisterForm = () => {
    const errors = {};
    
    if (!registerData.name.trim()) {
      errors.name = 'Full name is required';
    } else if (registerData.name.trim().length < 2) {
      errors.name = 'Name must be at least 2 characters';
    }
    
    if (!registerData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!validateEmail(registerData.email)) {
      errors.email = 'Please enter a valid email address';
    }
    
    if (!registerData.mobile.trim()) {
      errors.mobile = 'Mobile number is required';
    } else if (!validateMobile(registerData.mobile)) {
      errors.mobile = 'Please enter a valid 10-digit mobile number';
    }
    
    if (!registerData.password.trim()) {
      errors.password = 'Password is required';
    } else if (registerData.password.length < 5) {
      errors.password = 'Password must be at least 5 characters';
    }
    
    if (!registerData.address.trim()) {
      errors.address = 'Address is required';
    } else if (registerData.address.trim().length < 5) {
      errors.address = 'Please enter a complete address';
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setValidationErrors({});
    
    if (!validateLoginForm()) {
      return;
    }

    try {
      const result = await dispatch(login({
        email: loginData.email.trim(),
        password: loginData.password
      }));
      
      if (result.success) {
        console.log('Login successful');
        // Reset form
        setLoginData({ email: '', password: '' });
      }
    } catch (err) {
      console.error('Login error:', err);
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setValidationErrors({});
    
    if (!validateRegisterForm()) {
      return;
    }

    try {
      const result = await dispatch(register({
        name: registerData.name.trim(),
        email: registerData.email.trim(),
        mobile: registerData.mobile.trim(),
        password: registerData.password,
        address: registerData.address.trim()
      }));
      
      if (result.success) {
        console.log('Registration result:', result);
        
        // Reset form
        setRegisterData({ 
          name: '', 
          email: '', 
          mobile: '', 
          password: '', 
          address: '' 
        });
        
        // If auto-login didn't happen, switch to login form
        if (result.requiresLogin) {
          setTimeout(() => {
            setIsLogin(true);
          }, 3000);
        }
      }
    } catch (err) {
      console.error('Registration error:', err);
    }
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setValidationErrors({});
    setLoginData({ email: '', password: '' });
    setRegisterData({ name: '', email: '', mobile: '', password: '', address: '' });
    dispatch(clearRegistrationState());
  };

  // Get current error message
  const getCurrentError = () => {
    if (isLogin) {
      return error;
    } else {
      return registrationError;
    }
  };

  // Get current loading state
  const getCurrentLoading = () => {
    if (isLogin) {
      return loading;
    } else {
      return registrationLoading;
    }
  };

  return (
    <div className="min-h-screen w-full relative overflow-hidden">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        {/* Animated Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{animationDelay: '2s'}}></div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
        
        {/* Floating Particles */}
        <div className="absolute top-20 left-20 w-2 h-2 bg-cyan-400 rounded-full animate-ping"></div>
        <div className="absolute top-40 right-32 w-1 h-1 bg-purple-400 rounded-full animate-ping" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-32 left-48 w-3 h-3 bg-pink-400 rounded-full animate-ping" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-20 right-20 w-2 h-2 bg-blue-400 rounded-full animate-ping" style={{animationDelay: '3s'}}></div>
      </div>

      <div className="min-h-screen w-full flex flex-col md:flex-row relative z-10">
        {/* Left side - Auth Form */}
        <div className="w-full md:w-1/2 flex items-center justify-center px-6 py-8 backdrop-blur-sm">
          <div className="w-full max-w-md p-8 space-y-8">
            {/* Logo Section */}
            <div className="text-center space-y-4">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 shadow-2xl shadow-blue-500/25 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2L2 7V10C2 16 6 20.9 12 22C18 20.9 22 16 22 10V7L12 2M12 4.3L20 8.2V10C20 15.2 16.9 19.4 12 20.7C7.1 19.4 4 15.2 4 10V8.2L12 4.3M15.5 12L14 13.5L10.5 10L9 11.5L14 16.5L20 10.5L18.5 9L15.5 12Z"/>
                  </svg>
                </div>
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-cyan-200 to-blue-300 bg-clip-text text-transparent">Smart Medihub</h1>
              <p className="text-slate-300 text-lg font-light">
                {isLogin ? 'Step into the future of healthcare' : 'Join the healthcare revolution'}
              </p>
            </div>
            
            {/* Form Toggle */}
            <div className="flex bg-white/5 backdrop-blur-sm rounded-2xl p-1 border border-white/10">
              <button
                onClick={() => setIsLogin(true)}
                className={`flex-1 py-3 px-4 rounded-xl text-sm font-semibold transition-all duration-300 ${
                  isLogin
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Sign In
              </button>
              <button
                onClick={() => setIsLogin(false)}
                className={`flex-1 py-3 px-4 rounded-xl text-sm font-semibold transition-all duration-300 ${
                  !isLogin
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Register
              </button>
            </div>
            
            {/* Success Message */}
            {registrationSuccess && registrationMessage && (
              <div className="p-4 bg-green-500/10 backdrop-blur-sm border border-green-500/20 rounded-2xl shadow-lg">
                <div className="flex items-center text-green-300">
                  <svg className="w-5 h-5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm font-medium">{registrationMessage}</span>
                </div>
              </div>
            )}
            
            {/* Error Message */}
            {getCurrentError() && (
              <div className="p-4 bg-red-500/10 backdrop-blur-sm border border-red-500/20 rounded-2xl shadow-lg">
                <div className="flex items-center text-red-300">
                  <svg className="w-5 h-5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path>
                  </svg>
                  <span className="text-sm font-medium">{getCurrentError()}</span>
                </div>
              </div>
            )}

            {/* Login Form */}
            {isLogin && (
              <div className="space-y-6" style={{animation: 'fadeIn 0.5s ease-in-out'}}>
                {/* Email Field */}
                <div className="space-y-2">
                  <label htmlFor="login-email" className="block text-sm font-semibold text-slate-200">
                    Email Address
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
                      <svg className="h-5 w-5 text-slate-400 group-focus-within:text-cyan-400 transition-colors duration-300" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                    </div>
                    <input
                      id="login-email"
                      name="login-email"
                      type="email"
                      required
                      value={loginData.email}
                      onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                      className={`block w-full pl-12 pr-4 py-4 bg-white/5 backdrop-blur-sm border rounded-2xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 transition-all duration-300 hover:bg-white/10 ${
                        validationErrors.email 
                          ? 'border-red-500/50 focus:ring-red-400/50 focus:border-red-400/50' 
                          : 'border-white/10 focus:ring-cyan-400/50 focus:border-cyan-400/50'
                      }`}
                      placeholder="Enter your email"
                    />
                    {validationErrors.email && (
                      <p className="mt-1 text-sm text-red-400">{validationErrors.email}</p>
                    )}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-400/0 via-blue-400/0 to-purple-400/0 group-focus-within:from-cyan-400/10 group-focus-within:via-blue-400/10 group-focus-within:to-purple-400/10 transition-all duration-300 pointer-events-none"></div>
                  </div>
                </div>
                
                {/* Password Field */}
                <div className="space-y-2">
                  <label htmlFor="login-password" className="block text-sm font-semibold text-slate-200">
                    Password
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
                      <svg className="h-5 w-5 text-slate-400 group-focus-within:text-cyan-400 transition-colors duration-300" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <input
                      id="login-password"
                      name="login-password"
                      type={showPassword ? "text" : "password"}
                      required
                      value={loginData.password}
                      onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                      className={`block w-full pl-12 pr-12 py-4 bg-white/5 backdrop-blur-sm border rounded-2xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 transition-all duration-300 hover:bg-white/10 ${
                        validationErrors.password 
                          ? 'border-red-500/50 focus:ring-red-400/50 focus:border-red-400/50' 
                          : 'border-white/10 focus:ring-cyan-400/50 focus:border-cyan-400/50'
                      }`}
                      placeholder="Enter your password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-4 flex items-center z-10"
                    >
                      <svg className="h-5 w-5 text-slate-400 hover:text-cyan-400 transition-colors" fill="currentColor" viewBox="0 0 20 20">
                        {showPassword ? (
                          <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" />
                        ) : (
                          <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                        )}
                        <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                      </svg>
                    </button>
                    {validationErrors.password && (
                      <p className="mt-1 text-sm text-red-400">{validationErrors.password}</p>
                    )}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-400/0 via-blue-400/0 to-purple-400/0 group-focus-within:from-cyan-400/10 group-focus-within:via-blue-400/10 group-focus-within:to-purple-400/10 transition-all duration-300 pointer-events-none"></div>
                  </div>
                </div>

                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center group">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 text-cyan-400 bg-white/10 border-white/20 rounded focus:ring-cyan-400/50 focus:ring-2"
                    />
                    <label htmlFor="remember-me" className="ml-3 block text-sm text-slate-300 group-hover:text-white transition-colors cursor-pointer">
                      Remember me
                    </label>
                  </div>

                  <div className="text-sm">
                    <button type="button" className="font-medium text-cyan-400 hover:text-cyan-300 transition-colors">
                      Forgot password?
                    </button>
                  </div>
                </div>
                
                {/* Submit Button */}
                <div>
                  <button
                    onClick={handleLoginSubmit}
                    disabled={getCurrentLoading()}
                    className={`group relative w-full flex justify-center py-4 px-6 border border-transparent rounded-2xl text-base font-semibold text-white bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 hover:from-cyan-600 hover:via-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 transition-all duration-300 shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/40 hover:-translate-y-0.5 ${
                      getCurrentLoading() ? 'opacity-70 cursor-not-allowed hover:transform-none' : ''
                    }`}
                  >
                    <div className="flex items-center">
                      {getCurrentLoading() && (
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                        </svg>
                      )}
                      {getCurrentLoading() ? 'Signing in...' : 'Sign in'}
                    </div>
                    <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 bg-gradient-to-r from-white/10 to-white/0 transition-opacity duration-300"></div>
                  </button>
                </div>

                {/* Sign Up Link */}
                <div className="text-center">
                  <p className="text-sm text-slate-400">
                    Don't have an account?{' '}
                    <button onClick={toggleForm} className="font-semibold text-cyan-400 hover:text-cyan-300 transition-colors">
                      Register here
                    </button>
                  </p>
                </div>
              </div>
            )}

            {/* Register Form */}
            {!isLogin && (
              <div className="space-y-6" style={{animation: 'fadeIn 0.5s ease-in-out'}}>
                {/* Name Field */}
                <div className="space-y-2">
                  <label htmlFor="register-name" className="block text-sm font-semibold text-slate-200">
                    Full Name
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
                      <svg className="h-5 w-5 text-slate-400 group-focus-within:text-cyan-400 transition-colors duration-300" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <input
                      id="register-name"
                      name="register-name"
                      type="text"
                      required
                      value={registerData.name}
                      onChange={(e) => setRegisterData({...registerData, name: e.target.value})}
                      className={`block w-full pl-12 pr-4 py-4 bg-white/5 backdrop-blur-sm border rounded-2xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 transition-all duration-300 hover:bg-white/10 ${
                        validationErrors.name 
                          ? 'border-red-500/50 focus:ring-red-400/50 focus:border-red-400/50' 
                          : 'border-white/10 focus:ring-cyan-400/50 focus:border-cyan-400/50'
                      }`}
                      placeholder="Enter your full name"
                    />
                    {validationErrors.name && (
                      <p className="mt-1 text-sm text-red-400">{validationErrors.name}</p>
                    )}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-400/0 via-blue-400/0 to-purple-400/0 group-focus-within:from-cyan-400/10 group-focus-within:via-blue-400/10 group-focus-within:to-purple-400/10 transition-all duration-300 pointer-events-none"></div>
                  </div>
                </div>

                {/* Email Field */}
                <div className="space-y-2">
                  <label htmlFor="register-email" className="block text-sm font-semibold text-slate-200">
                    Email Address
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
                      <svg className="h-5 w-5 text-slate-400 group-focus-within:text-cyan-400 transition-colors duration-300" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                    </div>
                    <input
                      id="register-email"
                      name="register-email"
                      type="email"
                      required
                      value={registerData.email}
                      onChange={(e) => setRegisterData({...registerData, email: e.target.value})}
                      className={`block w-full pl-12 pr-4 py-4 bg-white/5 backdrop-blur-sm border rounded-2xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 transition-all duration-300 hover:bg-white/10 ${
                        validationErrors.email 
                          ? 'border-red-500/50 focus:ring-red-400/50 focus:border-red-400/50' 
                          : 'border-white/10 focus:ring-cyan-400/50 focus:border-cyan-400/50'
                      }`}
                      placeholder="Enter your email"
                    />
                    {validationErrors.email && (
                      <p className="mt-1 text-sm text-red-400">{validationErrors.email}</p>
                    )}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-400/0 via-blue-400/0 to-purple-400/0 group-focus-within:from-cyan-400/10 group-focus-within:via-blue-400/10 group-focus-within:to-purple-400/10 transition-all duration-300 pointer-events-none"></div>
                  </div>
                </div>

                {/* Mobile Field */}
                <div className="space-y-2">
                  <label htmlFor="register-mobile" className="block text-sm font-semibold text-slate-200">
                    Mobile Number
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
                      <svg className="h-5 w-5 text-slate-400 group-focus-within:text-cyan-400 transition-colors duration-300" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                      </svg>
                    </div>
                    <input
                      id="register-mobile"
                      name="register-mobile"
                      type="tel"
                      required
                      value={registerData.mobile}
                      onChange={(e) => setRegisterData({...registerData, mobile: e.target.value.replace(/\D/g, '')})}
                      className={`block w-full pl-12 pr-4 py-4 bg-white/5 backdrop-blur-sm border rounded-2xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 transition-all duration-300 hover:bg-white/10 ${
                        validationErrors.mobile 
                          ? 'border-red-500/50 focus:ring-red-400/50 focus:border-red-400/50' 
                          : 'border-white/10 focus:ring-cyan-400/50 focus:border-cyan-400/50'
                      }`}
                      placeholder="Enter your mobile number"
                      maxLength="10"
                    />
                    {validationErrors.mobile && (
                      <p className="mt-1 text-sm text-red-400">{validationErrors.mobile}</p>
                    )}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-400/0 via-blue-400/0 to-purple-400/0 group-focus-within:from-cyan-400/10 group-focus-within:via-blue-400/10 group-focus-within:to-purple-400/10 transition-all duration-300 pointer-events-none"></div>
                  </div>
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                  <label htmlFor="register-password" className="block text-sm font-semibold text-slate-200">
                    Password
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
                      <svg className="h-5 w-5 text-slate-400 group-focus-within:text-cyan-400 transition-colors duration-300" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <input
                      id="register-password"
                      name="register-password"
                      type={showPassword ? "text" : "password"}
                      required
                      value={registerData.password}
                      onChange={(e) => setRegisterData({...registerData, password: e.target.value})}
                      className={`block w-full pl-12 pr-12 py-4 bg-white/5 backdrop-blur-sm border rounded-2xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 transition-all duration-300 hover:bg-white/10 ${
                        validationErrors.password 
                          ? 'border-red-500/50 focus:ring-red-400/50 focus:border-red-400/50' 
                          : 'border-white/10 focus:ring-cyan-400/50 focus:border-cyan-400/50'
                      }`}
                      placeholder="Create a password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-4 flex items-center z-10"
                    >
                      <svg className="h-5 w-5 text-slate-400 hover:text-cyan-400 transition-colors" fill="currentColor" viewBox="0 0 20 20">
                        {showPassword ? (
                          <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" />
                        ) : (
                          <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                        )}
                        <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                      </svg>
                    </button>
                    {validationErrors.password && (
                      <p className="mt-1 text-sm text-red-400">{validationErrors.password}</p>
                    )}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-400/0 via-blue-400/0 to-purple-400/0 group-focus-within:from-cyan-400/10 group-focus-within:via-blue-400/10 group-focus-within:to-purple-400/10 transition-all duration-300 pointer-events-none"></div>
                  </div>
                </div>

                {/* Address Field */}
                <div className="space-y-2">
                  <label htmlFor="register-address" className="block text-sm font-semibold text-slate-200">
                    Address
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
                      <svg className="h-5 w-5 text-slate-400 group-focus-within:text-cyan-400 transition-colors duration-300" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <input
                      id="register-address"
                      name="register-address"
                      type="text"
                      required
                      value={registerData.address}
                      onChange={(e) => setRegisterData({...registerData, address: e.target.value})}
                      className={`block w-full pl-12 pr-4 py-4 bg-white/5 backdrop-blur-sm border rounded-2xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 transition-all duration-300 hover:bg-white/10 ${
                        validationErrors.address 
                          ? 'border-red-500/50 focus:ring-red-400/50 focus:border-red-400/50' 
                          : 'border-white/10 focus:ring-cyan-400/50 focus:border-cyan-400/50'
                      }`}
                      placeholder="Enter your address"
                    />
                    {validationErrors.address && (
                      <p className="mt-1 text-sm text-red-400">{validationErrors.address}</p>
                    )}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-400/0 via-blue-400/0 to-purple-400/0 group-focus-within:from-cyan-400/10 group-focus-within:via-blue-400/10 group-focus-within:to-purple-400/10 transition-all duration-300 pointer-events-none"></div>
                  </div>
                </div>
                
                {/* Submit Button */}
                <div>
                  <button
                    onClick={handleRegisterSubmit}
                    disabled={getCurrentLoading()}
                    className={`group relative w-full flex justify-center py-4 px-6 border border-transparent rounded-2xl text-base font-semibold text-white bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 hover:from-cyan-600 hover:via-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 transition-all duration-300 shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/40 hover:-translate-y-0.5 ${
                      getCurrentLoading() ? 'opacity-70 cursor-not-allowed hover:transform-none' : ''
                    }`}
                  >
                    <div className="flex items-center">
                      {getCurrentLoading() && (
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                        </svg>
                      )}
                      {getCurrentLoading() ? 'Creating Account...' : 'Create Account'}
                    </div>
                    <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 bg-gradient-to-r from-white/10 to-white/0 transition-opacity duration-300"></div>
                  </button>
                </div>

                {/* Sign In Link */}
                <div className="text-center">
                  <p className="text-sm text-slate-400">
                    Already have an account?{' '}
                    <button onClick={toggleForm} className="font-semibold text-cyan-400 hover:text-cyan-300 transition-colors">
                      Sign in here
                    </button>
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right side - Welcome Content */}
        <div className="w-full md:w-1/2 flex items-center justify-center px-6 py-8">
          <div className="w-full max-w-lg text-center space-y-8">
            <div className="space-y-6">
              <h2 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                Welcome to Smart Medihub
              </h2>
              <p className="text-xl text-slate-300 font-light leading-relaxed">
                {isLogin 
                  ? "Your gateway to intelligent healthcare solutions. Access your personalized medical dashboard and continue your health journey."
                  : "Join thousands of users who trust Smart Medihub for their healthcare needs. Get started today and experience the future of medical care."
                }
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8">
              <div className="p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-cyan-400/30 transition-all duration-300">
                <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Secure</h3>
                <p className="text-slate-400 text-sm">Bank-level encryption for your health data</p>
              </div>
              
              <div className="p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-cyan-400/30 transition-all duration-300">
                <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd"/>
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Fast</h3>
                <p className="text-slate-400 text-sm">Instant access to medical records</p>
              </div>
              
              <div className="p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-cyan-400/30 transition-all duration-300">
                <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-br from-green-400 to-cyan-500 flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd"/>
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Easy</h3>
                <p className="text-slate-400 text-sm">Simple and intuitive interface</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForms;