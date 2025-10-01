import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, register } from '../../redux/auth/authActions';
import { clearRegistrationState } from '../../redux/auth/authSlice';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loginMethod, setLoginMethod] = useState('email');
  
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  const [mobileLoginData, setMobileLoginData] = useState({
    mobile: '',
    otp: ''
  });
  const [sessionId, setSessionId] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);
  const [otpError, setOtpError] = useState('');
  const [otpSuccess, setOtpSuccess] = useState('');
  const [otpTimer, setOtpTimer] = useState(0);

  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    mobile: '',
    password: '',
    address: ''
  });

  const [validationErrors, setValidationErrors] = useState({});

  useEffect(() => {
    let interval;
    if (otpTimer > 0) {
      interval = setInterval(() => {
        setOtpTimer(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [otpTimer]);

  useEffect(() => {
    if (registrationSuccess || registrationError) {
      const timer = setTimeout(() => {
        dispatch(clearRegistrationState());
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [registrationSuccess, registrationError, dispatch]);

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

  const validateMobileLoginForm = () => {
    const errors = {};
    
    if (!mobileLoginData.mobile.trim()) {
      errors.mobile = 'Mobile number is required';
    } else if (!validateMobile(mobileLoginData.mobile)) {
      errors.mobile = 'Please enter a valid 10-digit mobile number';
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validateOtpForm = () => {
    const errors = {};
    
    if (!mobileLoginData.otp.trim()) {
      errors.otp = 'OTP is required';
    } else if (mobileLoginData.otp.length !== 6) {
      errors.otp = 'Please enter a valid 6-digit OTP';
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

  const handleRequestOtp = async (e) => {
    e.preventDefault();
    setValidationErrors({});
    setOtpError('');
    setOtpSuccess('');
    
    if (!validateMobileLoginForm()) {
      return;
    }

    setOtpLoading(true);
    
    try {
      const response = await axios.post(
        'https://medisawabackend.onrender.com/api/v1/users/request/otp',
        { mobile: mobileLoginData.mobile }
      );
      
      if (response.data.success && response.data.result) {
        // Store the sessionId from the response
        const sessionIdFromResponse = response.data.result.Details;
        setSessionId(sessionIdFromResponse);
        
        setOtpSuccess('OTP sent successfully to your mobile number!');
        setOtpSent(true);
        setOtpTimer(60);
      } else {
        setOtpError(response.data.message || 'Failed to send OTP');
      }
    } catch (err) {
      setOtpError(err.response?.data?.message || 'Failed to send OTP. Please try again.');
    } finally {
      setOtpLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setValidationErrors({});
    setOtpError('');
    
    if (!validateOtpForm()) {
      return;
    }

    setOtpLoading(true);
    
    try {
      const response = await axios.post(
        'https://medisawabackend.onrender.com/api/v1/users/verify/otp',
        { 
          sessionId: sessionId,
          otp: mobileLoginData.otp,
          mobile: mobileLoginData.mobile,
          fcmToken: "jwjcwejvr" // You can make this dynamic or get from device
        }
      );
      
      if (response.data.success) {
        setOtpSuccess('Login successful!');
        console.log('OTP verification successful:', response.data);
        navigate('/'); // Redirect to home or dashboard
        
        // Store token if provided
        if (response.data.token) {
          // Note: localStorage won't work in Claude artifacts
          // In production, this would be: localStorage.setItem('token', response.data.token);
          console.log('Token received:', response.data.token);
        }
        
        // Update Redux state with user data
        dispatch({
          type: 'auth/loginSuccess',
          payload: {
            user: response.data.user || response.data.result,
            token: response.data.token
          }
        });
        
        setMobileLoginData({ mobile: '', otp: '' });
        setOtpSent(false);
        setSessionId('');
      } else {
        setOtpError(response.data.message || 'Invalid OTP');
      }
    } catch (err) {
      setOtpError(err.response?.data?.message || 'Invalid OTP. Please try again.');
      console.error('OTP verification error:', err);
    } finally {
      setOtpLoading(false);
    }
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
        setLoginData({ email: '', password: '' });
         navigate('/');
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
         navigate('/'); // Redirect to home or login
        
        setRegisterData({ 
          name: '', 
          email: '', 
          mobile: '', 
          password: '', 
          address: '' 
        });
        
        if (result.requiresLogin) {
          setTimeout(() => {
            setIsLogin(true);
            setLoginMethod('email');
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
    setMobileLoginData({ mobile: '', otp: '' });
    setRegisterData({ name: '', email: '', mobile: '', password: '', address: '' });
    setOtpSent(false);
    setOtpError('');
    setOtpSuccess('');
    setLoginMethod('email');
    setSessionId('');
    dispatch(clearRegistrationState());
  };

  const switchLoginMethod = (method) => {
    setLoginMethod(method);
    setValidationErrors({});
    setLoginData({ email: '', password: '' });
    setMobileLoginData({ mobile: '', otp: '' });
    setOtpSent(false);
    setOtpError('');
    setOtpSuccess('');
    setSessionId('');
  };

  const handleResendOtp = () => {
    if (otpTimer === 0) {
      handleRequestOtp({ preventDefault: () => {} });
    }
  };

  const getCurrentError = () => {
    if (isLogin) {
      return loginMethod === 'mobile' ? otpError : error;
    } else {
      return registrationError;
    }
  };

  const getCurrentLoading = () => {
    if (isLogin) {
      return loginMethod === 'mobile' ? otpLoading : loading;
    } else {
      return registrationLoading;
    }
  };

  return (
    <div className="min-h-screen w-full relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      </div>

      <div className="min-h-screen w-full flex flex-col md:flex-row relative z-10">
        <div className="w-full md:w-1/2 flex items-center justify-center px-6 py-8 backdrop-blur-sm">
          <div className="w-full max-w-md p-8 space-y-8">
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

            {isLogin && (
              <div className="flex bg-white/5 backdrop-blur-sm rounded-2xl p-1 border border-white/10">
                <button
                  onClick={() => switchLoginMethod('email')}
                  className={`flex-1 py-2 px-3 rounded-xl text-xs font-semibold transition-all duration-300 ${
                    loginMethod === 'email'
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Email Login
                </button>
                <button
                  onClick={() => switchLoginMethod('mobile')}
                  className={`flex-1 py-2 px-3 rounded-xl text-xs font-semibold transition-all duration-300 ${
                    loginMethod === 'mobile'
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Mobile OTP
                </button>
              </div>
            )}
            
            {(registrationSuccess && registrationMessage) || (otpSuccess && loginMethod === 'mobile') ? (
              <div className="p-4 bg-green-500/10 backdrop-blur-sm border border-green-500/20 rounded-2xl shadow-lg">
                <div className="flex items-center text-green-300">
                  <svg className="w-5 h-5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm font-medium">{registrationMessage || otpSuccess}</span>
                </div>
              </div>
            ) : null}
            
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

            {isLogin && loginMethod === 'email' && (
              <div className="space-y-6">
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
                      type="email"
                      value={loginData.email}
                      onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                      className={`block w-full pl-12 pr-4 py-4 bg-white/5 backdrop-blur-sm border rounded-2xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 transition-all duration-300 ${
                        validationErrors.email 
                          ? 'border-red-500/50 focus:ring-red-400/50' 
                          : 'border-white/10 focus:ring-cyan-400/50'
                      }`}
                      placeholder="Enter your email"
                    />
                    {validationErrors.email && (
                      <p className="mt-1 text-sm text-red-400">{validationErrors.email}</p>
                    )}
                  </div>
                </div>
                
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
                      type={showPassword ? "text" : "password"}
                      value={loginData.password}
                      onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                      className={`block w-full pl-12 pr-12 py-4 bg-white/5 backdrop-blur-sm border rounded-2xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 transition-all duration-300 ${
                        validationErrors.password 
                          ? 'border-red-500/50 focus:ring-red-400/50' 
                          : 'border-white/10 focus:ring-cyan-400/50'
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
                  </div>
                </div>
                
                <button
                  onClick={handleLoginSubmit}
                  disabled={getCurrentLoading()}
                  className={`w-full py-4 px-6 rounded-2xl text-base font-semibold text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 transition-all duration-300 shadow-lg ${
                    getCurrentLoading() ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                >
                  {getCurrentLoading() ? 'Signing in...' : 'Sign in'}
                </button>

                <p className="text-center text-sm text-slate-400">
                  Don't have an account?{' '}
                  <button onClick={toggleForm} className="font-semibold text-cyan-400 hover:text-cyan-300">
                    Register here
                  </button>
                </p>
              </div>
            )}

            {isLogin && loginMethod === 'mobile' && (
              <div className="space-y-6">
                {!otpSent ? (
                  <>
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-slate-200">
                        Mobile Number
                      </label>
                      <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
                          <svg className="h-5 w-5 text-slate-400 group-focus-within:text-cyan-400 transition-colors duration-300" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                          </svg>
                        </div>
                        <input
                          type="tel"
                          value={mobileLoginData.mobile}
                          onChange={(e) => setMobileLoginData({...mobileLoginData, mobile: e.target.value.replace(/\D/g, '')})}
                          className={`block w-full pl-12 pr-4 py-4 bg-white/5 backdrop-blur-sm border rounded-2xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 transition-all duration-300 ${
                            validationErrors.mobile 
                              ? 'border-red-500/50 focus:ring-red-400/50' 
                              : 'border-white/10 focus:ring-cyan-400/50'
                          }`}
                          placeholder="Enter 10-digit mobile number"
                          maxLength="10"
                        />
                        {validationErrors.mobile && (
                          <p className="mt-1 text-sm text-red-400">{validationErrors.mobile}</p>
                        )}
                      </div>
                    </div>

                    <button
                      onClick={handleRequestOtp}
                      disabled={otpLoading}
                      className={`w-full py-4 px-6 rounded-2xl text-base font-semibold text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-lg ${
                        otpLoading ? 'opacity-70 cursor-not-allowed' : ''
                      }`}
                    >
                      {otpLoading ? 'Sending OTP...' : 'Send OTP'}
                    </button>
                  </>
                ) : (
                  <>
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-slate-200">
                        Enter OTP
                      </label>
                      <div className="relative group">
                        <input
                          type="text"
                          value={mobileLoginData.otp}
                          onChange={(e) => setMobileLoginData({...mobileLoginData, otp: e.target.value.replace(/\D/g, '')})}
                          className={`block w-full px-4 py-4 bg-white/5 backdrop-blur-sm border rounded-2xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 transition-all duration-300 ${
                            validationErrors.otp 
                              ? 'border-red-500/50 focus:ring-red-400/50' 
                              : 'border-white/10 focus:ring-cyan-400/50'
                          }`}
                          placeholder="Enter 6-digit OTP"
                          maxLength="6"
                        />
                        {validationErrors.otp && (
                          <p className="mt-1 text-sm text-red-400">{validationErrors.otp}</p>
                        )}
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <p className="text-sm text-slate-400">
                          OTP sent to {mobileLoginData.mobile}
                        </p>
                        {otpTimer > 0 ? (
                          <p className="text-sm text-cyan-400 font-semibold">
                            Resend in {otpTimer}s
                          </p>
                        ) : (
                          <button
                            onClick={handleResendOtp}
                            className="text-sm font-semibold text-cyan-400 hover:text-cyan-300"
                          >
                            Resend OTP
                          </button>
                        )}
                      </div>
                    </div>

                    <button
                      onClick={handleVerifyOtp}
                      disabled={otpLoading}
                      className={`w-full py-4 px-6 rounded-2xl text-base font-semibold text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-lg ${
                        otpLoading ? 'opacity-70 cursor-not-allowed' : ''
                      }`}
                    >
                      {otpLoading ? 'Verifying...' : 'Verify OTP'}
                    </button>

                    <button
                      onClick={() => {
                        setOtpSent(false);
                        setMobileLoginData({ mobile: '', otp: '' });
                        setOtpError('');
                        setValidationErrors({});
                        setSessionId('');
                      }}
                      className="text-sm font-medium text-slate-400 hover:text-white transition-colors"
                    >
                      ← Change Mobile Number
                    </button>
                  </>
                )}

                <p className="text-center text-sm text-slate-400">
                  Don't have an account?{' '}
                  <button onClick={toggleForm} className="font-semibold text-cyan-400 hover:text-cyan-300">
                    Register here
                  </button>
                </p>
              </div>
            )}

            {!isLogin && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-slate-200">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={registerData.name}
                    onChange={(e) => setRegisterData({...registerData, name: e.target.value})}
                    className={`block w-full px-4 py-4 bg-white/5 backdrop-blur-sm border rounded-2xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 transition-all duration-300 ${
                      validationErrors.name 
                        ? 'border-red-500/50 focus:ring-red-400/50' 
                        : 'border-white/10 focus:ring-cyan-400/50'
                    }`}
                    placeholder="Enter your full name"
                  />
                  {validationErrors.name && (
                    <p className="mt-1 text-sm text-red-400">{validationErrors.name}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-slate-200">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={registerData.email}
                    onChange={(e) => setRegisterData({...registerData, email: e.target.value})}
                    className={`block w-full px-4 py-4 bg-white/5 backdrop-blur-sm border rounded-2xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 transition-all duration-300 ${
                      validationErrors.email 
                        ? 'border-red-500/50 focus:ring-red-400/50' 
                        : 'border-white/10 focus:ring-cyan-400/50'
                    }`}
                    placeholder="Enter your email"
                  />
                  {validationErrors.email && (
                    <p className="mt-1 text-sm text-red-400">{validationErrors.email}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-slate-200">
                    Mobile Number
                  </label>
                  <input
                    type="tel"
                    value={registerData.mobile}
                    onChange={(e) => setRegisterData({...registerData, mobile: e.target.value.replace(/\D/g, '')})}
                    className={`block w-full px-4 py-4 bg-white/5 backdrop-blur-sm border rounded-2xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 transition-all duration-300 ${
                      validationErrors.mobile 
                        ? 'border-red-500/50 focus:ring-red-400/50' 
                        : 'border-white/10 focus:ring-cyan-400/50'
                    }`}
                    placeholder="Enter your mobile number"
                    maxLength="10"
                  />
                  {validationErrors.mobile && (
                    <p className="mt-1 text-sm text-red-400">{validationErrors.mobile}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-slate-200">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={registerData.password}
                      onChange={(e) => setRegisterData({...registerData, password: e.target.value})}
                      className={`block w-full px-4 py-4 pr-12 bg-white/5 backdrop-blur-sm border rounded-2xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 transition-all duration-300 ${
                        validationErrors.password 
                          ? 'border-red-500/50 focus:ring-red-400/50' 
                          : 'border-white/10 focus:ring-cyan-400/50'
                      }`}
                      placeholder="Create a password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-4 flex items-center"
                    >
                      <svg className="h-5 w-5 text-slate-400 hover:text-cyan-400 transition-colors" fill="currentColor" viewBox="0 0 20 20">
                        {showPassword ? (
                          <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" />
                        ) : (
                          <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                        )}
                      </svg>
                    </button>
                    {validationErrors.password && (
                      <p className="mt-1 text-sm text-red-400">{validationErrors.password}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-slate-200">
                    Address
                  </label>
                  <input
                    type="text"
                    value={registerData.address}
                    onChange={(e) => setRegisterData({...registerData, address: e.target.value})}
                    className={`block w-full px-4 py-4 bg-white/5 backdrop-blur-sm border rounded-2xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 transition-all duration-300 ${
                      validationErrors.address 
                        ? 'border-red-500/50 focus:ring-red-400/50' 
                        : 'border-white/10 focus:ring-cyan-400/50'
                    }`}
                    placeholder="Enter your address"
                  />
                  {validationErrors.address && (
                    <p className="mt-1 text-sm text-red-400">{validationErrors.address}</p>
                  )}
                </div>
                
                <button
                  onClick={handleRegisterSubmit}
                  disabled={getCurrentLoading()}
                  className={`w-full py-4 px-6 rounded-2xl text-base font-semibold text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 transition-all duration-300 shadow-lg ${
                    getCurrentLoading() ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                >
                  {getCurrentLoading() ? 'Creating Account...' : 'Create Account'}
                </button>

                <p className="text-center text-sm text-slate-400">
                  Already have an account?{' '}
                  <button onClick={toggleForm} className="font-semibold text-cyan-400 hover:text-cyan-300">
                    Sign in here
                  </button>
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="w-full md:w-1/2 flex items-center justify-center px-6 py-8">
          <div className="w-full max-w-lg text-center space-y-8">
            <div className="space-y-6">
              <h2 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                Welcome to Smart Medihub
              </h2>
              <p className="text-xl text-slate-300 font-light leading-relaxed">
                {isLogin 
                  ? loginMethod === 'mobile' 
                    ? "Quick and secure login with OTP. No password needed - just your mobile number!"
                    : "Your gateway to intelligent healthcare solutions. Access your personalized medical dashboard."
                  : "Join thousands of users who trust Smart Medihub for their healthcare needs."
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
                <p className="text-slate-400 text-sm">Bank-level encryption</p>
              </div>
              
              <div className="p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-cyan-400/30 transition-all duration-300">
                <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd"/>
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Fast</h3>
                <p className="text-slate-400 text-sm">Instant access</p>
              </div>
              
              <div className="p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-cyan-400/30 transition-all duration-300">
                <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-br from-green-400 to-cyan-500 flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd"/>
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Easy</h3>
                <p className="text-slate-400 text-sm">Simple interface</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForms;