import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft, FiBell, FiShield, FiSliders, FiCheck } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';

export default function Settings() {
  const { currentUser, updateUserProfile } = useAuth();

  const [notifications, setNotifications] = useState(true);
  const [promoEmails, setPromoEmails] = useState(true);
  const [vegPreference, setVegPreference] = useState(currentUser?.preferences?.vegOnly || false);
  const [saved, setSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    updateUserProfile({
      preferences: {
        vegOnly: vegPreference,
        notifications,
        promoEmails
      }
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="cb-page animate-fade-in" style={{ padding: '40px 0' }}>
      <div className="cb-container" style={{ maxWidth: '700px' }}>
        
        <Link to="/profile" style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-muted)', fontWeight: '700', fontSize: '14px', marginBottom: '20px' }}>
          <FiArrowLeft /> Back to Profile
        </Link>

        <div className="cb-card" style={{ padding: '32px' }}>
          <h1 style={{ fontSize: '26px', fontWeight: '800', marginBottom: '8px' }}>Preferences & Settings</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '28px' }}>
            Customize your notifications, diet options, and privacy controls
          </p>

          {saved && (
            <div style={{ background: 'var(--success-light)', color: 'var(--success)', padding: '12px 16px', borderRadius: 'var(--radius-sm)', fontWeight: '700', fontSize: '14px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <FiCheck /> Settings successfully saved to your profile!
            </div>
          )}

          <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            
            {/* Dietary Preference */}
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: '800', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <FiSliders color="var(--primary)" /> Dietary & Food Filters
              </h3>
              <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', background: 'var(--bg-subtle)', borderRadius: 'var(--radius-sm)', cursor: 'pointer' }}>
                <div>
                  <span style={{ fontSize: '14px', fontWeight: '700', color: 'var(--text-main)', display: 'block' }}>Default to Pure Veg Only</span>
                  <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Automatically filter non-veg dishes from recommendations</span>
                </div>
                <input 
                  type="checkbox" 
                  checked={vegPreference} 
                  onChange={(e) => setVegPreference(e.target.checked)} 
                  style={{ width: '18px', height: '18px', accentColor: 'var(--primary)' }}
                />
              </label>
            </div>

            {/* Notification settings */}
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: '800', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <FiBell color="var(--primary)" /> Order Notifications
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', background: 'var(--bg-subtle)', borderRadius: 'var(--radius-sm)', cursor: 'pointer' }}>
                  <div>
                    <span style={{ fontSize: '14px', fontWeight: '700', color: 'var(--text-main)', display: 'block' }}>Live Order Status Updates</span>
                    <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Receive push alerts when rider picks up or arrives</span>
                  </div>
                  <input 
                    type="checkbox" 
                    checked={notifications} 
                    onChange={(e) => setNotifications(e.target.checked)} 
                    style={{ width: '18px', height: '18px', accentColor: 'var(--primary)' }}
                  />
                </label>

                <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', background: 'var(--bg-subtle)', borderRadius: 'var(--radius-sm)', cursor: 'pointer' }}>
                  <div>
                    <span style={{ fontSize: '14px', fontWeight: '700', color: 'var(--text-main)', display: 'block' }}>Voucher & Discount News</span>
                    <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Weekly weekend deals and promotional codes</span>
                  </div>
                  <input 
                    type="checkbox" 
                    checked={promoEmails} 
                    onChange={(e) => setPromoEmails(e.target.checked)} 
                    style={{ width: '18px', height: '18px', accentColor: 'var(--primary)' }}
                  />
                </label>
              </div>
            </div>

            <button type="submit" className="cb-btn cb-btn-primary" style={{ alignSelf: 'flex-start', marginTop: '8px' }}>
              Save Preferences
            </button>

          </form>

        </div>

      </div>
    </div>
  );
}
