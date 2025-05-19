import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  // Wait until user state is loaded
  if (loading) {
    return <div>Loading...</div>;
  }

  console.log("User state in ProtectedRoute:", user);
  return user ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
