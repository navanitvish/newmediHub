
import { Navigate } from 'react-router-dom';
import LoginForm from '../components/auth/LoginForm';
import useAuth from '../hooks/useAuth';

const Login = () => {
  const { isAuthenticated } = useAuth();
  
  // Redirect if already authenticated
  if (isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return (
    <div className="">
      <div className="">
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;