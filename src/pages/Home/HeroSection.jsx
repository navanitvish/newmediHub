import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
const EnhancedHeroSection = ( ) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const backgroundControls = useAnimation();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  // Track mouse movement for parallax effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  // Animate background based on mouse position
  useEffect(() => {
    backgroundControls.start({
      backgroundPosition: `${mousePosition.x * 5}% ${mousePosition.y * 5}%`,
      transition: { type: 'tween', ease: 'linear', duration: 0.2 }
    });
  }, [mousePosition, backgroundControls]);
  
  // Particle animation for background
  const particles = Array.from({ length: 20 }).map((_, i) => (
    <motion.div
      key={i}
      className="absolute rounded-full bg-blue-400 opacity-50"
      initial={{
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        scale: Math.random() * 0.5 + 0.5,
        opacity: Math.random() * 0.3 + 0.1,
      }}
      animate={{
        x: [null, Math.random() * window.innerWidth],
        y: [null, Math.random() * window.innerHeight],
        transition: {
          duration: Math.random() * 20 + 10,
          repeat: Infinity,
          repeatType: 'reverse',
        },
      }}
      style={{
        width: `${Math.random() * 20 + 5}px`,
        height: `${Math.random() * 20 + 5}px`,
      }}
    />
  ));

  const bigCardVariants = {
    hover: {
      y: -10,
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      transition: { type: "spring", stiffness: 400, damping: 10 }
    }
  };
  
  const smallCardVariants = {
    hover: {
      y: -5,
      boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
      transition: { type: "spring", stiffness: 400, damping: 10 }
    }
  };

  return (
    <div className="relative overflow-hidden  bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {particles}
      </div>
      
      {/* Animated gradient orb */}
      <motion.div 
        className="absolute rounded-full blur-3xl opacity-30 bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-500"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.2, 0.3, 0.2],
          x: [mousePosition.x * 100, mousePosition.x * 100],
          y: [mousePosition.y * 100, mousePosition.y * 100],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse"
        }}
        style={{
          width: '60vw',
          height: '60vw',
          top: '-20vw',
          right: '-20vw',
        }}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      
        <div className="lg:grid lg:grid-cols-12 lg:gap-8 mt-20">
          <motion.div
            className="sm:text-center lg:text-left lg:col-span-7"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <span className="inline-block py-1 px-3 text-sm font-medium bg-blue-100 text-blue-800 rounded-full mb-4">
                Healthcare Made Simple
              </span>
            </motion.div>
            
            <h1 className="text-5xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
              <motion.span 
                className="block text-4xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                Your Health, Our Priority
              </motion.span>
              <motion.span 
                className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 mt-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
                Book Doctors, Consult Online & Get Lab Tests, Medicine Done Easily!
              </motion.span>
            </h1>
            
            <motion.p 
              className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              Find top doctors, schedule lab tests, and access medical reports – all in one place.
              Stay ahead of your health with hassle-free online consultations, doorstep lab tests, and secure medical record storage.
            </motion.p>
            
            <motion.div 
              className="mt-8 sm:flex sm:justify-center lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
            >
              {isAuthenticated ? (
                <motion.div 
                  className="rounded-md "
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link
                    to="/appointment"
                    className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                  >
                    Book Appointment
                  </Link>
                </motion.div>
              ) : (
                <>
                  <motion.div 
                    className="rounded-md shadow"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Link
                      to="/login"
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 md:py-4 md:text-lg md:px-10 transition-all duration-300"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                      </svg>
                      Get Started
                    </Link>
                  </motion.div>
                  <motion.div 
                    className="mt-3 sm:mt-0 sm:ml-3"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Link
                      to="/register"
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 md:py-4 md:text-lg md:px-10 transition-all duration-300"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6z" />
                      </svg>
                      Sign Up
                    </Link>
                  </motion.div>
                </>
              )}
            </motion.div>
            
            <motion.div 
              className="mt-8 inline-flex items-center space-x-2 text-sm text-gray-500"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.6 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Trusted by 10,000+ patients</span>
            </motion.div>
          </motion.div>

          <motion.div
            className="mt-12 lg:mt-0 lg:col-span-5"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="grid grid-cols-1 gap-6">
              {/* Big Card - Dr in 10 min */}
              <motion.div
                className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 shadow-md flex items-center"
                variants={bigCardVariants}
                whileHover="hover"
                animate={{
                  y: [0, -5, 0],
                  transition: { 
                    y: {
                      repeat: Infinity,
                      duration: 3,
                      ease: "easeInOut",
                      repeatType: "mirror"
                    }
                  }
                }}
              >
                <div className="h-20 w-20 bg-white rounded-full flex items-center justify-center mr-4 shadow-inner">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 text-xl">Dr in 10 min</h3>
                  <p className="text-sm text-gray-500 mt-1">Quick online consultation with specialists</p>
                </div>
              </motion.div>
              
              {/* Small Card - Nearest Lab */}
              <motion.div
                className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 shadow-sm flex items-center"
                variants={smallCardVariants}
                whileHover="hover"
                animate={{
                  y: [0, -3, 0],
                  transition: { 
                    y: {
                      repeat: Infinity,
                      duration: 2.5,
                      delay: 0.5,
                      ease: "easeInOut",
                      repeatType: "mirror"
                    }
                  }
                }}
              >
                <div className="h-16 w-16 bg-white rounded-full flex items-center justify-center mr-3 shadow-inner">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 text-lg">Nearest Lab</h3>
                  <p className="text-xs text-gray-500 mt-1">Locate nearby testing facilities</p>
                </div>
              </motion.div>
              
              {/* Big Card - Reports */}
              <motion.div
                className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-6 shadow-md flex items-center"
                variants={bigCardVariants}
                whileHover="hover"
                animate={{
                  y: [0, -5, 0],
                  transition: { 
                    y: {
                      repeat: Infinity,
                      duration: 3,
                      delay: 1,
                      ease: "easeInOut",
                      repeatType: "mirror"
                    }
                  }
                }}
              >
                <div className="h-20 w-20 bg-white rounded-full flex items-center justify-center mr-4 shadow-inner">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 text-xl">Reports</h3>
                  <p className="text-sm text-gray-500 mt-1">Access all your medical records</p>
                </div>
              </motion.div>
              
              {/* Small Card - Health Checkup */}
              <motion.div
                className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl p-4 shadow-sm flex items-center"
                variants={smallCardVariants}
                whileHover="hover"
                animate={{
                  y: [0, -3, 0],
                  transition: { 
                    y: {
                      repeat: Infinity,
                      duration: 2.5,
                      delay: 1.5,
                      ease: "easeInOut",
                      repeatType: "mirror"
                    }
                  }
                }}
              >
                <div className="h-16 w-16 bg-white rounded-full flex items-center justify-center mr-3 shadow-inner">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 4v12l-4-2-4 2V4M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 text-lg">Health Checkup</h3>
                  <p className="text-xs text-gray-500 mt-1">Comprehensive wellness packages</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedHeroSection;