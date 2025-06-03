// src/components/ProtectedAdmin.jsx
import React, { useEffect, useState } from 'react';
import Login from './Login';
import AdminDashboard from './AdminDashboard';

const ProtectedAdmin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return isLoggedIn ? (
    <AdminDashboard />
  ) : (
    <Login onLogin={handleLogin} />
  );
};

export default ProtectedAdmin;
