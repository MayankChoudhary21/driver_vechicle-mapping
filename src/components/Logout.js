import React from 'react';
import { useNavigate } from 'react-router-dom';

function Logout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // No actual logout logic needed, just navigate to the login page
    navigate('/login');
  };

  return <button onClick={handleLogout}>Logout</button>;
}

export default Logout;
