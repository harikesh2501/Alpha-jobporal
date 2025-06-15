// frontend/src/pages/AdminLogin.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function AdminLogin({ onLogin }) {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await axios.post('/api/admin/login', credentials);
      if (response.data.success) {
        onLogin();
        navigate('/admin/dashboard');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed!');
    }
  };

  return (
    <div className="card">
      <h2>Admin Login</h2>
      <form onSubmit={handleSubmit}>
        {error && <p className="error">{error}</p>}
        <div className="form-group">
          <label>Email</label>
          <input type="email" name="email" value={credentials.email} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" name="password" value={credentials.password} onChange={handleChange} required />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default AdminLogin;