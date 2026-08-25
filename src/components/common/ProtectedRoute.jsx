import React from 'react';
import { Navigate, useLocation, Link } from 'react-router-dom';
import { FiShield, FiArrowLeft, FiLock } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';

export default function ProtectedRoute({ children, allowedRoles = [] }) {
  const { currentUser, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#0F172A',
        gap: '16px',
        color: 'white'
      }}>
        <div style={{
          width: '52px',
          height: '52px',
          background: 'linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%)',
          borderRadius: '16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontWeight: '900',
          fontSize: '24px',
          boxShadow: '0 8px 24px rgba(235, 87, 87, 0.4)',
          animation: 'pulse 1.5s infinite'
        }}>
          CB
        </div>
        <div style={{ textAlign: 'center' }}>
          <h3 style={{ fontSize: '18px', fontWeight: '800', margin: '0 0 4px 0' }}>
            Crave<span style={{ color: 'var(--accent)' }}>Bite</span>
          </h3>
          <p style={{ fontSize: '13px', color: '#94A3B8', margin: 0 }}>
            Verifying security session...
          </p>
        </div>
      </div>
    );
  }

  // Determine portal from path if role required
  const primaryRole = allowedRoles[0] || 'customer';

  if (!currentUser) {
    return <Navigate to={`/login?portal=${primaryRole}`} state={{ from: location }} replace />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(currentUser.role)) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#0B0F19',
        padding: '20px'
      }}>
        <div style={{
          maxWidth: '460px',
          width: '100%',
          background: '#1E293B',
          borderRadius: '16px',
          padding: '36px 28px',
          textAlign: 'center',
          border: '1px solid #334155',
          boxShadow: '0 20px 40px rgba(0,0,0,0.5)'
        }}>
          <div style={{
            width: '56px',
            height: '56px',
            borderRadius: '16px',
            background: 'rgba(239, 68, 68, 0.15)',
            color: '#EF4444',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 18px auto',
            fontSize: '24px'
          }}>
            <FiLock size={26} />
          </div>

          <span style={{
            background: 'rgba(239, 68, 68, 0.2)',
            color: '#F87171',
            padding: '4px 10px',
            borderRadius: 'var(--radius-full)',
            fontSize: '11.5px',
            fontWeight: '800',
            textTransform: 'uppercase',
            letterSpacing: '0.5px'
          }}>
            ACCESS RESTRICTED
          </span>

          <h2 style={{ fontSize: '22px', fontWeight: '900', color: 'white', margin: '12px 0 8px 0' }}>
            {primaryRole.charAt(0).toUpperCase() + primaryRole.slice(1)} Credentials Required
          </h2>

          <p style={{ fontSize: '13.5px', color: '#94A3B8', lineHeight: 1.5, marginBottom: '24px' }}>
            This internal portal requires authorized <strong>{allowedRoles.join(' / ')}</strong> credentials. Your current session is signed in as <strong>{currentUser.role}</strong> ({currentUser.email || currentUser.name}).
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <Link 
              to={`/login?portal=${primaryRole}`}
              className="cb-btn cb-btn-primary"
              style={{ width: '100%', justifyContent: 'center' }}
            >
              Sign In with {primaryRole.charAt(0).toUpperCase() + primaryRole.slice(1)} Account
            </Link>

            <Link 
              to="/home"
              className="cb-btn cb-btn-outline"
              style={{ width: '100%', justifyContent: 'center', borderColor: '#334155', color: '#94A3B8' }}
            >
              <FiArrowLeft size={14} /> Return to Customer Website
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return children;
}
