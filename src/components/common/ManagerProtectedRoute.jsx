import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function ManagerProtectedRoute({ children }) {
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
        background: '#0B0F19',
        color: 'white',
        gap: '16px'
      }}>
        <div style={{
          width: '52px',
          height: '52px',
          background: 'linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)',
          borderRadius: '16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontWeight: '900',
          fontSize: '24px',
          boxShadow: '0 8px 24px rgba(79, 70, 229, 0.4)',
          animation: 'pulse 1.5s infinite'
        }}>
          CB
        </div>
        <div style={{ textAlign: 'center' }}>
          <h3 style={{ fontSize: '18px', fontWeight: '800', margin: '0 0 4px 0' }}>
            Manager Operations
          </h3>
          <p style={{ fontSize: '13px', color: '#94A3B8', margin: 0 }}>
            Verifying manager security credentials...
          </p>
        </div>
      </div>
    );
  }

  if (!currentUser) {
    return <Navigate to="/manager/login" state={{ from: location }} replace />;
  }

  if (currentUser.role !== 'manager' && currentUser.role !== 'admin') {
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
          maxWidth: '440px',
          width: '100%',
          background: '#1E293B',
          borderRadius: '16px',
          padding: '32px',
          textAlign: 'center',
          border: '1px solid #334155'
        }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(239, 68, 68, 0.2)', color: '#EF4444', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px auto', fontSize: '24px', fontWeight: '900' }}>
            ✕
          </div>
          <h2 style={{ fontSize: '20px', fontWeight: '900', color: 'white', marginBottom: '8px' }}>Access Denied</h2>
          <p style={{ fontSize: '14px', color: '#94A3B8', marginBottom: '24px' }}>
            Manager account credentials required to access this portal. Your current role is ({currentUser.role}).
          </p>
          <button 
            onClick={() => window.location.href = '/home'}
            className="cb-btn cb-btn-primary"
            style={{ width: '100%' }}
          >
            Return to Customer Website
          </button>
        </div>
      </div>
    );
  }

  return children;
}
