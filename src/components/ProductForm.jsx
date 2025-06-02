import React from 'react';

function ProductForm({ onAdd, formData, setFormData }) {
  const API_URL = import.meta.env.VITE_API_URL;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${API_URL}/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        const newProduct = await res.json();
        onAdd(newProduct); // Update UI
        setFormData({
          name: '',
          description: '',
          price: '',
          imageUrl: '',
          category: '',
          stock: ''
        });
      } else {
        console.error('❌ Server error:', res.status);
      }
    } catch (err) {
      console.error('❌ Request failed:', err.message);
    }
  };

  return (
    <form className="product-form" onSubmit={handleSubmit}>
      <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" required />
      <input type="text" name="description" value={formData.description} onChange={handleChange} placeholder="Description" />
      <input type="number" name="price" value={formData.price} onChange={handleChange} placeholder="Price" required />
      <input type="text" name="imageUrl" value={formData.imageUrl} onChange={handleChange} placeholder="Image URL" />
      <input type="text" name="category" value={formData.category} onChange={handleChange} placeholder="Category" />
      <input type="number" name="stock" value={formData.stock} onChange={handleChange} placeholder="Stock" />
      <button type="submit">Add Product</button>
    </form>
  );
}

export default ProductForm;
