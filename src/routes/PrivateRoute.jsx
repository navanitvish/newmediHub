// src/routes/PrivateRoute.jsx
import React, { useEffect } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserProfile } from '../redux/slices/authSlice';

const PrivateRoute = () => {
  const { isAuthenticated, loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const location = useLocation();
  
  useEffect(() => {
    // Check if token exists but user is not loaded yet
    const token = localStorage.getItem('token');
    if (token && !isAuthenticated && !loading) {
      dispatch(fetchUserProfile());
    }
  }, [isAuthenticated, loading, dispatch]);
  
  // Show loading state if we're checking authentication
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  
  // If authenticated, render the child routes
  return <Outlet />;
};

export default PrivateRoute;