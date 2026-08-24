import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FiShoppingBag, FiArrowRight } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';

export default function RestaurantLogin() {
  const { switchDemoRole, login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('restaurant@cravebite.com');
  const [password, setPassword] = useState('123456');

  const handleLogin = (e) => {
    e.preventDefault();
    login(email, password, 'restaurant');
    navigate('/restaurant/dashboard');
  };

  const handleDemo = () => {
    switchDemoRole('restaurant');
    navigate('/restaurant/dashboard');
  };

  return (
    <div className="cb-page animate-fade-in" style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      background: '#0F172A'
    }}>
      <div style={{ maxWidth: '440px', width: '100%' }}>
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div style={{ width: '50px', height: '50px', background: 'var(--accent)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px auto', color: 'white' }}>
            <FiShoppingBag size={24} />
          </div>
          <h2 style={{ fontSize: '24px', fontWeight: '900', color: 'white' }}>Restaurant Merchant Login</h2>
          <p style={{ color: '#94A3B8', fontSize: '14px' }}>Access your kitchen orders and live menu catalog</p>
        </div>

        <div className="cb-card" style={{ padding: '32px' }}>
          <form onSubmit={handleLogin}>
            <div className="cb-form-group">
              <label className="cb-label">Merchant Email</label>
              <input type="email" required value={email} onChange={e => setEmail(e.target.value)} className="cb-input" />
            </div>

            <div className="cb-form-group">
              <label className="cb-label">Password</label>
              <input type="password" required value={password} onChange={e => setPassword(e.target.value)} className="cb-input" />
            </div>

            <button type="submit" className="cb-btn cb-btn-accent cb-btn-lg" style={{ width: '100%', marginTop: '10px' }}>
              Sign In Merchant Console
            </button>
          </form>

          <div style={{ marginTop: '20px', paddingTop: '18px', borderTop: '1px solid var(--border)', textAlign: 'center' }}>
            <button onClick={handleDemo} className="cb-btn cb-btn-primary" style={{ width: '100%' }}>
              ⚡ 1-Click Instant Merchant Demo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
