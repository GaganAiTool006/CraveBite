import React, { useState } from 'react';
import { FiShoppingBag, FiStar, FiClock, FiCheck, FiX } from 'react-icons/fi';
import { RESTAURANTS } from '../../data/mockData';

export default function ManagerRestaurants() {
  const [restaurants, setRestaurants] = useState(RESTAURANTS);

  const toggleAccepting = (id) => {
    setRestaurants(prev => prev.map(r => r.id === id ? { ...r, isOnline: r.isOnline === false ? true : false } : r));
  };

  return (
    <div className="cb-page animate-fade-in" style={{ padding: 0 }}>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '26px', fontWeight: '900', color: 'var(--text-main)' }}>Merchant Operations & Kitchens</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>Manage restaurant prep SLAs, online status overrides, and menu availability</p>
      </div>

      <div className="cb-card" style={{ padding: '20px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
          <thead>
            <tr style={{ borderBottom: '1.5px solid var(--border)', color: 'var(--text-muted)' }}>
              <th style={{ padding: '12px 14px' }}>RESTAURANT OUTLET</th>
              <th style={{ padding: '12px 14px' }}>CUISINES</th>
              <th style={{ padding: '12px 14px' }}>RATING</th>
              <th style={{ padding: '12px 14px' }}>AVG PREP TIME</th>
              <th style={{ padding: '12px 14px' }}>OUTLET STATUS</th>
              <th style={{ padding: '12px 14px', textAlign: 'right' }}>MANAGER OVERRIDE</th>
            </tr>
          </thead>
          <tbody>
            {restaurants.map(r => (
              <tr key={r.id} style={{ borderBottom: '1px solid var(--border)' }}>
                <td style={{ padding: '16px 14px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <img src={r.logo || r.coverImage} alt={r.name} style={{ width: '40px', height: '40px', borderRadius: '8px', objectFit: 'cover' }} />
                  <div>
                    <span style={{ fontWeight: '800', display: 'block' }}>{r.name}</span>
                    <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{r.address}</span>
                  </div>
                </td>
                <td style={{ padding: '16px 14px', color: 'var(--text-muted)' }}>{r.cuisine.join(', ')}</td>
                <td style={{ padding: '16px 14px', fontWeight: '800' }}>★ {r.rating}</td>
                <td style={{ padding: '16px 14px', fontWeight: '700' }}>{r.deliveryTime}</td>
                <td style={{ padding: '16px 14px' }}>
                  <span className={`cb-badge ${r.isOnline !== false ? 'cb-badge-success' : 'cb-badge-danger'}`}>
                    {r.isOnline !== false ? '● ACCEPTING ORDERS' : '● PAUSED'}
                  </span>
                </td>
                <td style={{ padding: '16px 14px', textAlign: 'right' }}>
                  <button 
                    onClick={() => toggleAccepting(r.id)}
                    className="cb-btn cb-btn-outline cb-btn-sm"
                    style={{ fontSize: '12px' }}
                  >
                    {r.isOnline !== false ? 'Pause Kitchen' : 'Resume Kitchen'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
