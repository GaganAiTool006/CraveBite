import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiShield } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';

export default function AdminLogin() {
  const { switchDemoRole, login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('admin@cravebite.com');
  const [password, setPassword] = useState('123456');

  const handleLogin = (e) => {
    e.preventDefault();
    login(email, password, 'admin');
    navigate('/admin/dashboard');
  };

  const handleDemo = () => {
    switchDemoRole('admin');
    navigate('/admin/dashboard');
  };

  return (
    <div className="cb-page animate-fade-in" style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      background: '#0B0F19'
    }}>
      <div style={{ maxWidth: '440px', width: '100%' }}>
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div style={{ width: '50px', height: '50px', background: 'linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px auto', color: 'white' }}>
            <FiShield size={24} />
          </div>
          <h2 style={{ fontSize: '24px', fontWeight: '900', color: 'white' }}>Admin Control Center</h2>
          <p style={{ color: '#94A3B8', fontSize: '14px' }}>Executive management of restaurants, users, and fleet</p>
        </div>

        <div className="cb-card" style={{ padding: '32px' }}>
          <form onSubmit={handleLogin}>
            <div className="cb-form-group">
              <label className="cb-label">Admin Email</label>
              <input type="email" required value={email} onChange={e => setEmail(e.target.value)} className="cb-input" />
            </div>

            <div className="cb-form-group">
              <label className="cb-label">Master Password</label>
              <input type="password" required value={password} onChange={e => setPassword(e.target.value)} className="cb-input" />
            </div>

            <button type="submit" className="cb-btn cb-btn-primary cb-btn-lg" style={{ width: '100%', marginTop: '10px' }}>
              Authenticate Admin Session
            </button>
          </form>

          <div style={{ marginTop: '20px', paddingTop: '18px', borderTop: '1px solid var(--border)', textAlign: 'center' }}>
            <button onClick={handleDemo} className="cb-btn cb-btn-subtle" style={{ width: '100%', fontWeight: '800' }}>
              ⚡ 1-Click Instant Super Admin Demo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
