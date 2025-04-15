import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/slices/authSlice';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showCartButton, setShowCartButton] = useState(false);

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Track current path to determine when to show cart button
  useEffect(() => {
    setShowCartButton(location.pathname === '/labs');
  }, [location.pathname]);

  const handleLogout = () => {
    dispatch(logout()).then(() => {
      navigate('/login');
    });
  };

  // Generate user initials for avatar
  const getUserInitials = () => {
    if (!user?.name) return 'U';
    const nameParts = user.name.split(' ');
    if (nameParts.length >= 2) {
      return `${nameParts[0][0]}${nameParts[1][0]}`.toUpperCase();
    }
    return nameParts[0].substring(0, 2).toUpperCase();
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const toggleProfileMenu = () => {
    setProfileMenuOpen(!profileMenuOpen);
  };

  // Check if a link is active
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className={`w-full top-0 z-50 transition-all duration-300 p-3 fixed  ${scrolled ? ' fixed' : ' backdrop-blur-md'}`}>
      <div className="max-w-7xl mx-auto px-4 py-2 sm:px-6 lg:px-8 bg-gray-100 rounded-full ">
        <div className="flex items-center justify-between h-16">
          {/* Logo - Left Side */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center">
              <img
                className="h-22 w-auto aspect-auto transition-transform duration-300 hover:scale-110"
                src="/src/assets/logo.png"
                alt="Logo"
              />
            </Link>
          </div>

          {/* Navigation Links - Centered */}
          <div className="hidden md:flex md:flex-1 md:items-center md:justify-center">
            <div className="flex items-center justify-center space-x-3 bg-gray-100 rounded-full px-3 py-1">
              <Link
                to="/"
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  isActive('/') 
                    ? 'text-white bg-gradient-to-r from-blue-500 to-indigo-600 shadow-md' 
                    : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                }`}
              >
                Home
              </Link>
              <Link
                to="/doctors"
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  isActive('/dashboard') 
                    ? 'text-white bg-gradient-to-r from-blue-500 to-indigo-600 shadow-md' 
                    : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                }`}
              >
              Find Doctors
              </Link>
              <div className="relative flex items-center">
                <Link
                  to="/labs"
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    isActive('/labs') 
                      ? 'text-white bg-gradient-to-r from-blue-500 to-indigo-600 shadow-md' 
                      : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                  }`}
                >
                  Lab Tests
                </Link>
                {showCartButton && (
                  <Link 
                    to="/cart" 
                    className="ml-2 p-2 rounded-full text-blue-600 hover:bg-blue-50 transition-colors relative"
                  >
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-5 w-5" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" 
                      />
                    </svg>
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                      3
                    </span>
                  </Link>
                )}
              </div>

              <Link
                to="/medifarma"
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  isActive('/dashboard') 
                    ? 'text-white bg-gradient-to-r from-blue-500 to-indigo-600 shadow-md' 
                    : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                }`}
              >
                Medifarma
              </Link>

              <Link
                to="/healthcard"
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  isActive('/dashboard') 
                    ? 'text-white bg-gradient-to-r from-blue-500 to-indigo-600 shadow-md' 
                    : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                }`}
              >
                Smart Health card
              </Link>

            </div>
          </div>

          {/* Auth Buttons - Right Side */}
          <div className="flex-shrink-0 flex items-center bg-gray-100 rounded-full ">
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={toggleProfileMenu}
                  className="flex items-center space-x-2 focus:outline-none group"
                >
                  <div className="h-9 w-9 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white font-medium shadow-md transition-transform group-hover:scale-105">
                    {getUserInitials()}
                  </div>
                  <span className="text-sm font-medium text-gray-700 group-hover:text-blue-600 transition-colors hidden lg:inline">
                    {user?.name || 'User'}
                  </span>
                  <svg
                    className={`h-4 w-4 text-gray-400 transition-transform duration-200 group-hover:text-blue-600 ${profileMenuOpen ? 'rotate-180' : ''}`}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                {profileMenuOpen && (
                  <div className="absolute right-0 mt-3 w-56 bg-white rounded-xl shadow-lg py-2 z-10 border border-gray-100 overflow-hidden">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-semibold text-gray-900">{user?.name || 'User'}</p>
                      <p className="text-xs text-gray-500 truncate">{user?.email || ''}</p>
                    </div>
                    <Link
                      to="/profile"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                      onClick={() => setProfileMenuOpen(false)}
                    >
                      <svg className="mr-2 h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                       Profile
                    </Link>
                    <Link
                      to="/apointmnets"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                      onClick={() => setProfileMenuOpen(false)}
                    >
                      <svg className="mr-2 h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      My Appointment
                    </Link>
                    <Link
                      to="/helpcenter"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                      onClick={() => setProfileMenuOpen(false)}
                    >
                      <svg className="mr-2 h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      Help Center
                    </Link>
                    <Link
                      to="/privicy"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                      onClick={() => setProfileMenuOpen(false)}
                    >
                      <svg className="mr-2 h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                       Privicy Policy
                    </Link>
                    <div className="border-t border-gray-100 my-1"></div>
                    <button
                      onClick={() => {
                        setProfileMenuOpen(false);
                        handleLogout();
                      }}
                      className="w-full flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <svg className="mr-2 h-4 w-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-medium text-blue-600 border border-blue-200 bg-blue-50 rounded-full hover:bg-blue-100 transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full hover:from-blue-600 hover:to-indigo-700 shadow-md hover:shadow-lg transition-all"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              type="button"
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-blue-600 hover:bg-blue-50 transition-colors focus:outline-none"
              aria-controls="mobile-menu"
              aria-expanded={mobileMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {!mobileMenuOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div 
        className={`md:hidden transition-all duration-300 ease-in-out ${
          mobileMenuOpen ? 'max-h-screen opacity-100 visible' : 'max-h-0 opacity-0 invisible overflow-hidden'
        } absolute w-full bg-white shadow-lg rounded-b-xl top-16 left-0 z-50`} 
        id="mobile-menu"
      >
        <div className="px-4 pt-4 pb-3 space-y-1">
          <Link
            to="/"
            className={`block px-4 py-2 rounded-full text-base font-medium ${
              isActive('/') 
                ? 'text-white bg-gradient-to-r from-blue-500 to-indigo-600' 
                : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
            } transition-colors`}
            onClick={() => setMobileMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/dashboard"
            className={`block px-4 py-2 rounded-full text-base font-medium ${
              isActive('/dashboard') 
                ? 'text-white bg-gradient-to-r from-blue-500 to-indigo-600' 
                : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
            } transition-colors`}
            onClick={() => setMobileMenuOpen(false)}
          >
            Dashboard
          </Link>
          <Link
            to="/profile"
            className={`block px-4 py-2 rounded-full text-base font-medium ${
              isActive('/profile') 
                ? 'text-white bg-gradient-to-r from-blue-500 to-indigo-600' 
                : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
            } transition-colors`}
            onClick={() => setMobileMenuOpen(false)}
          >
            Profile
          </Link>
        </div>
        <div className="pt-4 pb-5 border-t border-gray-200">
          {isAuthenticated ? (
            <>
              <div className="flex items-center px-5 py-3">
                <div className="h-12 w-12 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white font-medium shadow-md">
                  {getUserInitials()}
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-gray-800">{user?.name || 'User'}</div>
                  <div className="text-sm font-medium text-gray-500">{user?.email || ''}</div>
                </div>
              </div>
              <div className="mt-3 px-4 space-y-1">
                <Link
                  to="/profile"
                  className="flex items-center px-4 py-2 rounded-lg text-base font-medium text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <svg className="mr-3 h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Your Profile
                </Link>
                <Link
                  to="/settings"
                  className="flex items-center px-4 py-2 rounded-lg text-base font-medium text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <svg className="mr-3 h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Settings
                </Link>
                <div className="border-t border-gray-100 my-2"></div>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    handleLogout();
                  }}
                  className="w-full flex items-center px-4 py-2 rounded-full text-base font-medium text-red-600 hover:bg-red-50 transition-colors"
                >
                  <svg className="mr-3 h-5 w-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Logout
                </button>
              </div>
            </>
          ) : (
            <div className="mt-3 px-5 py-3 space-y-3">
              <Link
                to="/login"
                className="w-full block py-3 text-center text-sm font-medium text-blue-600 border border-blue-200 bg-blue-50 rounded-full hover:bg-blue-100 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/register"
                className="w-full block py-3 text-center text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full hover:from-blue-600 hover:to-indigo-700 shadow-md transition-all"
                onClick={() => setMobileMenuOpen(false)}
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;