import React, { useState } from 'react';
import { FiCheck, FiUser, FiTruck, FiPhone, FiSave } from 'react-icons/fi';
import { DEMO_USERS } from '../../data/mockData';

export default function DeliveryProfile() {
  const [profile, setProfile] = useState({
    name: DEMO_USERS.delivery.name,
    phone: DEMO_USERS.delivery.phone,
    vehicleNumber: DEMO_USERS.delivery.vehicleNumber,
    vehicleType: DEMO_USERS.delivery.vehicleType,
    rating: DEMO_USERS.delivery.rating,
    totalDeliveries: DEMO_USERS.delivery.totalDeliveries
  });
  const [saved, setSaved] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="cb-page animate-fade-in" style={{ padding: 0 }}>
      <div style={{ maxWidth: '640px' }}>
        <div style={{ marginBottom: '24px' }}>
          <h1 style={{ fontSize: '26px', fontWeight: '900', color: 'var(--text-main)' }}>Delivery Partner Profile</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>Manage your driver contact info, vehicle registration, and fleet badge</p>
        </div>

        <div className="cb-card" style={{ padding: '32px' }}>
          {saved && (
            <div style={{ background: 'var(--success-light)', color: 'var(--success)', padding: '12px 16px', borderRadius: 'var(--radius-sm)', fontWeight: '700', fontSize: '14px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <FiCheck /> Driver profile details updated!
            </div>
          )}

          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '28px' }}>
            <img 
              src={DEMO_USERS.delivery.profileImage} 
              alt="Rider" 
              style={{ width: '70px', height: '70px', borderRadius: '50%', objectFit: 'cover' }} 
            />
            <div>
              <h2 style={{ fontSize: '20px', fontWeight: '800', margin: '0 0 4px 0' }}>{profile.name}</h2>
              <span className="cb-badge cb-badge-success">★ {profile.rating} Rating • {profile.totalDeliveries} Lifetime Trips</span>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="cb-form-group">
              <label className="cb-label">Rider Full Name</label>
              <input type="text" required value={profile.name} onChange={e => setProfile({ ...profile, name: e.target.value })} className="cb-input" />
            </div>

            <div className="cb-form-group">
              <label className="cb-label">Contact Phone</label>
              <input type="text" required value={profile.phone} onChange={e => setProfile({ ...profile, phone: e.target.value })} className="cb-input" />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div className="cb-form-group">
                <label className="cb-label">Vehicle Type</label>
                <input type="text" required value={profile.vehicleType} onChange={e => setProfile({ ...profile, vehicleType: e.target.value })} className="cb-input" />
              </div>

              <div className="cb-form-group">
                <label className="cb-label">Vehicle License Plate</label>
                <input type="text" required value={profile.vehicleNumber} onChange={e => setProfile({ ...profile, vehicleNumber: e.target.value })} className="cb-input" />
              </div>
            </div>

            <button type="submit" className="cb-btn cb-btn-primary cb-btn-lg" style={{ marginTop: '16px' }}>
              <FiSave /> Save Driver Details
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
