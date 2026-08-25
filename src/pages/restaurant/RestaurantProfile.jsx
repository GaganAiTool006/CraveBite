import React, { useState } from 'react';
import { FiCheck, FiSave } from 'react-icons/fi';
import { RESTAURANTS } from '../../data/mockData';

export default function RestaurantProfile() {
  const [profile, setProfile] = useState({
    name: RESTAURANTS[0].name,
    address: RESTAURANTS[0].address,
    openingHours: RESTAURANTS[0].openingHours,
    costForTwo: RESTAURANTS[0].costForTwo,
    description: RESTAURANTS[0].description,
    coverImage: RESTAURANTS[0].coverImage
  });
  const [saved, setSaved] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="cb-page animate-fade-in" style={{ padding: 0 }}>
      <div style={{ maxWidth: '700px' }}>
        
        <div style={{ marginBottom: '28px' }}>
          <h1 style={{ fontSize: '28px', fontWeight: '900', color: 'var(--text-main)' }}>Restaurant Profile & Outlet Info</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>Update public operating hours, address, kitchen bio, and banner photo</p>
        </div>

        <div className="cb-card" style={{ padding: '32px' }}>
          {saved && (
            <div style={{ background: 'var(--success-light)', color: 'var(--success)', padding: '12px 16px', borderRadius: 'var(--radius-sm)', fontWeight: '700', fontSize: '14px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <FiCheck /> Restaurant profile saved to live customer view!
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="cb-form-group">
              <label className="cb-label">Restaurant Name</label>
              <input type="text" required value={profile.name} onChange={e => setProfile({ ...profile, name: e.target.value })} className="cb-input" />
            </div>

            <div className="cb-form-group">
              <label className="cb-label">Outlet Address</label>
              <input type="text" required value={profile.address} onChange={e => setProfile({ ...profile, address: e.target.value })} className="cb-input" />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div className="cb-form-group">
                <label className="cb-label">Operating Hours</label>
                <input type="text" required value={profile.openingHours} onChange={e => setProfile({ ...profile, openingHours: e.target.value })} className="cb-input" />
              </div>

              <div className="cb-form-group">
                <label className="cb-label">Approx Cost For Two (₹)</label>
                <input type="number" required value={profile.costForTwo} onChange={e => setProfile({ ...profile, costForTwo: e.target.value })} className="cb-input" />
              </div>
            </div>

            <div className="cb-form-group">
              <label className="cb-label">Cover Banner URL</label>
              <input type="url" required value={profile.coverImage} onChange={e => setProfile({ ...profile, coverImage: e.target.value })} className="cb-input" />
            </div>

            <div className="cb-form-group">
              <label className="cb-label">Short Kitchen Description</label>
              <textarea rows="3" value={profile.description} onChange={e => setProfile({ ...profile, description: e.target.value })} className="cb-input" />
            </div>

            <button type="submit" className="cb-btn cb-btn-primary cb-btn-lg" style={{ marginTop: '16px' }}>
              <FiSave /> Save Outlet Profile
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}
