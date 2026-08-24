import React, { useState } from 'react';
import { FiPercent, FiPlus, FiTag } from 'react-icons/fi';
import { COUPONS } from '../../data/mockData';

export default function ManagerCoupons() {
  const [coupons, setCoupons] = useState(COUPONS);
  const [showAdd, setShowAdd] = useState(false);
  const [newCp, setNewCp] = useState({ code: '', title: '', minOrder: 199, discountPercent: 20, description: '' });

  const handleAdd = (e) => {
    e.preventDefault();
    setCoupons([{ ...newCp, code: newCp.code.toUpperCase() }, ...coupons]);
    setShowAdd(false);
  };

  return (
    <div className="cb-page animate-fade-in" style={{ padding: 0 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h1 style={{ fontSize: '26px', fontWeight: '900', color: 'var(--text-main)' }}>Branch Promo & Voucher Campaigns</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>Monitor live coupon redemptions and configure limited-time flash discount codes</p>
        </div>

        <button onClick={() => setShowAdd(true)} className="cb-btn cb-btn-primary">
          <FiPlus /> New Campaign Code
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '18px' }}>
        {coupons.map(c => (
          <div key={c.code} className="cb-card" style={{ padding: '20px', border: '1.5px dashed var(--primary)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span className="cb-badge cb-badge-primary" style={{ fontSize: '12.5px' }}>{c.code}</span>
              <span style={{ fontSize: '12px', fontWeight: '700', color: 'var(--text-muted)' }}>Min. ₹{c.minOrder}</span>
            </div>
            <h3 style={{ fontSize: '16px', fontWeight: '800', margin: '4px 0 2px 0' }}>{c.title}</h3>
            <p style={{ fontSize: '12.5px', color: 'var(--text-muted)', margin: 0 }}>{c.description}</p>
          </div>
        ))}
      </div>

      {showAdd && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px' }}>
          <form onSubmit={handleAdd} style={{ background: 'white', padding: '28px', borderRadius: 'var(--radius-md)', maxWidth: '440px', width: '100%' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '900', marginBottom: '16px' }}>Create Branch Promo Code</h3>
            <div className="cb-form-group">
              <label className="cb-label">Code</label>
              <input type="text" required value={newCp.code} onChange={e => setNewCp({ ...newCp, code: e.target.value })} className="cb-input" />
            </div>
            <div className="cb-form-group">
              <label className="cb-label">Title</label>
              <input type="text" required value={newCp.title} onChange={e => setNewCp({ ...newCp, title: e.target.value })} className="cb-input" />
            </div>
            <div style={{ display: 'flex', gap: '12px', marginTop: '20px' }}>
              <button type="button" onClick={() => setShowAdd(false)} className="cb-btn cb-btn-subtle" style={{ flex: 1 }}>Cancel</button>
              <button type="submit" className="cb-btn cb-btn-primary" style={{ flex: 1 }}>Publish Code</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
