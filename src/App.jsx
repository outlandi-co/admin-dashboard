// src/App.jsx (updated)
import React, { useState } from 'react';
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

  const handleAddProduct = (newProduct) => {
    setProducts((prevProducts) => [...prevProducts, newProduct]);
  };

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
