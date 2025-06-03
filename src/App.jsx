// src/App.jsx (corrected)
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductForm from './components/ProductForm';
import ProductTable from './components/ProductTable';
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

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/products`);
      setProducts(res.data.products || res.data); // Handle both { products: [...] } or raw array
    } catch (error) {
      console.error('❌ Failed to load products:', error.message);
    }
  };

  const handleAddProduct = async (newProduct) => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/products`, newProduct);
      setProducts((prev) => [...prev, res.data.product || res.data]);
    } catch (error) {
      console.error('❌ Failed to add product:', error.message);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="app">
      <h1>Admin Dashboard: Product Manager</h1>
      <ProductForm
        onAdd={handleAddProduct}
        formData={formData}
        setFormData={setFormData}
      />
      <ProductTable products={products} />
    </div>
  );
}

export default App;
