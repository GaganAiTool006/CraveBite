import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function DeliveryProtectedRoute({ children }) {
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
        color: 'white',
        gap: '16px'
      }}>
        <div style={{
          width: '52px',
          height: '52px',
          background: 'var(--success)',
          borderRadius: '16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontWeight: '900',
          fontSize: '24px',
          boxShadow: '0 8px 24px rgba(16, 185, 129, 0.4)',
          animation: 'pulse 1.5s infinite'
        }}>
          CB
        </div>
        <div style={{ textAlign: 'center' }}>
          <h3 style={{ fontSize: '18px', fontWeight: '800', margin: '0 0 4px 0' }}>
            CraveBite Rider Fleet
          </h3>
          <p style={{ fontSize: '13px', color: '#94A3B8', margin: 0 }}>
            Verifying rider credentials...
          </p>
        </div>
      </div>
    );
  }

  if (!currentUser) {
    return <Navigate to="/delivery/login" state={{ from: location }} replace />;
  }

  if (currentUser.role !== 'delivery' && currentUser.role !== 'admin' && currentUser.role !== 'manager') {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#0F172A',
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
          <h2 style={{ fontSize: '20px', fontWeight: '900', color: 'white', marginBottom: '8px' }}>Rider Access Required</h2>
          <p style={{ fontSize: '14px', color: '#94A3B8', marginBottom: '24px' }}>
            You need a Delivery Partner account to access the rider earnings and dispatch console. Your current role is ({currentUser.role}).
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <button 
              onClick={() => window.location.href = '/delivery/login'}
              className="cb-btn cb-btn-primary"
              style={{ background: 'var(--success)', width: '100%' }}
            >
              Sign In as Delivery Partner
            </button>
            <button 
              onClick={() => window.location.href = '/home'}
              className="cb-btn cb-btn-outline"
              style={{ width: '100%', borderColor: '#334155', color: '#94A3B8' }}
            >
              Return to Customer Website
            </button>
          </div>
        </div>
      </div>
    );
  }

  return children;
}
