// useAuth.js
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { 
  login as loginAction, 
  logoutUser, 
  initializeAuth, 
  getUserProfile 
} from '../redux/auth/authActions';

const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { 
    user, 
    isAuthenticated, 
    loading, 
    error, 
    initialized 
  } = useSelector((state) => state.auth);

  // Enhanced logging for user data
  console.log("👤 useAuth - Current user data:", {
    user: user ? {
      id: user.id,
      email: user.email,
      username: user.username,
      name: user.name,
      // Log other relevant user fields
      ...user
    } : null,
    isAuthenticated,
    initialized,
    loading
  });

  // Initialize authentication when hook is first used
  useEffect(() => {
    if (!initialized && !loading) {
      console.log('🔄 Initializing auth from useAuth hook...');
      dispatch(initializeAuth());
    }
  }, [initialized, loading, dispatch]);

  const login = async (credentials) => {
    console.log('🔐 useAuth - Attempting login...');
    const result = await dispatch(loginAction(credentials));
    if (result.success) {
      console.log('✅ useAuth - Login successful, navigating to home');
      navigate('/');
      return true;
    } else {
      console.log('❌ useAuth - Login failed:', result.error);
      return false;
    }
  };

  const logout = async () => {
    console.log('🚪 useAuth - Logging out...');
    await dispatch(logoutUser());
    navigate('/login');
  };

  const refreshProfile = async () => {
    console.log('🔄 useAuth - Refreshing user profile...');
    return await dispatch(getUserProfile());
  };

  // Helper function to get specific user data
  const getUserData = (field) => {
    if (!user) return null;
    return user[field];
  };

  // Helper function to check if user has specific role/permission
  const hasRole = (role) => {
    if (!user || !user.roles) return false;
    return user.roles.includes(role);
  };

  const hasPermission = (permission) => {
    if (!user || !user.permissions) return false;
    return user.permissions.includes(permission);
  };

  return {
    // Core auth state
    user,
    isAuthenticated,
    loading,
    error,
    initialized,
    
    // Auth actions
    login,
    logout,
    refreshProfile,
    
    // Helper functions
    getUserData,
    hasRole,
    hasPermission,
    
    // Commonly accessed user fields (with fallbacks)
    userId: user?.id || null,
    userName: user?.name || user?.username || null,
    userEmail: user?.email || null,
    userRole: user?.role || user?.roles?.[0] || null,
    userAvatar: user?.avatar || user?.profilePicture || null,
  };
};

export default useAuth;