import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FiMail, FiLock, FiEye, FiEyeOff, FiUsers, FiShoppingBag, FiTruck, FiShield, FiAlertCircle } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';

export default function Login() {
  const { login, switchDemoRole } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const intendedDestination = location.state?.from?.pathname || '/home';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const cleanEmail = email.trim();
    if (!cleanEmail) {
      setError('Please enter your email address.');
      return;
    }
    if (!password) {
      setError('Please enter your account password.');
      return;
    }

    setLoading(true);
    const res = await login(cleanEmail, password);
    setLoading(false);

    if (res.success) {
      if (res.user.role === 'admin') navigate('/admin/dashboard');
      else if (res.user.role === 'restaurant') navigate('/restaurant/dashboard');
      else if (res.user.role === 'delivery') navigate('/delivery/dashboard');
      else {
        // Redirect to intended URL if valid, otherwise /home
        const target = intendedDestination === '/login' ? '/home' : intendedDestination;
        navigate(target, { replace: true });
      }
    } else {
      setError(res.error || 'Invalid email or password. Please check your credentials.');
    }
  };

  const handleDemoLogin = (roleKey, redirectPath) => {
    switchDemoRole(roleKey);
    const target = (roleKey === 'customer' && intendedDestination && intendedDestination !== '/login') 
      ? intendedDestination 
      : redirectPath;
    navigate(target, { replace: true });
  };

  return (
    <div className="cb-page animate-fade-in" style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 16px',
      background: 'linear-gradient(135deg, #EEF2FF 0%, #FAF5FF 50%, #FFF7ED 100%)'
    }}>
      <div style={{ maxWidth: '440px', width: '100%' }}>
        
        {/* Brand Header */}
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '46px',
              height: '46px',
              background: 'linear-gradient(135deg, var(--primary) 0%, #7C3AED 100%)',
              borderRadius: '14px',
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
            <span style={{ fontSize: '28px', fontWeight: '900', color: 'var(--text-main)', letterSpacing: '-0.5px' }}>
              Crave<span style={{ color: 'var(--accent)' }}>Bite</span>
            </span>
          </div>

          <h2 style={{ fontSize: '22px', fontWeight: '800', marginTop: '16px', color: 'var(--text-main)' }}>
            Sign in to continue
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px', margin: '4px 0 0 0' }}>
            Please login to access restaurants, orders and live tracking
          </p>
        </div>

        {/* Login Card */}
        <div className="cb-card" style={{ padding: '32px 28px', boxShadow: 'var(--shadow-md)' }}>
          
          {error && (
            <div style={{
              background: 'var(--danger-light)',
              color: 'var(--danger)',
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
              <label className="cb-label">Email Address</label>
              <div style={{ position: 'relative' }}>
                <input 
                  type="email" 
                  required
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="cb-input"
                  style={{ paddingLeft: '40px' }}
                />
                <FiMail style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} size={16} />
              </div>
            </div>

            <div className="cb-form-group">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                <label className="cb-label" style={{ margin: 0 }}>Password</label>
                <Link to="/forgot-password" style={{ fontSize: '12px', fontWeight: '700', color: 'var(--primary)' }}>
                  Forgot?
                </Link>
              </div>

              <div style={{ position: 'relative' }}>
                <input 
                  type={showPassword ? 'text' : 'password'} 
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="cb-input"
                  style={{ paddingLeft: '40px', paddingRight: '40px' }}
                />
                <FiLock style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} size={16} />
                
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    right: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: 'var(--text-muted)',
                    padding: '4px'
                  }}
                  title={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="cb-btn cb-btn-primary cb-btn-lg"
              style={{ width: '100%', marginTop: '12px' }}
            >
              {loading ? 'Authenticating...' : 'Sign In'}
            </button>
          </form>

          {/* Quick 1-Click Demo Logins */}
          <div style={{ marginTop: '24px', paddingTop: '20px', borderTop: '1px solid var(--border)' }}>
            <p style={{ fontSize: '11px', fontWeight: '800', color: 'var(--text-muted)', textTransform: 'uppercase', textAlign: 'center', marginBottom: '12px', letterSpacing: '0.5px' }}>
              ⚡ 1-Click Instant Demo Login
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
              <button
                type="button"
                onClick={() => handleDemoLogin('customer', '/home')}
                className="cb-btn cb-btn-subtle cb-btn-sm"
                style={{ justifyContent: 'flex-start', fontSize: '12px' }}
              >
                <FiUsers color="var(--primary)" /> Customer
              </button>

              <button
                type="button"
                onClick={() => handleDemoLogin('restaurant', '/restaurant/dashboard')}
                className="cb-btn cb-btn-subtle cb-btn-sm"
                style={{ justifyContent: 'flex-start', fontSize: '12px' }}
              >
                <FiShoppingBag color="var(--accent)" /> Restaurant
              </button>

              <button
                type="button"
                onClick={() => handleDemoLogin('delivery', '/delivery/dashboard')}
                className="cb-btn cb-btn-subtle cb-btn-sm"
                style={{ justifyContent: 'flex-start', fontSize: '12px' }}
              >
                <FiTruck color="var(--success)" /> Rider
              </button>

              <button
                type="button"
                onClick={() => handleDemoLogin('admin', '/admin/dashboard')}
                className="cb-btn cb-btn-subtle cb-btn-sm"
                style={{ justifyContent: 'flex-start', fontSize: '12px' }}
              >
                <FiShield color="#7C3AED" /> Admin
              </button>
            </div>
          </div>

          <div style={{ textAlign: 'center', marginTop: '22px', fontSize: '14px', color: 'var(--text-muted)' }}>
            Don't have an account?{' '}
            <Link to="/register" style={{ color: 'var(--primary)', fontWeight: '800' }}>
              Register here
            </Link>
          </div>

        </div>

      </div>
    </div>
  );
}
