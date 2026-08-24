import React, { useState } from 'react';
import { FiShoppingBag, FiPlus, FiCheck, FiTrash2 } from 'react-icons/fi';
import { RESTAURANTS } from '../../data/mockData';

export default function AdminRestaurants() {
  const [restaurants, setRestaurants] = useState(RESTAURANTS);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newRest, setNewRest] = useState({
    name: '',
    cuisine: 'Burgers, American',
    costForTwo: 450,
    deliveryTime: '25-30 min',
    address: '',
    rating: 4.8,
    coverImage: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=1000&q=80',
    logo: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=200&q=80'
  });

  const handleAdd = (e) => {
    e.preventDefault();
    const created = {
      id: 'rest-' + Date.now(),
      slug: newRest.name.toLowerCase().replace(/\s+/g, '-'),
      ...newRest,
      cuisine: newRest.cuisine.split(',').map(s => s.trim()),
      isVeg: false,
      reviewCount: '10+',
      distance: '2.0 km',
      menu: []
    };
    setRestaurants([created, ...restaurants]);
    setShowAddModal(false);
  };

  const handleDelete = (id) => {
    if (window.confirm('Delete this restaurant partnership?')) {
      setRestaurants(prev => prev.filter(r => r.id !== id));
    }
  };

  return (
    <div className="cb-page animate-fade-in" style={{ padding: 0 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '28px', fontWeight: '900', color: 'var(--text-main)' }}>Manage Merchant Partners</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>Onboard new restaurants, approve menu listings, and manage operational status</p>
        </div>

        <button onClick={() => setShowAddModal(true)} className="cb-btn cb-btn-primary">
          <FiPlus /> Onboard New Restaurant
        </button>
      </div>

      <div className="cb-card" style={{ padding: '20px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
          <thead>
            <tr style={{ borderBottom: '1.5px solid var(--border)', color: 'var(--text-muted)' }}>
              <th style={{ padding: '12px 14px' }}>RESTAURANT</th>
              <th style={{ padding: '12px 14px' }}>CUISINES</th>
              <th style={{ padding: '12px 14px' }}>LOCATION</th>
              <th style={{ padding: '12px 14px' }}>RATING</th>
              <th style={{ padding: '12px 14px' }}>STATUS</th>
              <th style={{ padding: '12px 14px', textAlign: 'right' }}>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {restaurants.map(r => (
              <tr key={r.id} style={{ borderBottom: '1px solid var(--border)' }}>
                <td style={{ padding: '16px 14px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <img src={r.logo || r.coverImage} alt={r.name} style={{ width: '40px', height: '40px', borderRadius: '8px', objectFit: 'cover' }} />
                  <div>
                    <span style={{ fontWeight: '800', display: 'block' }}>{r.name}</span>
                    <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>ID: {r.id}</span>
                  </div>
                </td>
                <td style={{ padding: '16px 14px', color: 'var(--text-muted)' }}>{r.cuisine.join(', ')}</td>
                <td style={{ padding: '16px 14px' }}>{r.address}</td>
                <td style={{ padding: '16px 14px', fontWeight: '800' }}>★ {r.rating}</td>
                <td style={{ padding: '16px 14px' }}>
                  <span className="cb-badge cb-badge-success">● VERIFIED LIVE</span>
                </td>
                <td style={{ padding: '16px 14px', textAlign: 'right' }}>
                  <button onClick={() => handleDelete(r.id)} className="cb-btn cb-btn-outline cb-btn-sm" style={{ color: 'var(--danger)', borderColor: 'var(--danger)' }}>
                    <FiTrash2 />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px' }}>
          <form onSubmit={handleAdd} style={{ background: 'white', padding: '32px', borderRadius: 'var(--radius-md)', maxWidth: '500px', width: '100%' }}>
            <h3 style={{ fontSize: '20px', fontWeight: '900', marginBottom: '20px' }}>Onboard Partner Kitchen</h3>
            
            <div className="cb-form-group">
              <label className="cb-label">Restaurant Name</label>
              <input type="text" required value={newRest.name} onChange={e => setNewRest({ ...newRest, name: e.target.value })} className="cb-input" />
            </div>

            <div className="cb-form-group">
              <label className="cb-label">Cuisines (Comma separated)</label>
              <input type="text" required value={newRest.cuisine} onChange={e => setNewRest({ ...newRest, cuisine: e.target.value })} className="cb-input" />
            </div>

            <div className="cb-form-group">
              <label className="cb-label">Outlet Address</label>
              <input type="text" required value={newRest.address} onChange={e => setNewRest({ ...newRest, address: e.target.value })} className="cb-input" />
            </div>

            <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
              <button type="button" onClick={() => setShowAddModal(false)} className="cb-btn cb-btn-subtle" style={{ flex: 1 }}>Cancel</button>
              <button type="submit" className="cb-btn cb-btn-primary" style={{ flex: 1 }}>Approve & Onboard</button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
}
