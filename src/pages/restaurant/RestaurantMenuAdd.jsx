import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FiArrowLeft, FiPlus, FiCheck } from 'react-icons/fi';
import { CATEGORIES } from '../../data/mockData';

export default function RestaurantMenuAdd() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    category: 'Burgers',
    price: '',
    isVeg: true,
    description: '',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&q=80'
  });
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccess(true);
    setTimeout(() => {
      navigate('/restaurant/menu');
    }, 1200);
  };

  return (
    <div className="cb-page animate-fade-in" style={{ padding: 0 }}>
      <div style={{ maxWidth: '640px' }}>
        
        <Link to="/restaurant/menu" style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-muted)', fontWeight: '700', fontSize: '14px', marginBottom: '20px' }}>
          <FiArrowLeft /> Back to Menu Catalog
        </Link>

        <div className="cb-card" style={{ padding: '32px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: '900', marginBottom: '24px' }}>Add New Dish to Menu</h2>

          {success && (
            <div style={{ background: 'var(--success-light)', color: 'var(--success)', padding: '12px 16px', borderRadius: 'var(--radius-sm)', fontWeight: '700', fontSize: '14px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <FiCheck /> Dish successfully created and published to live catalog!
            </div>
          )}

          <form onSubmit={handleSubmit}>
            
            <div className="cb-form-group">
              <label className="cb-label">Dish Name</label>
              <input 
                type="text" 
                required 
                placeholder="E.g. Smoky BBQ Bacon Cheeseburger" 
                value={formData.name} 
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                className="cb-input" 
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div className="cb-form-group">
                <label className="cb-label">Category</label>
                <select 
                  value={formData.category} 
                  onChange={e => setFormData({ ...formData, category: e.target.value })}
                  className="cb-input"
                >
                  {CATEGORIES.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                </select>
              </div>

              <div className="cb-form-group">
                <label className="cb-label">Price (₹)</label>
                <input 
                  type="number" 
                  required 
                  placeholder="299" 
                  value={formData.price} 
                  onChange={e => setFormData({ ...formData, price: e.target.value })}
                  className="cb-input" 
                />
              </div>
            </div>

            <div className="cb-form-group">
              <label className="cb-label">Food Classification</label>
              <div style={{ display: 'flex', gap: '16px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontWeight: '700', fontSize: '14px' }}>
                  <input 
                    type="radio" 
                    name="veg" 
                    checked={formData.isVeg} 
                    onChange={() => setFormData({ ...formData, isVeg: true })} 
                  /> Pure Vegetarian
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontWeight: '700', fontSize: '14px' }}>
                  <input 
                    type="radio" 
                    name="veg" 
                    checked={!formData.isVeg} 
                    onChange={() => setFormData({ ...formData, isVeg: false })} 
                  /> Non-Vegetarian
                </label>
              </div>
            </div>

            <div className="cb-form-group">
              <label className="cb-label">Image URL</label>
              <input 
                type="url" 
                required 
                value={formData.image} 
                onChange={e => setFormData({ ...formData, image: e.target.value })}
                className="cb-input" 
              />
            </div>

            <div className="cb-form-group">
              <label className="cb-label">Dish Description</label>
              <textarea 
                rows="3" 
                required 
                placeholder="Ingredients, flavors, portion size..." 
                value={formData.description} 
                onChange={e => setFormData({ ...formData, description: e.target.value })}
                className="cb-input" 
              />
            </div>

            <div style={{ display: 'flex', gap: '12px', marginTop: '28px' }}>
              <button type="button" onClick={() => navigate('/restaurant/menu')} className="cb-btn cb-btn-subtle" style={{ flex: 1 }}>
                Cancel
              </button>
              <button type="submit" className="cb-btn cb-btn-primary" style={{ flex: 1 }}>
                <FiPlus /> Save & Publish Dish
              </button>
            </div>

          </form>

        </div>

      </div>
    </div>
  );
}
