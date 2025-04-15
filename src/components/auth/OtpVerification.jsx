// src/components/auth/OtpVerification.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { verifyOtpThunk, clearErrors } from '../../redux/slices/authSlice';

const OtpVerification = () => {
  const [otp, setOtp] = useState(['', '', '', '']);
  const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, loading, error, email } = useSelector((state) => state.auth);
  
  useEffect(() => {
    // Focus the first input when component mounts
    inputRefs[0].current?.focus();
    
    // Redirect if already authenticated
    if (isAuthenticated) {
      navigate('/');
    }
    
    // Redirect if no email (user didn't go through login first)
    if (!email) {
      navigate('/login');
    }
  }, [isAuthenticated, email, navigate]);
  
  useEffect(() => {
    if (error) {
      // Handle error display
      dispatch(clearErrors());
    }
  }, [error, dispatch]);
  
  const handleChange = (index, value) => {
    // Only allow numbers
    if (!/^\d*$/.test(value)) return;
    
    // Update OTP state
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    
    // Auto-focus next input
    if (value && index < 3) {
      inputRefs[index + 1].current?.focus();
    }
  };
  
  const handleKeyDown = (index, e) => {
    // Move to previous input on backspace if current input is empty
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs[index - 1].current?.focus();
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const otpValue = otp.join('');
    
    if (otpValue.length === 4) {
      dispatch(verifyOtpThunk({ email, otp: otpValue }));
    }
  };
  
  const handleResendOtp = () => {
    // Implement resend OTP logic here
    console.log('Resend OTP to:', email);
  };
  
  return (
    <div className="flex h-screen">
      {/* Left side image */}
      <div className="hidden lg:flex lg:w-1/2 bg-blue-600 items-center justify-center">
        <div className="px-12">
          <img 
            src="/images/otp-illustration.svg" 
            alt="OTP Verification" 
            className="max-w-md" 
          />
          <h1 className="text-white text-4xl font-bold mt-12">Verify Your Identity</h1>
          <p className="text-blue-100 mt-4 text-xl">
            We've sent a verification code to your email
          </p>
        </div>
      </div>
      
      {/* Right side OTP form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-gray-800">OTP Verification</h1>
            <p className="text-gray-500 mt-3">
              Enter the 4-digit code sent to {email || 'your email'}
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 text-red-500 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}
            
            <div className="flex justify-center space-x-4">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={inputRefs[index]}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="w-16 h-16 text-center text-2xl font-bold border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              ))}
            </div>
            
            <button
              type="submit"
              disabled={loading || otp.join('').length !== 4}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {loading ? 'Verifying...' : 'Verify OTP'}
            </button>
            
            <div className="text-center mt-4">
              <p className="text-sm text-gray-600">
                Didn't receive the code?{' '}
                <button
                  type="button"
                  onClick={handleResendOtp}
                  className="font-medium text-blue-600 hover:text-blue-500"
                >
                  Resend
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OtpVerification;