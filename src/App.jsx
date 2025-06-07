import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';

import ProductForm from './components/ProductForm';
import ProductTable from './components/ProductTable';
import Login from './components/Login';
import ForgotPasswordPage from './components/ForgotPassword';
import ResetPasswordPage from './components/ResetPassword';
import AdminArtwork from './components/AdminArtwork';

import './App.css';

function App() {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    imageUrl: '',
    category: '',
    stock: ''
  });

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // 🔐 Logout and reset state
  const handleLogout = useCallback(() => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setUser(null);
    setProducts([]);
    navigate('/');
  }, [navigate]);

  // 🔐 Fetch profile using token
  const fetchUserProfile = useCallback(async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/auth/profile`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setUser(res.data);
    } catch (err) {
      console.error('🔐 Failed to fetch user profile:', err.message);
      handleLogout();
    }
  }, [handleLogout]);

  // 📦 Load products for admin
  const fetchProducts = useCallback(async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/products`);
      setProducts(res.data.products || res.data);
    } catch (error) {
      console.error('❌ Failed to load products:', error.message);
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
      fetchUserProfile();
      fetchProducts();
    }
  }, [fetchUserProfile, fetchProducts]);

  // ➕ Add new product
  const handleAddProduct = async (newProduct) => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/products`, newProduct, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setProducts((prev) => [...prev, res.data.product || res.data]);
    } catch (error) {
      console.error('❌ Failed to add product:', error.message);
    }
  };

  // ✅ Login success actions
  const handleLogin = () => {
    setIsLoggedIn(true);
    fetchUserProfile();
    fetchProducts();
    navigate('/dashboard');
  };

  return (
    <div className="app">
      <Routes>
        {/* 🔑 Auth */}
        <Route path="/" element={isLoggedIn ? <Navigate to="/dashboard" /> : <Login onLogin={handleLogin} />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        {/* ✅ UPDATED RESET PASSWORD ROUTE */}
        <Route path="/admin/reset-password/:token" element={<ResetPasswordPage />} />

        {/* 🛠 Admin Dashboard */}
        <Route
          path="/dashboard"
          element={
            isLoggedIn && user?.role === 'admin' ? (
              <>
                <div style={{ textAlign: 'right' }}>
                  <button onClick={handleLogout}>Logout</button>
                </div>
                <h1>Admin Dashboard: Product Manager</h1>
                <ProductForm
                  onAdd={handleAddProduct}
                  formData={formData}
                  setFormData={setFormData}
                />
                <ProductTable products={products} />
              </>
            ) : (
              <Navigate to="/" />
            )
          }
        />

        {/* 🎨 Admin Artwork Upload */}
        <Route
          path="/artworks"
          element={
            isLoggedIn && user?.role === 'admin' ? (
              <>
                <div style={{ textAlign: 'right' }}>
                  <button onClick={handleLogout}>Logout</button>
                </div>
                <AdminArtwork />
              </>
            ) : (
              <Navigate to="/" />
            )
          }
        />

        {/* 🛑 Fallback route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;
