import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
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
        background: '#F8FAFC',
        gap: '16px'
      }}>
        <div style={{
          width: '52px',
          height: '52px',
          background: 'linear-gradient(135deg, var(--primary) 0%, #7C3AED 100%)',
          borderRadius: '16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontWeight: '900',
          fontSize: '24px',
          boxShadow: 'var(--shadow-primary)',
          animation: 'pulse 1.5s infinite'
        }}>
          CB
        </div>
        <div style={{ textAlign: 'center' }}>
          <h3 style={{ fontSize: '18px', fontWeight: '800', color: 'var(--text-main)', margin: '0 0 4px 0' }}>
            Crave<span style={{ color: 'var(--accent)' }}>Bite</span>
          </h3>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: 0 }}>
            Verifying secure session...
          </p>
        </div>
      </div>
    );
  }

  if (!currentUser) {
    // Preserve intended URL so user is redirected back after logging in
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(currentUser.role)) {
    // Redirect to correct dashboard based on actual role
    if (currentUser.role === 'admin') return <Navigate to="/admin/dashboard" replace />;
    if (currentUser.role === 'restaurant') return <Navigate to="/restaurant/dashboard" replace />;
    if (currentUser.role === 'delivery') return <Navigate to="/delivery/dashboard" replace />;
    return <Navigate to="/home" replace />;
  }

  return children;
}
