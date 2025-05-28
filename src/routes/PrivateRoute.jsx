import { useEffect } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import useAuth from '../hooks/useAuth';
import { getUserProfile } from '../redux/auth/authActions';

const PrivateRoute = () => {
  // Make sure loading is destructured from useAuth as well
  const { isAuthenticated, user, loading } = useAuth();
  const dispatch = useDispatch();
  const location = useLocation();
  
  useEffect(() => {
    // Check if token exists but user is not loaded yet
    const token = localStorage.getItem('newMedihubToken');
    if (token && !isAuthenticated && !loading) {
      dispatch(getUserProfile());
    }
  }, [isAuthenticated, user, loading, dispatch]);
  
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