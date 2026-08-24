import React, { useState } from 'react';
import { X, Smartphone, ArrowRight } from 'lucide-react';

export default function AuthModal({ isOpen, onClose, onLogin }) {
  const [mobile, setMobile] = useState('');
  const [name, setName] = useState('');
  const [step, setStep] = useState(1);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (step === 1) {
      if (mobile.length >= 10) setStep(2);
    } else {
      onLogin({ name: name || 'Swiggy Gourmet', mobile });
      onClose();
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-card" style={{ maxWidth: '420px', padding: '32px' }}>
        <button className="modal-close-btn" onClick={onClose}>
          <X size={18} />
        </button>

        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <div style={{ width: '54px', height: '54px', background: '#fff2e6', borderRadius: '50%', color: '#FC8019', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px auto' }}>
            <Smartphone size={28} />
          </div>
          <h3 style={{ fontSize: '22px', fontWeight: '800' }}>
            {step === 1 ? 'Login or Sign Up' : 'Enter Your Name'}
          </h3>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '4px' }}>
            {step === 1 ? 'Get access to your orders, offers & wishlist' : `OTP verified for +91 ${mobile}`}
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          {step === 1 ? (
            <div style={{ marginBottom: '20px' }}>
              <label style={{ fontSize: '12px', fontWeight: '700', color: 'var(--text-muted)' }}>PHONE NUMBER</label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', border: '1px solid #ccc', padding: '10px 14px', borderRadius: '8px', marginTop: '6px' }}>
                <span style={{ fontSize: '14px', fontWeight: '700', color: '#555' }}>+91</span>
                <input
                  type="tel"
                  placeholder="Enter 10-digit mobile number"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  maxLength={10}
                  required
                  style={{ border: 'none', outline: 'none', width: '100%', fontSize: '15px', fontWeight: '600' }}
                />
              </div>
            </div>
          ) : (
            <div style={{ marginBottom: '20px' }}>
              <label style={{ fontSize: '12px', fontWeight: '700', color: 'var(--text-muted)' }}>FULL NAME</label>
              <input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                style={{ width: '100%', padding: '12px 14px', border: '1px solid #ccc', borderRadius: '8px', marginTop: '6px', fontSize: '15px' }}
              />
            </div>
          )}

          <button
            type="submit"
            style={{
              width: '100%',
              background: '#FC8019',
              color: 'white',
              fontFamily: 'var(--font-heading)',
              fontWeight: '800',
              padding: '14px',
              borderRadius: '8px',
              fontSize: '15px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              boxShadow: 'var(--shadow-orange)'
            }}
          >
            <span>{step === 1 ? 'CONTINUE' : 'START ORDERING'}</span>
            <ArrowRight size={18} />
          </button>
        </form>
      </div>
    </div>
  );
}
