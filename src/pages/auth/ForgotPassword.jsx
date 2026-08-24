import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiMail, FiArrowLeft, FiCheck } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';

export default function ForgotPassword() {
  const { resetPassword } = useAuth();
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await resetPassword(email);
    setLoading(false);
    setMessage(res.message);
  };

  return (
    <div className="cb-page animate-fade-in" style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 20px',
      background: 'linear-gradient(135deg, #EEF2FF 0%, #FAF5FF 100%)'
    }}>
      <div style={{ maxWidth: '420px', width: '100%' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: '800', color: 'var(--text-main)' }}>
            Reset Password
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginTop: '4px' }}>
            Enter your registered email to receive recovery instructions
          </p>
        </div>

        <div className="cb-card" style={{ padding: '32px' }}>
          {message ? (
            <div style={{ textAlign: 'center' }}>
              <div style={{ width: '56px', height: '56px', background: 'var(--success-light)', color: 'var(--success)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px auto' }}>
                <FiCheck size={28} />
              </div>
              <p style={{ fontSize: '14.5px', fontWeight: '700', color: 'var(--text-main)', marginBottom: '24px' }}>
                {message}
              </p>
              <Link to="/login" className="cb-btn cb-btn-primary" style={{ width: '100%' }}>
                Back to Sign In
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="cb-form-group">
                <label className="cb-label">Registered Email Address</label>
                <input 
                  type="email" 
                  required
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="cb-input"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="cb-btn cb-btn-primary cb-btn-lg"
                style={{ width: '100%', marginTop: '12px' }}
              >
                {loading ? 'Sending link...' : 'Send Recovery Email'}
              </button>

              <div style={{ textAlign: 'center', marginTop: '20px' }}>
                <Link to="/login" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '13.5px', fontWeight: '700', color: 'var(--primary)' }}>
                  <FiArrowLeft /> Back to Login
                </Link>
              </div>
            </form>
          )}
        </div>

      </div>
    </div>
  );
}
