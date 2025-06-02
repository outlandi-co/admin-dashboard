// src/components/ProductTable.jsx
import React from 'react';

export default function ProductTable({ products }) {
  return (
    <table className="product-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
          <th>Image</th>
        </tr>
      </thead>
      <tbody>
        {products.map((p, i) => (
          <tr key={i}>
            <td>{p.name}</td>
            <td>{p.price}</td>
            <td><img src={p.image} alt={p.name} style={{ width: '50px' }} /></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}