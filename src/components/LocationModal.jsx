import React from 'react';
import { X, MapPin, Navigation } from 'lucide-react';
import { LOCATIONS } from '../data/mockData';

export default function LocationModal({ isOpen, onClose, activeLocation, onSelectLocation }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-card" style={{ maxWidth: '500px', padding: '24px' }}>
        <button className="modal-close-btn" onClick={onClose}>
          <X size={18} />
        </button>

        <h3 style={{ fontSize: '20px', fontWeight: '800', marginBottom: '16px' }}>Select Delivery Location</h3>

        <button
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '14px',
            border: '1px solid #FC8019',
            borderRadius: '12px',
            background: '#fff2e6',
            color: '#FC8019',
            fontWeight: '800',
            fontSize: '14px',
            marginBottom: '20px'
          }}
          onClick={() => {
            onSelectLocation(LOCATIONS[0]);
            onClose();
          }}
        >
          <Navigation size={18} color="#FC8019" />
          <span>Use Current GPS Location (Koramangala)</span>
        </button>

        <div style={{ fontSize: '12px', fontWeight: '700', color: 'var(--text-muted)', marginBottom: '12px' }}>
          SAVED LOCATIONS
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {LOCATIONS.map((loc) => {
            const isSelected = activeLocation?.id === loc.id;
            return (
              <div
                key={loc.id}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '12px',
                  padding: '12px 14px',
                  borderRadius: '10px',
                  border: isSelected ? '1.5px solid #FC8019' : '1px solid #eee',
                  background: isSelected ? '#fff8f2' : 'white',
                  cursor: 'pointer'
                }}
                onClick={() => {
                  onSelectLocation(loc);
                  onClose();
                }}
              >
                <MapPin size={18} color="#FC8019" style={{ marginTop: '2px' }} />
                <div>
                  <div style={{ fontSize: '15px', fontWeight: '700', color: 'var(--text-dark)' }}>{loc.name}</div>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{loc.fullAddress}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
