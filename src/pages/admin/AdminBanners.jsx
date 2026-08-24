import React, { useState } from 'react';
import { FiImage, FiPlus, FiTrash2 } from 'react-icons/fi';

export default function AdminBanners() {
  const [banners, setBanners] = useState([
    { id: 'b-1', title: '50% OFF First 3 Orders Promo', target: '/offers', image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80', status: 'Active' },
    { id: 'b-2', title: 'Weekend Gourmet Feast Deal', target: '/restaurants', image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80', status: 'Active' }
  ]);

  return (
    <div className="cb-page animate-fade-in" style={{ padding: 0 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
        <div>
          <h1 style={{ fontSize: '28px', fontWeight: '900', color: 'var(--text-main)' }}>Homepage Promo Banners</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>Manage visual promotional carousel banners displayed to customers</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
        {banners.map(b => (
          <div key={b.id} className="cb-card" style={{ overflow: 'hidden' }}>
            <div style={{ height: '180px', width: '100%' }}>
              <img src={b.image} alt={b.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div style={{ padding: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: '800', margin: 0 }}>{b.title}</h3>
                <span className="cb-badge cb-badge-success">{b.status}</span>
              </div>
              <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Target route: {b.target}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
