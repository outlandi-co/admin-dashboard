import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductForm from './components/ProductForm';
import ProductTable from './components/ProductTable';
import Login from './components/Login';
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
  const [user, setUser] = useState(null); // Stores user profile info

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
      fetchUserProfile();
      fetchProducts();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/users/profile`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUser(res.data);
    } catch (err) {
      console.error('🔐 Failed to fetch user profile:', err.message);
      handleLogout(); // If token is invalid, logout
    }
  };

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/products`);
      setProducts(res.data.products || res.data);
    } catch (error) {
      console.error('❌ Failed to load products:', error.message);
    }
  };

  const handleAddProduct = async (newProduct) => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/products`, newProduct, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProducts((prev) => [...prev, res.data.product || res.data]);
    } catch (error) {
      console.error('❌ Failed to add product:', error.message);
    }
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    fetchUserProfile();
    fetchProducts();
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setUser(null);
    setProducts([]);
  };

  return (
    <div className="app">
      {!isLoggedIn ? (
        <Login onLogin={handleLogin} />
      ) : (
        <>
          <div style={{ textAlign: 'right' }}>
            <button onClick={handleLogout}>Logout</button>
          </div>
          <h1>Admin Dashboard: Product Manager</h1>

          {user?.role === 'admin' ? (
            <ProductForm
              onAdd={handleAddProduct}
              formData={formData}
              setFormData={setFormData}
            />
          ) : (
            <p style={{ color: 'red' }}>🔒 Access denied: Admins only</p>
          )}

          <ProductTable products={products} />
        </>
      )}
    </div>
  );
}

export default App;
