import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FiBriefcase, FiLock, FiUser, FiEye, FiEyeOff, FiAlertCircle, FiArrowLeft } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';

export default function ManagerLogin() {
  const { loginManager } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const cleanUser = username.trim();
    if (!cleanUser) {
      setError('Please enter your manager username.');
      return;
    }
    if (!password) {
      setError('Please enter your manager security key/password.');
      return;
    }

    setLoading(true);
    const res = await loginManager(cleanUser, password);
    setLoading(false);

    if (res.success) {
      navigate('/manager/dashboard', { replace: true });
    } else {
      setError(res.error || 'Invalid manager username or password.');
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
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div style={{
            width: '54px',
            height: '54px',
            background: 'linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)',
            borderRadius: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 16px auto',
            color: 'white',
            boxShadow: '0 8px 24px rgba(79, 70, 229, 0.4)'
          }}>
            <FiBriefcase size={26} />
          </div>
          <h2 style={{ fontSize: '24px', fontWeight: '900', color: 'white', letterSpacing: '-0.5px' }}>
            Manager Operations Portal
          </h2>
          <p style={{ color: '#94A3B8', fontSize: '14px', margin: '4px 0 0 0' }}>
            CraveBite Central Command & Branch Management
          </p>
        </div>

        {/* Card */}
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

          <form onSubmit={handleSubmit}>
            <div className="cb-form-group">
              <label className="cb-label" style={{ color: '#E2E8F0' }}>Manager Username</label>
              <div style={{ position: 'relative' }}>
                <input 
                  type="text" 
                  required
                  placeholder="Enter username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="cb-input"
                  style={{
                    paddingLeft: '40px',
                    background: '#0F172A',
                    borderColor: '#334155',
                    color: 'white'
                  }}
                  autoFocus
                />
                <FiUser style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} size={16} />
              </div>
            </div>

            <div className="cb-form-group">
              <label className="cb-label" style={{ color: '#E2E8F0' }}>Security Password</label>
              <div style={{ position: 'relative' }}>
                <input 
                  type={showPassword ? 'text' : 'password'} 
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
                    padding: '4px'
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
                marginTop: '12px',
                background: 'linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)'
              }}
            >
              {loading ? 'Verifying Manager Credentials...' : 'Authenticate & Open Dashboard'}
            </button>
          </form>

          <div style={{ textAlign: 'center', marginTop: '24px', paddingTop: '16px', borderTop: '1px solid #334155' }}>
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
