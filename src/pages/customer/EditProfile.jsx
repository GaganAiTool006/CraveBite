import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FiArrowLeft, FiCheck, FiUser, FiPhone, FiMail, FiImage } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';

export default function EditProfile() {
  const { currentUser, updateUserProfile } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState(currentUser?.name || '');
  const [phone, setPhone] = useState(currentUser?.phone || '');
  const [profileImage, setProfileImage] = useState(currentUser?.profileImage || '');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUserProfile({ name, phone, profileImage });
    setSavedSuccess(true);
    setTimeout(() => {
      navigate('/profile');
    }, 1000);
  };

  return (
    <div className="cb-page animate-fade-in" style={{ padding: '40px 0' }}>
      <div className="cb-container" style={{ maxWidth: '600px' }}>
        
        <Link to="/profile" style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-muted)', fontWeight: '700', fontSize: '14px', marginBottom: '20px' }}>
          <FiArrowLeft /> Back to Profile
        </Link>

        <div className="cb-card" style={{ padding: '32px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: '800', marginBottom: '24px' }}>Edit Personal Details</h2>

          {savedSuccess && (
            <div style={{ background: 'var(--success-light)', color: 'var(--success)', padding: '12px 16px', borderRadius: 'var(--radius-sm)', fontWeight: '700', fontSize: '14px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <FiCheck size={18} /> Profile details successfully updated and saved in Firestore!
            </div>
          )}

          <form onSubmit={handleSubmit}>
            
            <div className="cb-form-group">
              <label className="cb-label">Full Name</label>
              <div style={{ position: 'relative' }}>
                <input 
                  type="text" 
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="cb-input"
                />
              </div>
            </div>

            <div className="cb-form-group">
              <label className="cb-label">Email Address (Read-only)</label>
              <input 
                type="email" 
                disabled
                value={currentUser?.email || ''}
                className="cb-input"
                style={{ background: 'var(--bg-subtle)', color: 'var(--text-muted)', cursor: 'not-allowed' }}
              />
            </div>

            <div className="cb-form-group">
              <label className="cb-label">Phone Number</label>
              <input 
                type="text" 
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="cb-input"
              />
            </div>

            <div className="cb-form-group">
              <label className="cb-label">Profile Image URL</label>
              <input 
                type="url" 
                placeholder="https://..."
                value={profileImage}
                onChange={(e) => setProfileImage(e.target.value)}
                className="cb-input"
              />
            </div>

            <div style={{ display: 'flex', gap: '14px', marginTop: '32px' }}>
              <button 
                type="button" 
                onClick={() => navigate('/profile')} 
                className="cb-btn cb-btn-subtle"
                style={{ flex: 1 }}
              >
                Cancel
              </button>

              <button 
                type="submit" 
                className="cb-btn cb-btn-primary"
                style={{ flex: 1 }}
              >
                Save Changes
              </button>
            </div>

          </form>

        </div>

      </div>
    </div>
  );
}
