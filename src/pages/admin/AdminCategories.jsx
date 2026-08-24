import React, { useState } from 'react';
import { FiGrid, FiPlus, FiTrash2 } from 'react-icons/fi';
import { CATEGORIES } from '../../data/mockData';

export default function AdminCategories() {
  const [categories, setCategories] = useState(CATEGORIES);
  const [newCat, setNewCat] = useState({ name: '', emoji: '🍲', count: 10, image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&q=80' });
  const [showAdd, setShowAdd] = useState(false);

  const handleAdd = (e) => {
    e.preventDefault();
    setCategories([...categories, { id: 'cat-' + Date.now(), ...newCat }]);
    setShowAdd(false);
  };

  return (
    <div className="cb-page animate-fade-in" style={{ padding: 0 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '28px', fontWeight: '900', color: 'var(--text-main)' }}>Food Categories Master</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>Cuisines and tags displayed on the customer discovery homepage</p>
        </div>

        <button onClick={() => setShowAdd(true)} className="cb-btn cb-btn-primary">
          <FiPlus /> Add Food Category
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' }}>
        {categories.map(c => (
          <div key={c.id} className="cb-card" style={{ padding: '20px', textAlign: 'center', position: 'relative' }}>
            <div style={{ width: '70px', height: '70px', borderRadius: '50%', overflow: 'hidden', margin: '0 auto 12px auto' }}>
              <img src={c.image} alt={c.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <h3 style={{ fontSize: '17px', fontWeight: '800', margin: '0 0 4px 0' }}>{c.emoji} {c.name}</h3>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: 0 }}>{c.count}+ kitchens linked</p>
          </div>
        ))}
      </div>

      {showAdd && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px' }}>
          <form onSubmit={handleAdd} style={{ background: 'white', padding: '32px', borderRadius: 'var(--radius-md)', maxWidth: '420px', width: '100%' }}>
            <h3 style={{ fontSize: '20px', fontWeight: '900', marginBottom: '20px' }}>Add New Cuisine</h3>
            <div className="cb-form-group">
              <label className="cb-label">Category Name</label>
              <input type="text" required value={newCat.name} onChange={e => setNewCat({ ...newCat, name: e.target.value })} className="cb-input" />
            </div>
            <div className="cb-form-group">
              <label className="cb-label">Emoji Icon</label>
              <input type="text" required value={newCat.emoji} onChange={e => setNewCat({ ...newCat, emoji: e.target.value })} className="cb-input" />
            </div>
            <div style={{ display: 'flex', gap: '12px', marginTop: '20px' }}>
              <button type="button" onClick={() => setShowAdd(false)} className="cb-btn cb-btn-subtle" style={{ flex: 1 }}>Cancel</button>
              <button type="submit" className="cb-btn cb-btn-primary" style={{ flex: 1 }}>Save Category</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
