import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiPlus, FiEdit2, FiTrash2, FiSearch, FiCheck } from 'react-icons/fi';
import { RESTAURANTS } from '../../data/mockData';

export default function RestaurantMenu() {
  const [menuItems, setMenuItems] = useState(RESTAURANTS[0].menu || []);
  const [search, setSearch] = useState('');

  const toggleStock = (id) => {
    setMenuItems(prev => prev.map(item => item.id === id ? { ...item, inStock: item.inStock === false ? true : false } : item));
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this food item from your menu?')) {
      setMenuItems(prev => prev.filter(item => item.id !== id));
    }
  };

  const filtered = menuItems.filter(i => i.name.toLowerCase().includes(search.toLowerCase()) || i.category.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="cb-page animate-fade-in" style={{ padding: 0 }}>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '28px', fontWeight: '900', color: 'var(--text-main)' }}>
            Menu Management
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>
            Manage dishes, prices, descriptions, and real-time inventory stock availability
          </p>
        </div>

        <Link to="/restaurant/menu/add" className="cb-btn cb-btn-primary">
          <FiPlus /> Add New Dish
        </Link>
      </div>

      {/* Search Bar */}
      <div style={{ marginBottom: '24px' }}>
        <input 
          type="text"
          placeholder="Filter dishes by name or category..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="cb-input"
          style={{ maxWidth: '400px' }}
        />
      </div>

      {/* Menu Table */}
      <div className="cb-card" style={{ padding: '20px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
          <thead>
            <tr style={{ borderBottom: '1.5px solid var(--border)', color: 'var(--text-muted)' }}>
              <th style={{ padding: '12px 14px' }}>DISH</th>
              <th style={{ padding: '12px 14px' }}>CATEGORY</th>
              <th style={{ padding: '12px 14px' }}>PRICE</th>
              <th style={{ padding: '12px 14px' }}>DIET</th>
              <th style={{ padding: '12px 14px' }}>STOCK STATUS</th>
              <th style={{ padding: '12px 14px', textAlign: 'right' }}>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(item => (
              <tr key={item.id} style={{ borderBottom: '1px solid var(--border)' }}>
                <td style={{ padding: '16px 14px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <img src={item.image} alt={item.name} style={{ width: '48px', height: '48px', borderRadius: '8px', objectFit: 'cover' }} />
                  <div>
                    <h4 style={{ fontSize: '15px', fontWeight: '800', margin: 0 }}>{item.name}</h4>
                    <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>★ {item.rating} ({item.reviews} reviews)</span>
                  </div>
                </td>
                <td style={{ padding: '16px 14px', fontWeight: '700' }}>{item.category}</td>
                <td style={{ padding: '16px 14px', fontWeight: '800' }}>₹{item.price}</td>
                <td style={{ padding: '16px 14px' }}>
                  <span className={`cb-badge ${item.isVeg ? 'cb-badge-success' : 'cb-badge-danger'}`} style={{ fontSize: '11px' }}>
                    {item.isVeg ? 'VEG' : 'NON-VEG'}
                  </span>
                </td>
                <td style={{ padding: '16px 14px' }}>
                  <button 
                    onClick={() => toggleStock(item.id)}
                    className={`cb-badge ${item.inStock !== false ? 'cb-badge-success' : 'cb-badge-danger'}`}
                    style={{ cursor: 'pointer', padding: '6px 12px' }}
                  >
                    {item.inStock !== false ? '● IN STOCK' : '● OUT OF STOCK'}
                  </button>
                </td>
                <td style={{ padding: '16px 14px', textAlign: 'right' }}>
                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                    <Link to={`/restaurant/menu/edit/${item.id}`} className="cb-btn cb-btn-outline cb-btn-sm" style={{ padding: '6px 10px' }}>
                      <FiEdit2 />
                    </Link>
                    <button onClick={() => handleDelete(item.id)} className="cb-btn cb-btn-outline cb-btn-sm" style={{ padding: '6px 10px', color: 'var(--danger)', borderColor: 'var(--danger)' }}>
                      <FiTrash2 />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}
