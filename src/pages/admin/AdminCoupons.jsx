import React, { useState } from 'react';
import { FiPercent, FiPlus, FiTrash2 } from 'react-icons/fi';
import { COUPONS } from '../../data/mockData';

export default function AdminCoupons() {
  const [coupons, setCoupons] = useState(COUPONS);
  const [showAdd, setShowAdd] = useState(false);
  const [newCoupon, setNewCoupon] = useState({ code: '', title: '', minOrder: 199, discountPercent: 20, maxDiscount: 100, description: '' });

  const handleAdd = (e) => {
    e.preventDefault();
    setCoupons([{ ...newCoupon, code: newCoupon.code.toUpperCase() }, ...coupons]);
    setShowAdd(false);
    setNewCoupon({ code: '', title: '', minOrder: 199, discountPercent: 20, maxDiscount: 100, description: '' });
  };

  const handleDelete = (code) => {
    setCoupons(prev => prev.filter(c => c.code !== code));
  };

  return (
    <div className="cb-page animate-fade-in" style={{ padding: 0 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '28px', fontWeight: '900', color: 'var(--text-main)' }}>Platform Coupons & Promo Vouchers</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>Create and manage discount codes, minimum order requirements, and user limits</p>
        </div>

        <button onClick={() => setShowAdd(true)} className="cb-btn cb-btn-primary">
          <FiPlus /> Create Coupon Code
        </button>
      </div>

      <div className="cb-card" style={{ padding: '20px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
          <thead>
            <tr style={{ borderBottom: '1.5px solid var(--border)', color: 'var(--text-muted)' }}>
              <th style={{ padding: '12px 14px' }}>CODE</th>
              <th style={{ padding: '12px 14px' }}>TITLE</th>
              <th style={{ padding: '12px 14px' }}>DISCOUNT</th>
              <th style={{ padding: '12px 14px' }}>MIN ORDER</th>
              <th style={{ padding: '12px 14px' }}>DESCRIPTION</th>
              <th style={{ padding: '12px 14px', textAlign: 'right' }}>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {coupons.map(c => (
              <tr key={c.code} style={{ borderBottom: '1px solid var(--border)' }}>
                <td style={{ padding: '16px 14px' }}>
                  <span className="cb-badge cb-badge-primary" style={{ fontSize: '13px', padding: '4px 10px' }}>{c.code}</span>
                </td>
                <td style={{ padding: '16px 14px', fontWeight: '700' }}>{c.title}</td>
                <td style={{ padding: '16px 14px', fontWeight: '800', color: 'var(--accent)' }}>
                  {c.discountPercent ? `${c.discountPercent}% OFF (Max ₹${c.maxDiscount})` : c.flatDiscount ? `₹${c.flatDiscount} Flat OFF` : 'Free Delivery'}
                </td>
                <td style={{ padding: '16px 14px' }}>₹{c.minOrder}</td>
                <td style={{ padding: '16px 14px', color: 'var(--text-muted)', fontSize: '13px' }}>{c.description}</td>
                <td style={{ padding: '16px 14px', textAlign: 'right' }}>
                  <button onClick={() => handleDelete(c.code)} className="cb-btn cb-btn-outline cb-btn-sm" style={{ color: 'var(--danger)', borderColor: 'var(--danger)' }}>
                    <FiTrash2 />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Modal */}
      {showAdd && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px' }}>
          <form onSubmit={handleAdd} style={{ background: 'white', padding: '32px', borderRadius: 'var(--radius-md)', maxWidth: '460px', width: '100%' }}>
            <h3 style={{ fontSize: '20px', fontWeight: '900', marginBottom: '20px' }}>Create Platform Coupon</h3>
            
            <div className="cb-form-group">
              <label className="cb-label">Coupon Code</label>
              <input type="text" required placeholder="E.g. SUPER100" value={newCoupon.code} onChange={e => setNewCoupon({ ...newCoupon, code: e.target.value })} className="cb-input" />
            </div>

            <div className="cb-form-group">
              <label className="cb-label">Offer Title</label>
              <input type="text" required placeholder="E.g. 50% OFF up to ₹100" value={newCoupon.title} onChange={e => setNewCoupon({ ...newCoupon, title: e.target.value })} className="cb-input" />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
              <div className="cb-form-group">
                <label className="cb-label">Discount %</label>
                <input type="number" value={newCoupon.discountPercent} onChange={e => setNewCoupon({ ...newCoupon, discountPercent: Number(e.target.value) })} className="cb-input" />
              </div>
              <div className="cb-form-group">
                <label className="cb-label">Min. Order (₹)</label>
                <input type="number" value={newCoupon.minOrder} onChange={e => setNewCoupon({ ...newCoupon, minOrder: Number(e.target.value) })} className="cb-input" />
              </div>
            </div>

            <div className="cb-form-group">
              <label className="cb-label">Description</label>
              <input type="text" placeholder="Valid on all partner restaurants..." value={newCoupon.description} onChange={e => setNewCoupon({ ...newCoupon, description: e.target.value })} className="cb-input" />
            </div>

            <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
              <button type="button" onClick={() => setShowAdd(false)} className="cb-btn cb-btn-subtle" style={{ flex: 1 }}>Cancel</button>
              <button type="submit" className="cb-btn cb-btn-primary" style={{ flex: 1 }}>Save Voucher</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
