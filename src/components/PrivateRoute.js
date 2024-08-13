import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();

  console.log("Current User:", user); // Debugging - check user state

  return user ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
