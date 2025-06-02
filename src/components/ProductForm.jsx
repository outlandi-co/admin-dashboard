import axios from 'axios';
import { useState } from 'react';

const ProductForm = () => {
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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const cost = parseFloat(formData.cost);
      const listPrice = parseFloat(formData.listPrice);
      const quantity = parseInt(formData.quantity);

      if (!formData.vendor || !formData.name || isNaN(cost) || isNaN(listPrice) || isNaN(quantity)) {
        throw new Error('Required fields missing or invalid.');
      }

      const payload = {
        vendor: formData.vendor.trim(),
        vendors: formData.vendors
          ? formData.vendors.split(',').map(v => v.trim()).filter(Boolean)
          : [],
        name: formData.name.trim(),
        sku: formData.sku.trim() || undefined,
        description: formData.description.trim() || undefined,
        cost,
        listPrice,
        image: formData.image.trim() || undefined,
        category: formData.category.trim() || undefined,
        quantity,
        colors: formData.colors
          ? formData.colors.split(',').map(c => c.trim()).filter(Boolean)
          : [],
        sizes: formData.sizes
          ? formData.sizes.split(',').map(s => s.trim()).filter(Boolean)
          : []
      };

      console.log('🧾 Payload:', payload);

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/products`,
        payload,
        { headers: { 'Content-Type': 'application/json' } }
      );

      console.log('✅ Product created:', res.data);
    } catch (error) {
      if (error.response) {
        console.error('❌ Backend response error:', error.response.data);
      } else if (error.request) {
        console.error('❌ No response received from server:', error.request);
      } else {
        console.error('❌ Unexpected error:', error.message);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="vendor" value={formData.vendor} onChange={handleChange} placeholder="Vendor *" required />
      <input name="vendors" value={formData.vendors} onChange={handleChange} placeholder="Other Vendors (comma-separated)" />
      <input name="name" value={formData.name} onChange={handleChange} placeholder="Product Name *" required />
      <input name="sku" value={formData.sku} onChange={handleChange} placeholder="SKU (optional)" />
      <input name="description" value={formData.description} onChange={handleChange} placeholder="Description" />
      <input name="cost" type="number" value={formData.cost} onChange={handleChange} placeholder="Wholesale Cost *" required />
      <input name="listPrice" type="number" value={formData.listPrice} onChange={handleChange} placeholder="List Price *" required />
      <input name="image" value={formData.image} onChange={handleChange} placeholder="Image URL" />
      <input name="category" value={formData.category} onChange={handleChange} placeholder="Category" />
      <input name="quantity" type="number" value={formData.quantity} onChange={handleChange} placeholder="Quantity *" required />
      <input name="colors" value={formData.colors} onChange={handleChange} placeholder="Colors (comma-separated)" />
      <input name="sizes" value={formData.sizes} onChange={handleChange} placeholder="Sizes (comma-separated)" />
      <button type="submit">Add Product</button>
    </form>
  );
};

export default ProductForm;
