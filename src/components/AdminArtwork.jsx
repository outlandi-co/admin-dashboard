import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../styles/AdminArtwork.css'; // Or use .module.scss if preferred

const AdminArtwork = () => {
  const [artworks, setArtworks] = useState([]);

  useEffect(() => {
    const fetchArtworks = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/upload/artworks`);
        setArtworks(res.data);
      } catch (err) {
        console.error('❌ Failed to fetch artworks:', err);
      }
    };

    fetchArtworks();
  }, []);

  return (
    <div className="artwork-container">
      <h2>Submitted Artwork</h2>

      {artworks.length === 0 ? (
        <p>No artwork found.</p>
      ) : (
        <div className="artwork-grid">
          {artworks.map((art) => (
            <div key={art._id} className="artwork-card">
              <h4>{art?.productId?.name || 'Unnamed Product'}</h4>

              <img
                src={`${import.meta.env.VITE_API_URL}/${art.filePath}`}
                alt={`Artwork for ${art?.productId?.name || 'product'}`}
                className="artwork-img"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '/placeholder.jpg';
                }}
              />

              <p><strong>SKU:</strong> {art?.productId?.sku || 'N/A'}</p>
              <p><strong>Submitted:</strong> {new Date(art.createdAt).toLocaleString()}</p>
              <p><strong>Status:</strong> {art.approved ? '✅ Approved' : '🕒 Pending Approval'}</p>

              <a
                href={`${import.meta.env.VITE_API_URL}/${art.filePath}`}
                download
                className="download-link"
              >
                ⬇️ Download File
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminArtwork;
