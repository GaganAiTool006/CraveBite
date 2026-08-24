import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiUser, FiMail, FiPhone, FiLock, FiCheck } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    role: 'customer',
    restaurantName: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    setLoading(true);
    const res = await register({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      password: formData.password,
      role: formData.role,
      restaurantName: formData.restaurantName
    });
    setLoading(false);

    if (res.success) {
      if (formData.role === 'restaurant') navigate('/restaurant/dashboard');
      else if (formData.role === 'delivery') navigate('/delivery/dashboard');
      else navigate('/home');
    } else {
      setError(res.error || 'Registration failed.');
    }
  };

  return (
    <div className="cb-page animate-fade-in" style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 20px',
      background: 'linear-gradient(135deg, #EEF2FF 0%, #FAF5FF 100%)'
    }}>
      <div style={{ maxWidth: '480px', width: '100%' }}>
        
        {/* Brand Logo Header */}
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <Link to="/home" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '44px',
              height: '44px',
              background: 'var(--primary)',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: '900',
              fontSize: '22px',
              boxShadow: 'var(--shadow-primary)'
            }}>
              CB
            </div>
            <span style={{ fontSize: '26px', fontWeight: '900', color: 'var(--text-main)' }}>
              Crave<span style={{ color: 'var(--accent)' }}>Bite</span>
            </span>
          </Link>
          <h2 style={{ fontSize: '22px', fontWeight: '800', marginTop: '16px', color: 'var(--text-main)' }}>
            Create an Account
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>
            Join CraveBite to start ordering delicious food or partner with us
          </p>
        </div>

        {/* Register Card */}
        <div className="cb-card" style={{ padding: '32px', boxShadow: 'var(--shadow-md)' }}>
          
          {error && (
            <div style={{ background: 'var(--danger-light)', color: 'var(--danger)', padding: '12px 14px', borderRadius: 'var(--radius-sm)', fontSize: '13px', fontWeight: '700', marginBottom: '18px' }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            
            {/* Role Selection */}
            <div className="cb-form-group">
              <label className="cb-label">Registering as</label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                {[
                  { key: 'customer', label: 'Foodie' },
                  { key: 'restaurant', label: 'Restaurant' },
                  { key: 'delivery', label: 'Rider' }
                ].map(r => (
                  <button
                    type="button"
                    key={r.key}
                    onClick={() => setFormData({ ...formData, role: r.key })}
                    style={{
                      padding: '8px',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: '13px',
                      fontWeight: '700',
                      border: '1.5px solid',
                      borderColor: formData.role === r.key ? 'var(--primary)' : 'var(--border)',
                      background: formData.role === r.key ? 'var(--primary-50)' : 'white',
                      color: formData.role === r.key ? 'var(--primary)' : 'var(--text-main)'
                    }}
                  >
                    {r.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="cb-form-group">
              <label className="cb-label">Full Name</label>
              <input 
                type="text" 
                required
                placeholder="Aarav Sharma"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="cb-input"
              />
            </div>

            {formData.role === 'restaurant' && (
              <div className="cb-form-group">
                <label className="cb-label">Restaurant / Kitchen Name</label>
                <input 
                  type="text" 
                  required
                  placeholder="E.g. Royal Delight Kitchen"
                  value={formData.restaurantName}
                  onChange={(e) => setFormData({ ...formData, restaurantName: e.target.value })}
                  className="cb-input"
                />
              </div>
            )}

            <div className="cb-form-group">
              <label className="cb-label">Email Address</label>
              <input 
                type="email" 
                required
                placeholder="name@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="cb-input"
              />
            </div>

            <div className="cb-form-group">
              <label className="cb-label">Phone Number</label>
              <input 
                type="tel" 
                required
                placeholder="+91 98765 43210"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="cb-input"
              />
            </div>

            <div className="cb-form-group">
              <label className="cb-label">Password</label>
              <input 
                type="password" 
                required
                placeholder="At least 6 characters"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="cb-input"
              />
            </div>

            <div className="cb-form-group">
              <label className="cb-label">Confirm Password</label>
              <input 
                type="password" 
                required
                placeholder="Repeat password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                className="cb-input"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="cb-btn cb-btn-primary cb-btn-lg"
              style={{ width: '100%', marginTop: '10px' }}
            >
              {loading ? 'Creating Account in Firestore...' : 'Create Account'}
            </button>
          </form>

          <div style={{ textAlign: 'center', marginTop: '24px', fontSize: '14px', color: 'var(--text-muted)' }}>
            Already have an account?{' '}
            <Link to="/login" style={{ color: 'var(--primary)', fontWeight: '800' }}>
              Sign In
            </Link>
          </div>

        </div>

      </div>
    </div>
  );
}
