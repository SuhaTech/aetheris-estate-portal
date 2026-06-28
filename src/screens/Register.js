import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; // 1. Axios import kiya backend connectivity ke liye
import styles from './LoginRegister.module.css';

export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'tenant' 
  });
  const [error, setError] = useState(''); // Errors display karne ke liye
  const [loading, setLoading] = useState(false); // Button loader ke liye

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // 2. Real Backend Endpoint call (Apne Node/Express routes ke mutabik url check kar lein)
      const API_BASE_URL = 'https://aetheris-estate-portal.onrender.com/api';
      const response = await axios.post(`${API_BASE_URL}/auth/register`, formData);
      
      if (response.status === 201 || response.status === 200) {
        alert('🎉 Registration Successful! Welcome to Aetheris Ecosystem.');
        navigate('/login'); // Success hone par login par bhejenge
      }
    } catch (err) {
      console.error("Registration error:", err);
      // Agar backend se koi error message aata hai toh wahi dikhayenge, nahi toh fallback
      setError(err.response?.data?.message || 'System failed to register user. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.authContainer}>
      <div className={styles.authCard}>
        {/* Project Branding Header */}
        <h1 style={{ fontSize: '26px', fontWeight: '900', letterSpacing: '1px', color: '#1a365d', margin: '0 0 5px 0' }}>AETHERIS</h1>
        <p style={{ margin: '0 0 20px 0', fontSize: '13px', color: '#718096', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px' }}>Estate Management Matrix</p>
        
        <h2>Create an Account</h2>
        
        {/* Error Alert Box */}
        {error && (
          <div style={{ background: '#fff5f5', color: '#c53030', padding: '10px', borderRadius: '6px', fontSize: '13px', marginBottom: '15px', border: '1px solid #fed7d7', fontWeight: '600' }}>
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label>Full Name</label>
            <input type="text" name="name" required onChange={handleChange} value={formData.name} placeholder="Enter your name" />
          </div>

          <div className={styles.inputGroup}>
            <label>Email Address</label>
            <input type="email" name="email" required onChange={handleChange} value={formData.email} placeholder="Enter your email" />
          </div>

          <div className={styles.inputGroup}>
            <label>Password</label>
            <input type="password" name="password" required onChange={handleChange} value={formData.password} placeholder="Create a password" />
          </div>

          <div className={styles.inputGroup}>
            <label>I am a:</label>
            <select name="role" value={formData.role} onChange={handleChange} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e0' }}>
              <option value="tenant">Tenant (Kirayedar)</option>
              <option value="owner">Property Owner / Manager</option>
              <option value="staff">Maintenance Staff</option>
            </select>
          </div>

          <button type="submit" disabled={loading} className={styles.authButton}>
            {loading ? 'Registering System Connection...' : 'Register Account'}
          </button>
        </form>

        <p className={styles.switchText}>
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </div>
    </div>
  );
}