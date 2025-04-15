import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserProfile } from '../../redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isAuthenticated, loading, error } = useSelector((state) => state.auth);

  useEffect(() => {
    // If not authenticated, redirect to home
    if (!isAuthenticated && !loading) {
      navigate('/');
    } else if (isAuthenticated && !user) {
      // If authenticated but no user data, fetch profile
      dispatch(fetchUserProfile());
    }
  }, [isAuthenticated, user, loading, dispatch, navigate]);

  // Loading state
  if (loading) {
    return (
      <div className="container mx-auto p-6 flex justify-center items-center min-h-screen">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-4">Loading profile...</h2>
          <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto"></div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="container mx-auto p-6 min-h-screen">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
        <button 
          onClick={() => navigate('/')}
          className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Return to Home
        </button>
      </div>
    );
  }

  // Not authenticated state (should redirect, but just in case)
  if (!isAuthenticated) {
    return (
      <div className="container mx-auto p-6 min-h-screen">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-4">You must be logged in to view this page</h2>
          <button 
            onClick={() => navigate('/')}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  // Main profile content when user data is available
  return (
    <div className="container mx-auto p-6 min-h-screen">
      <div className="bg-white shadow-md rounded-lg p-6 max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-center">User Profile</h1>
        
        {user && (
          <div className="space-y-4">
            {user.avatar && (
              <div className="flex justify-center">
                <img 
                  src={user.avatar} 
                  alt="Profile" 
                  className="h-24 w-24 rounded-full object-cover border-2 border-gray-300"
                />
              </div>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-3 rounded">
                <p className="text-sm text-gray-500">Full Name</p>
                <p className="font-medium">{user.name || 'Not provided'}</p>
              </div>
              
              <div className="bg-gray-50 p-3 rounded">
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium">{user.email || 'Not provided'}</p>
              </div>
              
              {user.phone && (
                <div className="bg-gray-50 p-3 rounded">
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="font-medium">{user.phone}</p>
                </div>
              )}
              
              {user.role && (
                <div className="bg-gray-50 p-3 rounded">
                  <p className="text-sm text-gray-500">Role</p>
                  <p className="font-medium">{user.role}</p>
                </div>
              )}
              
              {user.joinedAt && (
                <div className="bg-gray-50 p-3 rounded md:col-span-2">
                  <p className="text-sm text-gray-500">Member Since</p>
                  <p className="font-medium">{new Date(user.joinedAt).toLocaleDateString()}</p>
                </div>
              )}
            </div>
            
            <div className="flex justify-center pt-4">
              <button 
                onClick={() => navigate('/')}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4"
              >
                Back to Home
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;