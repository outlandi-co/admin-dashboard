// src/components/ResetPassword.jsx
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function ResetPassword() {
  const { token } = useParams();
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleReset = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg('');
    setError('');

    try {
      console.log('🔁 Sending new password to:', token);
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/reset-password/${token}`,
        { password }
      );

      setMsg(res.data.message || 'Password reset successful');
      setPassword('');
      setTimeout(() => navigate('/'), 2500);
    } catch (err) {
      console.error('❌ Reset error:', err.response?.data || err.message);
      setError(err.response?.data?.message || 'Reset failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="reset-container" style={{ maxWidth: 400, margin: 'auto', padding: 20 }}>
      <h2>🔐 Reset Your Password</h2>
      <form onSubmit={handleReset}>
        <div style={{ marginBottom: 12 }}>
          <input
            type="password"
            placeholder="Enter new password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '10px',
              fontSize: '16px',
              borderRadius: '5px',
              border: '1px solid #ccc'
            }}
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          style={{
            width: '100%',
            padding: '10px',
            fontSize: '16px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          {loading ? 'Resetting...' : 'Reset Password'}
        </button>
      </form>
      {msg && <p style={{ color: 'green', marginTop: 12 }}>{msg}</p>}
      {error && <p style={{ color: 'red', marginTop: 12 }}>{error}</p>}
    </div>
  );
}

export default ResetPassword;
