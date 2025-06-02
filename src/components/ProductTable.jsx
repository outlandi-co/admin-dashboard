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
              {product.imageUrl ? (
                <img src={product.imageUrl} alt={product.name} />
              ) : (
                'No image'
              )}
            </td>
            <td>{product.name}</td>
            <td>{product.description}</td>
            <td>${Number(product.price).toFixed(2)}</td>
            <td>{product.category}</td>
            <td>{product.stock}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ProductTable;
