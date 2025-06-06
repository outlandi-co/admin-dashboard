import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setMsg('');
    setError('');

    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/register`, {
        username,
        password
      });

      setMsg(res.data.message || 'Registration successful! Redirecting...');
      setTimeout(() => navigate('/'), 2000); // redirect to login
    } catch (err) {
      console.error('❌ Registration error:', err.response?.data || err.message);
      setError(err.response?.data?.message || 'Registration failed.');
    }
  };

  return (
    <div className="register-form" style={{ maxWidth: 400, margin: 'auto', padding: 20 }}>
      <h2>📘 Create Admin Account</h2>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Choose username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          style={{ width: '100%', padding: 10, marginBottom: 10 }}
        />
        <input
          type="password"
          placeholder="Choose password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ width: '100%', padding: 10, marginBottom: 10 }}
        />
        <button type="submit" style={{ width: '100%', padding: 10 }}>
          Register
        </button>
      </form>

      {msg && <p style={{ color: 'green' }}>{msg}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <p style={{ marginTop: 12 }}>
        Already have an account? <Link to="/">Login</Link>
      </p>
    </div>
  );
};

export default Register;
