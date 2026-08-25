import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import { 
  FiMail, 
  FiLock, 
  FiEye, 
  FiEyeOff, 
  FiUsers, 
  FiShoppingBag, 
  FiTruck, 
  FiShield, 
  FiSettings, 
  FiAlertCircle, 
  FiCheckCircle,
  FiArrowRight
} from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  // Selected portal tab (default: customer, or query param e.g. /login?portal=manager)
  const initialPortal = searchParams.get('portal') || 'customer';
  const [activePortal, setActivePortal] = useState(initialPortal);

  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Sync portal from query params if URL changes
  useEffect(() => {
    const p = searchParams.get('portal');
    if (p && ['customer', 'manager', 'restaurant', 'delivery', 'admin'].includes(p)) {
      setActivePortal(p);
      setIdentifier('');
      setPassword('');
      setError('');
    }
  }, [searchParams]);

  // Portal metadata
  const portals = [
    { 
      id: 'customer', 
      label: 'Customer', 
      icon: <FiUsers size={16} />, 
      color: 'var(--primary)',
      badge: 'Public',
      idPlaceholder: 'Enter your email (e.g. user@gmail.com)',
      idLabel: 'Customer Email Address',
      hint: 'Any registered user can sign in. Data persists across sessions.'
    },
    { 
      id: 'manager', 
      label: 'Manager', 
      icon: <FiSettings size={16} />, 
      color: '#0284C7',
      badge: 'Protected',
      idPlaceholder: 'Manager Username (ccadmin)',
      idLabel: 'Manager Username / Email',
      hint: 'Operations console: requires valid manager authentication.'
    },
    { 
      id: 'restaurant', 
      label: 'Restaurant', 
      icon: <FiShoppingBag size={16} />, 
      color: 'var(--accent)',
      badge: 'Partner',
      idPlaceholder: 'Restaurant Email (restaurant@cravebite.com)',
      idLabel: 'Restaurant Partner Email / ID',
      hint: 'Kitchen dashboard & menu catalog management.'
    },
    { 
      id: 'delivery', 
      label: 'Delivery', 
      icon: <FiTruck size={16} />, 
      color: 'var(--success)',
      badge: 'Rider Fleet',
      idPlaceholder: 'Rider Email (delivery@cravebite.com)',
      idLabel: 'Rider Partner Email / ID',
      hint: 'Fleet console: live order radar & earnings ledger.'
    },
    { 
      id: 'admin', 
      label: 'Super Admin', 
      icon: <FiShield size={16} />, 
      color: '#7C3AED',
      badge: 'Super Admin',
      idPlaceholder: 'Admin Email (admin@cravebite.com)',
      idLabel: 'System Administrator Email',
      hint: 'Platform administration & global master controls.'
    }
  ];

  const currentPortalConfig = portals.find(p => p.id === activePortal) || portals[0];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const cleanId = identifier.trim();
    if (!cleanId) {
      setError(`Please enter your ${currentPortalConfig.idLabel}.`);
      return;
    }
    if (!password) {
      setError('Please enter your account password.');
      return;
    }

    setLoading(true);
    const res = await login(cleanId, password, activePortal);
    setLoading(false);

    if (res.success) {
      const role = res.user.role;
      if (role === 'manager') {
        navigate('/manager/dashboard', { replace: true });
      } else if (role === 'admin') {
        navigate('/admin/dashboard', { replace: true });
      } else if (role === 'restaurant') {
        navigate('/restaurant/dashboard', { replace: true });
      } else if (role === 'delivery') {
        navigate('/delivery/dashboard', { replace: true });
      } else {
        const fromPath = location.state?.from?.pathname;
        const target = (fromPath && fromPath !== '/login' && !fromPath.startsWith('/manager') && !fromPath.startsWith('/admin') && !fromPath.startsWith('/restaurant') && !fromPath.startsWith('/delivery'))
          ? fromPath 
          : '/home';
        navigate(target, { replace: true });
      }
    } else {
      setError(res.error || 'Authentication failed. Please verify your credentials.');
    }
  };

  return (
    <div className="cb-page animate-fade-in" style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 16px',
      background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 50%, #0F172A 100%)'
    }}>
      <div style={{ maxWidth: '480px', width: '100%' }}>
        
        {/* Brand Header */}
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '46px',
              height: '46px',
              background: 'linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%)',
              borderRadius: '14px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: '900',
              fontSize: '22px',
              boxShadow: '0 8px 24px rgba(235, 87, 87, 0.4)'
            }}>
              CB
            </div>
            <span style={{ fontSize: '28px', fontWeight: '900', color: 'white', letterSpacing: '-0.5px' }}>
              Crave<span style={{ color: 'var(--accent)' }}>Bite</span>
            </span>
          </div>

          <h2 style={{ fontSize: '22px', fontWeight: '800', marginTop: '14px', color: 'white' }}>
            Unified Access Portal
          </h2>
          <p style={{ color: '#94A3B8', fontSize: '13.5px', margin: '4px 0 0 0' }}>
            Sign in to access your authorized CraveBite console
          </p>
        </div>

        {/* Portal Role Tabs */}
        <div style={{
          display: 'flex',
          gap: '6px',
          background: 'rgba(255, 255, 255, 0.06)',
          padding: '6px',
          borderRadius: 'var(--radius-md)',
          marginBottom: '16px',
          overflowX: 'auto',
          scrollbarWidth: 'none',
          WebkitOverflowScrolling: 'touch'
        }}>
          {portals.map((p) => {
            const isSel = activePortal === p.id;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => {
                  setActivePortal(p.id);
                  setError('');
                }}
                style={{
                  flex: 1,
                  minWidth: '78px',
                  padding: '8px 10px',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '12px',
                  fontWeight: '800',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '4px',
                  border: 'none',
                  cursor: 'pointer',
                  background: isSel ? p.color : 'transparent',
                  color: isSel ? 'white' : '#94A3B8',
                  boxShadow: isSel ? '0 4px 12px rgba(0,0,0,0.3)' : 'none',
                  transition: 'all 0.2s'
                }}
              >
                {p.icon}
                <span>{p.label}</span>
              </button>
            );
          })}
        </div>

        {/* Login Card */}
        <div className="cb-card" style={{ padding: '32px 28px', background: '#1E293B', borderColor: '#334155', boxShadow: 'var(--shadow-lg)' }}>
          
          {/* Active Portal Badge Header */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '20px',
            paddingBottom: '14px',
            borderBottom: '1px solid #334155'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ color: currentPortalConfig.color, display: 'flex', alignItems: 'center' }}>
                {currentPortalConfig.icon}
              </span>
              <span style={{ color: 'white', fontWeight: '800', fontSize: '15px' }}>
                {currentPortalConfig.label} Sign In
              </span>
            </div>
            <span style={{
              background: 'rgba(255, 255, 255, 0.1)',
              color: currentPortalConfig.color,
              padding: '3px 8px',
              borderRadius: 'var(--radius-xs)',
              fontSize: '11px',
              fontWeight: '800'
            }}>
              {currentPortalConfig.badge}
            </span>
          </div>

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
              <FiAlertCircle size={16} style={{ flexShrink: 0 }} />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="cb-form-group">
              <label className="cb-label" style={{ color: '#E2E8F0', fontSize: '13px' }}>
                {currentPortalConfig.idLabel}
              </label>
              <div style={{ position: 'relative' }}>
                <input 
                  type="text" 
                  required
                  placeholder={currentPortalConfig.idPlaceholder}
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
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
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                <label className="cb-label" style={{ color: '#E2E8F0', fontSize: '13px', margin: 0 }}>
                  Password
                </label>
                {activePortal === 'customer' && (
                  <Link to="/forgot-password" style={{ fontSize: '12px', fontWeight: '700', color: 'var(--primary-light)' }}>
                    Forgot?
                  </Link>
                )}
              </div>

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
                    padding: '4px',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer'
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
              className="cb-btn cb-btn-lg"
              style={{
                width: '100%',
                marginTop: '10px',
                background: currentPortalConfig.color,
                color: 'white',
                fontWeight: '900',
                border: 'none',
                boxShadow: '0 4px 14px rgba(0,0,0,0.3)'
              }}
            >
              {loading ? 'Verifying Credentials...' : `Sign In to ${currentPortalConfig.label}`}
            </button>
          </form>

          {/* Registration link for Customer */}
          {activePortal === 'customer' ? (
            <div style={{ textAlign: 'center', marginTop: '22px', fontSize: '13.5px', color: '#94A3B8' }}>
              New customer on CraveBite?{' '}
              <Link to="/register" style={{ color: 'var(--primary-light)', fontWeight: '800' }}>
                Register Free Account
              </Link>
            </div>
          ) : (
            <div style={{ marginTop: '20px', padding: '12px', background: 'rgba(0,0,0,0.2)', borderRadius: 'var(--radius-sm)', border: '1px solid #334155' }}>
              <p style={{ fontSize: '12px', color: '#94A3B8', margin: 0, textAlign: 'center' }}>
                🔒 This is a restricted administrative system. Unauthorized attempts are logged.
              </p>
            </div>
          )}

        </div>

        {/* Quick Customer Website Link */}
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <Link 
            to="/home" 
            style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: '700', color: '#94A3B8' }}
          >
            Explore Public Food Menu <FiArrowRight />
          </Link>
        </div>

      </div>
    </div>
  );
}
