// src/components/ProductForm.jsx
import React, { useState } from 'react';

export default function ProductForm({ onAdd }) {
  const [product, setProduct] = useState({ name: '', price: '', image: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(product);
    setProduct({ name: '', price: '', image: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="product-form">
      <input name="name" value={product.name} onChange={handleChange} placeholder="Name" required />
      <input name="price" value={product.price} onChange={handleChange} placeholder="Price" required />
      <input name="image" value={product.image} onChange={handleChange} placeholder="Image URL" required />
      <button type="submit">Add Product</button>
    </form>
  );
}