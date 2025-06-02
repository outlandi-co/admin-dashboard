import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    vendor: '',
    vendors: '',
    name: '',
    sku: '',
    description: '',
    cost: '',
    listPrice: '',
    image: '',
    category: '',
    quantity: '',
    colors: '',
    sizes: ''
  });

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/products`);
      setProducts(res.data.products);
    } catch (error) {
      console.error('❌ Failed to fetch products:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        vendor: formData.vendor.trim(),
        vendors: formData.vendors.split(',').map(v => v.trim()).filter(Boolean),
        name: formData.name.trim(),
        sku: formData.sku.trim(),
        description: formData.description.trim(),
        cost: parseFloat(formData.cost),
        listPrice: parseFloat(formData.listPrice),
        image: formData.image.trim(),
        category: formData.category.trim(),
        quantity: parseInt(formData.quantity),
        colors: formData.colors.split(',').map(c => c.trim()).filter(Boolean),
        sizes: formData.sizes.split(',').map(s => s.trim()).filter(Boolean)
      };

      const res = await axios.post(`${import.meta.env.VITE_API_URL}/products`, payload);
      console.log('✅ Product added:', res.data);
      fetchProducts();
    } catch (error) {
      console.error('❌ Failed to add product:', error);
    }
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <form onSubmit={handleSubmit}>
        <input name="vendor" placeholder="Vendor *" value={formData.vendor} onChange={handleChange} required />
        <input name="vendors" placeholder="Additional Vendors (comma-separated)" value={formData.vendors} onChange={handleChange} />
        <input name="name" placeholder="Name *" value={formData.name} onChange={handleChange} required />
        <input name="sku" placeholder="SKU" value={formData.sku} onChange={handleChange} />
        <input name="description" placeholder="Description" value={formData.description} onChange={handleChange} />
        <input name="cost" placeholder="Wholesale Cost *" value={formData.cost} onChange={handleChange} required />
        <input name="listPrice" placeholder="List Price *" value={formData.listPrice} onChange={handleChange} required />
        <input name="image" placeholder="Image URL" value={formData.image} onChange={handleChange} />
        <input name="category" placeholder="Category" value={formData.category} onChange={handleChange} />
        <input name="quantity" placeholder="Quantity *" value={formData.quantity} onChange={handleChange} required />
        <input name="colors" placeholder="Colors (comma-separated)" value={formData.colors} onChange={handleChange} />
        <input name="sizes" placeholder="Sizes (comma-separated)" value={formData.sizes} onChange={handleChange} />
        <button type="submit">Add Product</button>
      </form>

      <h3>All Products</h3>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Vendor</th>
            <th>List Price</th>
            <th>Cost</th>
            <th>Quantity</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product._id}>
              <td>{product.name}</td>
              <td>{product.vendor}</td>
              <td>${Number(product.listPrice).toFixed(2)}</td>
              <td>${Number(product.cost).toFixed(2)}</td>
              <td>{product.quantity}</td>
              <td>{product.category}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
