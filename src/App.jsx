// src/App.jsx (updated)
import React, { useState } from 'react';
import ProductForm from './components/ProductForm';
import ProductTable from './components/ProductTable';
import './App.css';

function App() {
  const [products, setProducts] = useState([]);

  const handleAddProduct = (newProduct) => {
    setProducts((prev) => [...prev, newProduct]);
  };

  return (
    <div className="App">
      <h1>Admin Dashboard: Product Manager</h1>
      <ProductForm onAdd={handleAddProduct} />
      <ProductTable products={products} />
    </div>
  );
}

export default App;