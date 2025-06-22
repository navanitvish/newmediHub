import React, { useState } from 'react';
import useAuth from '../../hooks/useAuth';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, loading } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password) {
      setError('Email and password are required');
      return;
    }

    try {
      const result = await login({ email, password });
      // Don't set error when login is successful
      // The redirection should be handled by the useAuth hook or its context
      if (result) {
        setError('');
        
      } else {
        setError('Invalid email or password');
      }
    } catch (err) {
      // Only set error if the login actually failed
      setError(err?.message || 'Invalid email or password');
    }
  };

  return (
    <div className="min-h-screen w-full relative overflow-hidden">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        {/* Animated Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
        
        {/* Floating Particles */}
        <div className="absolute top-20 left-20 w-2 h-2 bg-cyan-400 rounded-full animate-ping"></div>
        <div className="absolute top-40 right-32 w-1 h-1 bg-purple-400 rounded-full animate-ping animation-delay-1000"></div>
        <div className="absolute bottom-32 left-48 w-3 h-3 bg-pink-400 rounded-full animate-ping animation-delay-2000"></div>
        <div className="absolute bottom-20 right-20 w-2 h-2 bg-blue-400 rounded-full animate-ping animation-delay-3000"></div>
      </div>

      <div className="min-h-screen w-full flex flex-col md:flex-row relative z-10">
        {/* Left side - Login Form */}
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
              <p className="text-slate-300 text-lg font-light">Step into the future of healthcare</p>
            </div>
            
            {/* Error Message */}
            {error && (
              <div className="p-4 bg-red-500/10 backdrop-blur-sm border border-red-500/20 rounded-2xl shadow-lg">
                <div className="flex items-center text-red-300">
                  <svg className="w-5 h-5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path>
                  </svg>
                  <span className="text-sm font-medium">{error}</span>
                </div>
              </div>
            )}
            
            {/* Form */}
            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Email Field */}
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-semibold text-slate-200">
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
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full pl-12 pr-4 py-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400/50 transition-all duration-300 hover:bg-white/10"
                    placeholder="Enter your email"
                  />
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-400/0 via-blue-400/0 to-purple-400/0 group-focus-within:from-cyan-400/10 group-focus-within:via-blue-400/10 group-focus-within:to-purple-400/10 transition-all duration-300 pointer-events-none"></div>
                </div>
              </div>
              
              {/* Password Field */}
              <div className="space-y-2">
                <label htmlFor="password" className="block text-sm font-semibold text-slate-200">
                  Password
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
                    <svg className="h-5 w-5 text-slate-400 group-focus-within:text-cyan-400 transition-colors duration-300" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full pl-12 pr-4 py-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400/50 transition-all duration-300 hover:bg-white/10"
                    placeholder="Enter your password"
                  />
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
                  <a href="#" className="font-medium text-cyan-400 hover:text-cyan-300 transition-colors">
                    Forgot password?
                  </a>
                </div>
              </div>
              
              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className={`group relative w-full flex justify-center py-4 px-6 border border-transparent rounded-2xl text-base font-semibold text-white bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 hover:from-cyan-600 hover:via-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 transition-all duration-300 shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/40 hover:-translate-y-0.5 ${
                    loading ? 'opacity-70 cursor-not-allowed hover:transform-none' : ''
                  }`}
                >
                  <div className="flex items-center">
                    {loading && (
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                      </svg>
                    )}
                    {loading ? 'Signing in...' : 'Sign in'}
                  </div>
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 bg-gradient-to-r from-white/10 to-white/0 transition-opacity duration-300"></div>
                </button>
              </div>

              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-600"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-slate-900 text-slate-400">Or continue with</span>
                </div>
              </div>

              {/* Social Login */}
              {/* <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  className="flex items-center justify-center px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl hover:bg-white/10 transition-all duration-300 group"
                >
                  <svg className="w-5 h-5 text-slate-300 group-hover:text-white transition-colors mr-2" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  <span className="text-slate-300 group-hover:text-white text-sm font-medium">Google</span>
                </button>
                <button
                  type="button"
                  className="flex items-center justify-center px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl hover:bg-white/10 transition-all duration-300 group"
                >
                  <svg className="w-5 h-5 text-slate-300 group-hover:text-white transition-colors mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z"/>
                  </svg>
                  <span className="text-slate-300 group-hover:text-white text-sm font-medium">Facebook</span>
                </button>
              </div> */}

              {/* Sign Up Link */}
              <div className="text-center">
                <p className="text-sm text-slate-400">
                  Don't have an account?{' '}
                  <a href="#" className="font-semibold text-cyan-400 hover:text-cyan-300 transition-colors">
                    Register here
                  </a>
                </p>
              </div>
            </form>
          </div>
        </div>
        
        {/* Right side - Futuristic Illustration */}
        <div className="hidden md:flex w-full md:w-1/2 items-center justify-center relative">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-blue-500/10 to-purple-500/10 backdrop-blur-3xl"></div>
          <div className="relative p-8 w-full max-w-lg">
            {/* 3D Medical Icon */}
            <div className="relative">
              <svg className="w-full h-auto" viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.8" />
                    <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.8" />
                  </linearGradient>
                  <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#f0f9ff" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#ede9fe" stopOpacity="0.5" />
                  </linearGradient>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                    <feMerge> 
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>
                
                {/* Background Glow */}
                <circle cx="250" cy="250" r="220" fill="url(#grad2)" opacity="0.3"/>
                
                {/* Main Medical Cross */}
                <g filter="url(#glow)">
                  <circle cx="250" cy="250" r="150" fill="url(#grad1)" opacity="0.8"/>
                  <rect x="220" y="180" width="60" height="140" rx="10" fill="#ffffff" opacity="0.9"/>
                  <rect x="180" y="220" width="140" height="60" rx="10" fill="#ffffff" opacity="0.9"/>
                </g>
                
                {/* Floating Elements */}
                <g opacity="0.6">
                  <circle cx="150" cy="150" r="8" fill="#06b6d4">
                    <animate attributeName="cy" values="150;140;150" dur="3s" repeatCount="indefinite"/>
                  </circle>
                  <circle cx="350" cy="180" r="6" fill="#3b82f6">
                    <animate attributeName="cy" values="180;170;180" dur="2.5s" repeatCount="indefinite"/>
                  </circle>
                  <circle cx="380" cy="320" r="10" fill="#8b5cf6">
                    <animate attributeName="cy" values="320;310;320" dur="3.5s" repeatCount="indefinite"/>
                  </circle>
                  <circle cx="120" cy="350" r="7" fill="#06b6d4">
                    <animate attributeName="cy" values="350;340;350" dur="2.8s" repeatCount="indefinite"/>
                  </circle>
                </g>
                
                {/* Orbiting Rings */}
                <g opacity="0.4">
                  <circle cx="250" cy="250" r="200" fill="none" stroke="#06b6d4" strokeWidth="2" strokeDasharray="10,5">
                    <animateTransform attributeName="transform" type="rotate" values="0 250 250;360 250 250" dur="20s" repeatCount="indefinite"/>
                  </circle>
                  <circle cx="250" cy="250" r="180" fill="none" stroke="#8b5cf6" strokeWidth="1" strokeDasharray="5,10">
                    <animateTransform attributeName="transform" type="rotate" values="360 250 250;0 250 250" dur="15s" repeatCount="indefinite"/>
                  </circle>
                </g>
                
                {/* Pulse Effect */}
                <circle cx="250" cy="250" r="150" fill="none" stroke="#06b6d4" strokeWidth="2" opacity="0.5">
                  <animate attributeName="r" values="150;170;150" dur="2s" repeatCount="indefinite"/>
                  <animate attributeName="opacity" values="0.5;0;0.5" dur="2s" repeatCount="indefinite"/>
                </circle>
              </svg>
            </div>
            
            {/* Floating Text */}
            <div className="absolute top-1/4 left-8 bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-white text-sm font-medium">AI Diagnosis</span>
              </div>
            </div>
            
            <div className="absolute bottom-1/4 right-8 bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                <span className="text-white text-sm font-medium">Real-time Monitoring</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;