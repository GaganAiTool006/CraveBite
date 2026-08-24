import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { FiArrowLeft, FiCheck } from 'react-icons/fi';
import { RESTAURANTS, CATEGORIES } from '../../data/mockData';

export default function RestaurantMenuEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const currentDish = RESTAURANTS[0].menu.find(d => d.id === id) || RESTAURANTS[0].menu[0];

  const [formData, setFormData] = useState({
    name: currentDish.name,
    category: currentDish.category,
    price: currentDish.price,
    isVeg: currentDish.isVeg,
    description: currentDish.description,
    image: currentDish.image
  });
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccess(true);
    setTimeout(() => {
      navigate('/restaurant/menu');
    }, 1000);
  };

  return (
    <div className="cb-page animate-fade-in" style={{ padding: 0 }}>
      <div style={{ maxWidth: '640px' }}>
        
        <Link to="/restaurant/menu" style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-muted)', fontWeight: '700', fontSize: '14px', marginBottom: '20px' }}>
          <FiArrowLeft /> Back to Menu
        </Link>

        <div className="cb-card" style={{ padding: '32px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: '900', marginBottom: '24px' }}>Edit Dish #{id}</h2>

          {success && (
            <div style={{ background: 'var(--success-light)', color: 'var(--success)', padding: '12px 16px', borderRadius: 'var(--radius-sm)', fontWeight: '700', fontSize: '14px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <FiCheck /> Dish details updated!
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="cb-form-group">
              <label className="cb-label">Dish Name</label>
              <input type="text" required value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className="cb-input" />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div className="cb-form-group">
                <label className="cb-label">Category</label>
                <select value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })} className="cb-input">
                  {CATEGORIES.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                </select>
              </div>

              <div className="cb-form-group">
                <label className="cb-label">Price (₹)</label>
                <input type="number" required value={formData.price} onChange={e => setFormData({ ...formData, price: e.target.value })} className="cb-input" />
              </div>
            </div>

            <div className="cb-form-group">
              <label className="cb-label">Image URL</label>
              <input type="url" required value={formData.image} onChange={e => setFormData({ ...formData, image: e.target.value })} className="cb-input" />
            </div>

            <div className="cb-form-group">
              <label className="cb-label">Description</label>
              <textarea rows="3" value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} className="cb-input" />
            </div>

            <div style={{ display: 'flex', gap: '12px', marginTop: '28px' }}>
              <button type="button" onClick={() => navigate('/restaurant/menu')} className="cb-btn cb-btn-subtle" style={{ flex: 1 }}>
                Cancel
              </button>
              <button type="submit" className="cb-btn cb-btn-primary" style={{ flex: 1 }}>
                Save Changes
              </button>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
}
