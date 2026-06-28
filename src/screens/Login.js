import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; // Backend se connectivity ke liye import kiya
import styles from './LoginRegister.module.css';

export default function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState(''); // Error handling ke liye state
  const [loading, setLoading] = useState(false); // Button loading state
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const API_BASE_URL = 'https://aetheris-backend.onrender.com';
      // 1. Backend login route ko data bheja
      const response = await axios.post(`${API_BASE_URL}/auth/login`, formData);
      
      if (response.status === 200 || response.status === 201) {
        const userData = response.data.user;
        
        // 🌟 SABSE CRUCIAL LOGIC: Backend se aaya naam local storage me save kiya
        localStorage.setItem('name', userData.name);
        localStorage.setItem('role', userData.role);
        
        // Agar aap user ka pura object save karna chahein:
        localStorage.setItem('user', JSON.stringify(userData));

        alert(`🎉 Welcome back, ${userData.name.toUpperCase()}!`);
        
        // 2. Storage set hone ke BAAD dashboard par redirect karenge
        navigate('/dashboard');
      }
    } catch (err) {
      console.error("Login Error:", err);
      setError(err.response?.data?.message || 'Invalid Email or Password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.authContainer}>
      <div className={styles.authCard}>
        {/* Branding header line */}
        <h1 style={{ fontSize: '26px', fontWeight: '900', color: '#1a365d', margin: '0 0 5px 0', letterSpacing: '1px' }}>AETHERIS</h1>
        <p style={{ margin: '0 0 20px 0', fontSize: '12px', color: '#718096', fontWeight: '600', textTransform: 'uppercase' }}>Secure Core Access</p>

        <h2>Welcome Back</h2>
        <p>Login to manage your requests</p>
        
        {/* Error Notification Alert */}
        {error && (
          <div style={{ background: '#fff5f5', color: '#c53030', padding: '10px', borderRadius: '6px', fontSize: '13px', marginBottom: '15px', border: '1px solid #fed7d7', fontWeight: '600' }}>
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label>Email Address</label>
            <input type="email" name="email" required onChange={handleChange} value={formData.email} placeholder="Enter your email" />
          </div>

          <div className={styles.inputGroup}>
            <label>Password</label>
            <input type="password" name="password" required onChange={handleChange} value={formData.password} placeholder="Enter your password" />
          </div>

          <button type="submit" disabled={loading} className={styles.authButton}>
            {loading ? 'Authenticating Credentials...' : 'Login'}
          </button>
        </form>

        <p className={styles.switchText}>
          Don't have an account? <Link to="/register">Register here</Link>
        </p>
      </div>
    </div>
  );
}