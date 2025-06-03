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
                  alt={product.name || 'Product image'}
                  style={{ width: '60px', height: 'auto', objectFit: 'contain' }}
                />
              ) : (
                <span>No image</span>
              )}
            </td>
            <td>{product.name || 'N/A'}</td>
            <td>{product.description || 'N/A'}</td>
            <td>
              {product.listPrice != null
                ? `$${Number(product.listPrice).toFixed(2)}`
                : 'N/A'}
            </td>
            <td>{product.category || 'N/A'}</td>
            <td>{product.quantity != null ? product.quantity : 'N/A'}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ProductTable;
