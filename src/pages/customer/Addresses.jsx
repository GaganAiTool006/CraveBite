import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft, FiPlus, FiMapPin, FiTrash2, FiCheck, FiHome, FiBriefcase } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';

export default function Addresses() {
  const { currentUser, addAddress, deleteAddress, setDefaultAddress } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [newAddr, setNewAddr] = useState({ tag: 'Home', flat: '', area: '', city: 'Jaipur' });

  const addresses = currentUser?.savedAddresses || [];

  const handleAdd = (e) => {
    e.preventDefault();
    if (newAddr.flat && newAddr.area) {
      addAddress(newAddr);
      setShowModal(false);
      setNewAddr({ tag: 'Home', flat: '', area: '', city: 'Jaipur' });
    }
  };

  return (
    <div className="cb-page animate-fade-in" style={{ padding: '40px 0' }}>
      <div className="cb-container" style={{ maxWidth: '800px' }}>
        
        <Link to="/profile" style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-muted)', fontWeight: '700', fontSize: '14px', marginBottom: '20px' }}>
          <FiArrowLeft /> Back to Profile
        </Link>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
          <div>
            <h1 style={{ fontSize: '28px', fontWeight: '800', color: 'var(--text-main)' }}>Saved Delivery Addresses</h1>
            <p style={{ fontSize: '14px', color: 'var(--text-muted)' }}>Manage locations where you receive your food deliveries</p>
          </div>

          <button onClick={() => setShowModal(true)} className="cb-btn cb-btn-primary cb-btn-sm">
            <FiPlus /> Add New Address
          </button>
        </div>

        {/* Address List */}
        {addresses.length === 0 ? (
          <div className="cb-card" style={{ padding: '60px 20px', textAlign: 'center' }}>
            <div style={{ fontSize: '40px', marginBottom: '12px' }}>📍</div>
            <h3 style={{ fontSize: '18px', fontWeight: '800' }}>No addresses saved yet</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '20px' }}>
              Save your home, office, or other locations for instant checkout.
            </p>
            <button onClick={() => setShowModal(true)} className="cb-btn cb-btn-primary">
              Add First Address
            </button>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
            {addresses.map((addr) => (
              <div 
                key={addr.id}
                className="cb-card"
                style={{
                  padding: '24px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  border: addr.isDefault ? '2px solid var(--primary)' : '1px solid var(--border)'
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      {addr.tag === 'Home' ? <FiHome color="var(--primary)" size={18} /> : <FiBriefcase color="var(--accent)" size={18} />}
                      <h4 style={{ fontSize: '16px', fontWeight: '800', margin: 0 }}>{addr.tag}</h4>
                    </div>

                    {addr.isDefault ? (
                      <span className="cb-badge cb-badge-primary">DEFAULT</span>
                    ) : (
                      <button 
                        onClick={() => setDefaultAddress(addr.id)}
                        style={{ fontSize: '12px', fontWeight: '700', color: 'var(--primary)' }}
                      >
                        Set as Default
                      </button>
                    )}
                  </div>

                  <p style={{ fontSize: '14.5px', fontWeight: '700', color: 'var(--text-main)', margin: '0 0 4px 0' }}>{addr.flat}</p>
                  <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: 0 }}>{addr.area}, {addr.city}</p>
                </div>

                <div style={{ marginTop: '20px', paddingTop: '14px', borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'flex-end' }}>
                  <button 
                    onClick={() => deleteAddress(addr.id)}
                    style={{ color: 'var(--danger)', fontSize: '13px', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '4px' }}
                  >
                    <FiTrash2 /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* Add Address Modal */}
      {showModal && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '20px'
        }}>
          <form onSubmit={handleAdd} style={{
            background: 'white',
            borderRadius: 'var(--radius-md)',
            padding: '28px',
            maxWidth: '460px',
            width: '100%',
            boxShadow: 'var(--shadow-lg)'
          }}>
            <h3 style={{ fontSize: '18px', fontWeight: '800', marginBottom: '18px' }}>Add New Delivery Address</h3>

            <div className="cb-form-group">
              <label className="cb-label">Tag (e.g. Home, Work, Gym)</label>
              <select 
                value={newAddr.tag} 
                onChange={(e) => setNewAddr({ ...newAddr, tag: e.target.value })}
                className="cb-input"
              >
                <option>Home</option>
                <option>Work</option>
                <option>Other</option>
              </select>
            </div>

            <div className="cb-form-group">
              <label className="cb-label">Flat / House No. / Building</label>
              <input 
                type="text" 
                required 
                placeholder="E.g. Flat 302, Green Orchid" 
                value={newAddr.flat} 
                onChange={(e) => setNewAddr({ ...newAddr, flat: e.target.value })}
                className="cb-input" 
              />
            </div>

            <div className="cb-form-group">
              <label className="cb-label">Area / Street / Landmark</label>
              <input 
                type="text" 
                required 
                placeholder="E.g. Near Central Mall, Tonk Road" 
                value={newAddr.area} 
                onChange={(e) => setNewAddr({ ...newAddr, area: e.target.value })}
                className="cb-input" 
              />
            </div>

            <div className="cb-form-group">
              <label className="cb-label">City</label>
              <input 
                type="text" 
                value={newAddr.city} 
                onChange={(e) => setNewAddr({ ...newAddr, city: e.target.value })}
                className="cb-input" 
              />
            </div>

            <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
              <button type="button" onClick={() => setShowModal(false)} className="cb-btn cb-btn-subtle" style={{ flex: 1 }}>
                Cancel
              </button>
              <button type="submit" className="cb-btn cb-btn-primary" style={{ flex: 1 }}>
                Save Address
              </button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
}
