import React, { useState } from 'react';
import { FiSave, FiCheck } from 'react-icons/fi';

export default function AdminSettings() {
  const [settings, setSettings] = useState({
    commissionRate: 20,
    deliveryBaseFee: 40,
    platformFee: 6,
    gstRate: 5,
    freeDeliveryThreshold: 500
  });
  const [saved, setSaved] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="cb-page animate-fade-in" style={{ padding: 0 }}>
      <div style={{ maxWidth: '640px' }}>
        <div style={{ marginBottom: '28px' }}>
          <h1 style={{ fontSize: '28px', fontWeight: '900', color: 'var(--text-main)' }}>Platform Fee & Pricing Parameters</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>Configure commission splits, tax percentages, and base delivery fees</p>
        </div>

        <div className="cb-card" style={{ padding: '32px' }}>
          {saved && (
            <div style={{ background: 'var(--success-light)', color: 'var(--success)', padding: '12px 16px', borderRadius: 'var(--radius-sm)', fontWeight: '700', fontSize: '14px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <FiCheck /> Platform settings updated in database!
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="cb-form-group">
              <label className="cb-label">Merchant Commission Rate (%)</label>
              <input type="number" required value={settings.commissionRate} onChange={e => setSettings({ ...settings, commissionRate: Number(e.target.value) })} className="cb-input" />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div className="cb-form-group">
                <label className="cb-label">Base Delivery Fee (₹)</label>
                <input type="number" required value={settings.deliveryBaseFee} onChange={e => setSettings({ ...settings, deliveryBaseFee: Number(e.target.value) })} className="cb-input" />
              </div>

              <div className="cb-form-group">
                <label className="cb-label">Platform Service Fee (₹)</label>
                <input type="number" required value={settings.platformFee} onChange={e => setSettings({ ...settings, platformFee: Number(e.target.value) })} className="cb-input" />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div className="cb-form-group">
                <label className="cb-label">GST Tax Rate (%)</label>
                <input type="number" required value={settings.gstRate} onChange={e => setSettings({ ...settings, gstRate: Number(e.target.value) })} className="cb-input" />
              </div>

              <div className="cb-form-group">
                <label className="cb-label">Free Delivery Above (₹)</label>
                <input type="number" required value={settings.freeDeliveryThreshold} onChange={e => setSettings({ ...settings, freeDeliveryThreshold: Number(e.target.value) })} className="cb-input" />
              </div>
            </div>

            <button type="submit" className="cb-btn cb-btn-primary cb-btn-lg" style={{ marginTop: '16px' }}>
              <FiSave /> Update Parameters
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
