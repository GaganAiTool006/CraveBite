import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FiShield, FiLock, FiMail, FiEye, FiEyeOff, FiAlertCircle, FiArrowLeft } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';

export default function AdminLogin() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('admin@cravebite.com');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    if (!email.trim() || !password) {
      setError('Please enter both admin email and password.');
      return;
    }

    setLoading(true);
    const res = await login(email.trim(), password, 'admin');
    setLoading(false);

    if (res.success) {
      navigate('/admin/dashboard', { replace: true });
    } else {
      setError(res.error || 'Invalid admin credentials. Access Denied.');
    }
  };

  return (
    <div className="cb-page animate-fade-in" style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px 16px',
      background: '#0B0F19'
    }}>
      <div style={{ maxWidth: '440px', width: '100%' }}>
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div style={{
            width: '54px',
            height: '54px',
            background: 'linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)',
            borderRadius: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 14px auto',
            color: 'white',
            boxShadow: '0 8px 24px rgba(124, 58, 237, 0.4)'
          }}>
            <FiShield size={26} />
          </div>
          <h2 style={{ fontSize: '24px', fontWeight: '900', color: 'white', letterSpacing: '-0.5px' }}>
            Admin Control Center
          </h2>
          <p style={{ color: '#94A3B8', fontSize: '13.5px', margin: '4px 0 0 0' }}>
            Executive management of restaurants, users, and platform controls
          </p>
        </div>

        <div className="cb-card" style={{ padding: '32px 28px', background: '#1E293B', borderColor: '#334155', boxShadow: 'var(--shadow-lg)' }}>
          
          {error && (
            <div style={{
              background: 'rgba(239, 68, 68, 0.15)',
              border: '1px solid rgba(239, 68, 68, 0.4)',
              color: '#FCA5A5',
              padding: '12px 14px',
              borderRadius: 'var(--radius-sm)',
              fontSize: '13px',
              fontWeight: '700',
              marginBottom: '20px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <FiAlertCircle size={16} />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin}>
            <div className="cb-form-group">
              <label className="cb-label" style={{ color: '#E2E8F0', fontSize: '13px' }}>Admin Email</label>
              <div style={{ position: 'relative' }}>
                <input 
                  type="email" 
                  required 
                  placeholder="admin@cravebite.com"
                  value={email} 
                  onChange={e => setEmail(e.target.value)} 
                  className="cb-input" 
                  style={{
                    paddingLeft: '40px',
                    background: '#0F172A',
                    borderColor: '#334155',
                    color: 'white'
                  }}
                />
                <FiMail style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} size={16} />
              </div>
            </div>

            <div className="cb-form-group">
              <label className="cb-label" style={{ color: '#E2E8F0', fontSize: '13px' }}>Master Password</label>
              <div style={{ position: 'relative' }}>
                <input 
                  type={showPassword ? 'text' : 'password'} 
                  required 
                  placeholder="••••••••"
                  value={password} 
                  onChange={e => setPassword(e.target.value)} 
                  className="cb-input" 
                  style={{
                    paddingLeft: '40px',
                    paddingRight: '40px',
                    background: '#0F172A',
                    borderColor: '#334155',
                    color: 'white'
                  }}
                />
                <FiLock style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} size={16} />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    right: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: '#94A3B8',
                    padding: '4px',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  {showPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                </button>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="cb-btn cb-btn-primary cb-btn-lg" 
              style={{
                width: '100%',
                marginTop: '10px',
                background: 'linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)',
                boxShadow: '0 4px 14px rgba(124, 58, 237, 0.4)',
                border: 'none'
              }}
            >
              {loading ? 'Authenticating Admin...' : 'Authenticate Admin Session'}
            </button>
          </form>

          <div style={{ textAlign: 'center', marginTop: '20px', paddingTop: '16px', borderTop: '1px solid #334155' }}>
            <Link 
              to="/home" 
              style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: '700', color: '#94A3B8' }}
            >
              <FiArrowLeft size={14} /> Back to Customer Website
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
