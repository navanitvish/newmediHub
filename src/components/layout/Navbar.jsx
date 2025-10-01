import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useSelector } from "react-redux";

import { selectLabTestTotalQuantity } from "../../redux/slices/labTestSlice";
import { selectMedicineTotalQuantity } from "../../redux/slices/medicineSlice";
import { ShoppingCart, Shield, Heart } from "lucide-react";

import logo from "../../assets/logo.png";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout, isAuthenticated } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showCartButton, setShowCartButton] = useState(false);

  const labTestQuantity = useSelector(selectLabTestTotalQuantity) || 0;
  const medicineQuantity = useSelector(selectMedicineTotalQuantity) || 0;

  // Calculate total cart quantity from all sources
  const totalCartQuantity = labTestQuantity + medicineQuantity;

  const userData = user?.result || {};

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Track current path to determine when to show cart button
  useEffect(() => {
    setShowCartButton(
      location.pathname === "/labs" || location.pathname === "/medifarma"
    );
  }, [location.pathname]);

  const handleLogout = () => {
    navigate("/login");
  };

  // Generate user initials for avatar
  const getUserInitials = () => {
    if (!userData?.name) return "M";
    const nameParts = userData?.name.split(" ");
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

  // Top delivery locations
  const deliveryLocations = [
    "New York",
    "Los Angeles",
    "Chicago",
    "Houston",
    "Phoenix",
    "Philadelphia",
  ];

  return (
    <>
      <nav
        className={`w-full top-0 z-50 transition-all duration-300 fixed ${
          scrolled ? "shadow-md" : "backdrop-blur-md"
        }`}
      >
        <div className="w-full px-4 py-2 sm:px-6 lg:px-8 bg-white border-b border-gray-100">
          <div className="flex items-center justify-between h-16">
            {/* Logo - Left Side */}
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="flex gap-2 items-center">
                <div className="relative">
                  <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full p-2 shadow-lg">
                    <div className="relative">
                      {/* <Heart
                        className="w-8 h-8 text-white"
                        fill="currentColor"
                      /> */}
                      {/* <Shield className="w-4 h-4 text-white absolute -top-1 -right-1 opacity-80" /> */}
                      <img
                        className="h-10 w-10 mt-1 aspect-auto scale-170 text-center rounded-full transition-transform duration-300 hover:scale-110"
                        src={logo}
                        alt="Logo"
                      />
                    </div>
                  </div>
                </div>

                {/* Logo Text */}
                <div className="flex flex-col">
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    MediSeve
                  </h1>
                  <p className="text-sm text-gray-500 font-medium tracking-wide">
                    Healthcare Solutions
                  </p>
                </div>
              </Link>
            </div>

            {/* Navigation Links - Centered */}
            <div className="hidden md:flex md:flex-1 md:items-center md:justify-center">
              <div className="flex items-center justify-center space-x-3 bg-gray-100 rounded-full px-3 py-1">
                <Link
                  to="/"
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    isActive("/")
                      ? "text-white bg-gradient-to-r from-blue-500 to-indigo-600 shadow-md"
                      : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
                  }`}
                >
                  Home
                </Link>
                <Link
                  to="/doctors"
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    isActive("/doctors")
                      ? "text-white bg-gradient-to-r from-blue-500 to-indigo-600 shadow-md"
                      : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
                  }`}
                >
                  Find Doctors
                </Link>
                <div className="relative flex items-center">
                  <Link
                    to="/labs"
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                      isActive("/labs")
                        ? "text-white bg-gradient-to-r from-blue-500 to-indigo-600 shadow-md"
                        : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
                    }`}
                  >
                    Lab Tests
                  </Link>
                </div>

                {/* Medifarma with dropdown */}
                <div className="relative">
                  <Link
                    to="/medifarma"
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center ${
                      isActive("/medifarma")
                        ? "text-white bg-gradient-to-r from-blue-500 to-indigo-600 shadow-md"
                        : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
                    }`}
                  >
                    MediPharma
                  </Link>
                </div>

                <Link
                  to="/healthcard"
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    isActive("/healthcard")
                      ? "text-white bg-gradient-to-r from-blue-500 to-indigo-600 shadow-md"
                      : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
                  }`}
                >
                  Smart Health Card
                </Link>
              </div>
            </div>

            {/* Right Side - Auth, Cart, etc. */}
            <div className="flex items-center space-x-2">
              {/* Cart Button */}
              {showCartButton && (
                <Link
                  to="/cart"
                  className="text-gray-700 hover:text-blue-600 relative"
                >
                  <ShoppingCart size={20} />
                  {totalCartQuantity > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {totalCartQuantity}
                    </span>
                  )}
                </Link>
              )}

              {/* Auth Buttons - Right Side */}
              <div className="flex-shrink-0 flex items-center bg-gray-100 rounded-full">
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
                        {userData?.name || "Navneet"}
                      </span>
                      <svg
                        className={`h-4 w-4 text-gray-400 transition-transform duration-200 group-hover:text-blue-600 ${
                          profileMenuOpen ? "rotate-180" : ""
                        }`}
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
                      <div className="absolute right-0 mt-3 w-64 bg-white rounded-xl shadow-lg py-2 z-10 border border-gray-100 overflow-hidden">
                        <div className="px-4 py-3 border-b border-gray-100">
                          <p className="text-sm font-semibold text-gray-900">
                            {userData?.name || "Navneet"}
                          </p>
                          <p className="text-xs text-gray-500 truncate">
                            {userData?.email || ""}
                          </p>
                        </div>
                        <Link
                          to="/profile"
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                          onClick={() => setProfileMenuOpen(false)}
                        >
                          <svg
                            className="mr-2 h-4 w-4 text-gray-500"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7-7h14a7 7 0 00-7-7z"
                            />
                          </svg>
                          Profile
                        </Link>
                        <Link
                          to="/my-appointments"
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                          onClick={() => setProfileMenuOpen(false)}
                        >
                          <svg
                            className="mr-2 h-4 w-4 text-gray-500"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                          My Appointments
                        </Link>
                        <Link
                          to="/orders"
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                          onClick={() => setProfileMenuOpen(false)}
                        >
                          <svg
                            className="mr-2 h-4 w-4 text-gray-500"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                            />
                          </svg>
                          My Orders
                        </Link>
                        <Link
                          to="/prescriptions"
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                          onClick={() => setProfileMenuOpen(false)}
                        >
                          <svg
                            className="mr-2 h-4 w-4 text-gray-500"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                            />
                          </svg>
                          My Prescriptions
                        </Link>
                        <Link
                          to="/helpcenter"
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                          onClick={() => setProfileMenuOpen(false)}
                        >
                          <svg
                            className="mr-2 h-4 w-4 text-gray-500"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          Help Center
                        </Link>
                        <Link
                          to="/privacy"
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                          onClick={() => setProfileMenuOpen(false)}
                        >
                          <svg
                            className="mr-2 h-4 w-4 text-gray-500"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                            />
                          </svg>
                          Privacy Policy
                        </Link>
                        <div className="border-t border-gray-100 my-1"></div>
                        <button
                          onClick={() => {
                            setProfileMenuOpen(false);
                            logout();
                          }}
                          className="w-full flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                        >
                          <svg
                            className="mr-2 h-4 w-4 text-red-500"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                            />
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
                      to="/login"
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
        </div>

        {/* Mobile search - only visible on mobile */}
        <div className="md:hidden px-4 py-3 bg-white border-b border-gray-100">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="w-full py-2 pl-10 pr-4 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <div className="absolute left-3 top-1/2 -translate-y-1/2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className={`md:hidden transition-all duration-300 ease-in-out ${
            mobileMenuOpen
              ? "max-h-screen opacity-100 visible"
              : "max-h-0 opacity-0 invisible overflow-hidden"
          } absolute w-full bg-white shadow-lg rounded-b-xl top-32 left-0 z-50`}
          id="mobile-menu"
        >
          <div className="px-4 pt-4 pb-3 space-y-1">
            <Link
              to="/"
              className={`block px-4 py-2 rounded-full text-base font-medium ${
                isActive("/")
                  ? "text-white bg-gradient-to-r from-blue-500 to-indigo-600"
                  : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
              } transition-colors`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/doctors"
              className={`block px-4 py-2 rounded-full text-base font-medium ${
                isActive("/doctors")
                  ? "text-white bg-gradient-to-r from-blue-500 to-indigo-600"
                  : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
              } transition-colors`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Find Doctors
            </Link>
            <Link
              to="/labs"
              className={`block px-4 py-2 rounded-full text-base font-medium ${
                isActive("/labs")
                  ? "text-white bg-gradient-to-r from-blue-500 to-indigo-600"
                  : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
              } transition-colors`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Lab Tests
            </Link>
            <Link
              to="/medifarma"
              className={`block px-4 py-2 rounded-full text-base font-medium ${
                isActive("/medifarma")
                  ? "text-white bg-gradient-to-r from-blue-500 to-indigo-600"
                  : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
              } transition-colors`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Medifarma
            </Link>

            {/* Mobile Medifarma Submenu */}
            {isActive("/medifarma") && (
              <div className="pl-6 pt-2 pb-1 space-y-1">
                <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                  Top Delivery Locations
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  {deliveryLocations.slice(0, 4).map((location, index) => (
                    <Link
                      key={index}
                      to={`/medifarma/location/${location
                        .toLowerCase()
                        .replace(" ", "-")}`}
                      className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {location}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            <Link
              to="/healthcard"
              className={`block px-4 py-2 rounded-full text-base font-medium ${
                isActive("/healthcard")
                  ? "text-white bg-gradient-to-r from-blue-500 to-indigo-600"
                  : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
              } transition-colors`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Smart Health Card
            </Link>

            {showCartButton && (
              <Link
                to="/cart"
                className="flex items-center px-4 py-2 text-base font-medium text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                <ShoppingCart size={20} className="mr-2" />
                Cart
                {totalCartQuantity > 0 && (
                  <span className="ml-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {totalCartQuantity}
                  </span>
                )}
              </Link>
            )}

            {isAuthenticated && (
              <div className="border-t border-gray-200 pt-4 mt-4">
                <div className="px-4 py-2">
                  <p className="text-sm font-semibold text-gray-900">
                    {user?.name || "User"}
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    {user?.email || ""}
                  </p>
                </div>
                <Link
                  to="/profile"
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <svg
                    className="mr-2 h-5 w-5 text-gray-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  Profile
                </Link>
                <Link
                  to="/appointments"
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <svg
                    className="mr-2 h-5 w-5 text-gray-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  My Appointments
                </Link>
                <Link
                  to="/orders"
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <svg
                    className="mr-2 h-5 w-5 text-gray-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                    />
                  </svg>
                  My Orders
                </Link>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    handleLogout();
                  }}
                  className="w-full flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                >
                  <svg
                    className="mr-2 h-5 w-5 text-red-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                  Logout
                </button>
              </div>
            )}

            {!isAuthenticated && (
              <div className="border-t border-gray-200 pt-4 mt-4 flex flex-col space-y-2 px-4">
                <Link
                  to="/login"
                  className="w-full py-2 text-center text-sm font-medium text-blue-600 border border-blue-200 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="w-full py-2 text-center text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg hover:from-blue-600 hover:to-indigo-700 shadow transition-all"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Spacer to prevent content from being hidden under the fixed navbar */}
      <div className="h-32 md:h-16"></div>
    </>
  );
};

export default Navbar;
