// src/components/ProductTable.jsx
import React from 'react';

function ProductTable({ products }) {
  return (
    <table className="product-table">
      <thead>
        <tr>
          <th>Image</th>
          <th>Name</th>
          <th>Description</th>
          <th>Price</th>
          <th>Category</th>
          <th>Stock</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product, index) => (
          <tr key={index}>
            <td>
              {product.image ? (
                <img
                  src={product.image}
                  alt={product.name}
                  style={{ width: '60px', height: 'auto', objectFit: 'contain' }}
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = '/placeholder.png'; // fallback
                  }}
                />
              ) : (
                'No image'
              )}
            </td>
            <td>{product.name}</td>
            <td>{product.description}</td>
            <td>
              {product.listPrice != null
                ? `$${Number(product.listPrice).toFixed(2)}`
                : 'N/A'}
            </td>
            <td>{product.category}</td>
            <td>{product.quantity}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ProductTable;
