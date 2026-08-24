import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { FiTruck, FiLock, FiMail, FiEye, FiEyeOff, FiAlertCircle, FiArrowLeft } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';

export default function DeliveryLogin() {
  const { switchDemoRole, login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const intendedDestination = location.state?.from?.pathname || '/delivery/dashboard';

  const [email, setEmail] = useState('delivery@cravebite.com');
  const [password, setPassword] = useState('123456');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    if (!email.trim() || !password) {
      setError('Please enter both rider email and password.');
      return;
    }

    setLoading(true);
    const res = await login(email.trim(), password, 'delivery');
    setLoading(false);

    if (res.success) {
      navigate(intendedDestination, { replace: true });
    } else {
      setError(res.error || 'Invalid rider email or password.');
    }
  };

  const handleDemo = () => {
    switchDemoRole('delivery');
    navigate(intendedDestination, { replace: true });
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
            background: 'linear-gradient(135deg, var(--success) 0%, #059669 100%)',
            borderRadius: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 16px auto',
            color: 'white',
            boxShadow: '0 8px 24px rgba(16, 185, 129, 0.4)'
          }}>
            <FiTruck size={26} />
          </div>
          <h2 style={{ fontSize: '24px', fontWeight: '900', color: 'white', letterSpacing: '-0.5px' }}>
            Delivery Partner Login
          </h2>
          <p style={{ color: '#94A3B8', fontSize: '14px', margin: '4px 0 0 0' }}>
            Accept orders, manage fleet earnings & turn-by-turn routing
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
              <label className="cb-label" style={{ color: '#E2E8F0' }}>Rider Email</label>
              <div style={{ position: 'relative' }}>
                <input 
                  type="email" 
                  required 
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
              <label className="cb-label" style={{ color: '#E2E8F0' }}>Password</label>
              <div style={{ position: 'relative' }}>
                <input 
                  type={showPassword ? 'text' : 'password'} 
                  required 
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
                marginTop: '10px',
                background: 'linear-gradient(135deg, var(--success) 0%, #059669 100%)',
                boxShadow: '0 4px 14px rgba(16, 185, 129, 0.4)'
              }}
            >
              {loading ? 'Authenticating Rider...' : 'Sign In Fleet Console'}
            </button>
          </form>

          <div style={{ marginTop: '20px', paddingTop: '18px', borderTop: '1px solid #334155', textAlign: 'center' }}>
            <button 
              onClick={handleDemo} 
              type="button"
              className="cb-btn cb-btn-subtle" 
              style={{ width: '100%', background: '#0F172A', color: '#E2E8F0', border: '1px solid #334155' }}
            >
              ⚡ 1-Click Instant Rider Demo
            </button>

            <Link 
              to="/home" 
              style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: '700', color: '#94A3B8', marginTop: '16px' }}
            >
              <FiArrowLeft size={14} /> Back to Customer Website
            </Link>
          </div>

        </div>

      </div>
    </div>
  );
}
