import React, { useState } from 'react';
import { FiSave, FiCheck } from 'react-icons/fi';

export default function ManagerSettings() {
  const [saved, setSaved] = useState(false);
  const [settings, setSettings] = useState({
    dispatchRadiusKm: 8,
    kitchenPrepSlaMins: 15,
    maxRiderOrders: 3,
    autoAssignEnabled: true,
    branchName: 'Jaipur Central Hub - Sector 45'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="cb-page animate-fade-in" style={{ padding: 0 }}>
      <div style={{ maxWidth: '600px' }}>
        <div style={{ marginBottom: '24px' }}>
          <h1 style={{ fontSize: '26px', fontWeight: '900', color: 'var(--text-main)' }}>Branch Operational Parameters</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>Configure regional dispatch radius, automated rider assignments, and kitchen SLAs</p>
        </div>

        <div className="cb-card" style={{ padding: '28px' }}>
          {saved && (
            <div style={{ background: 'var(--success-light)', color: 'var(--success)', padding: '12px 14px', borderRadius: 'var(--radius-sm)', fontWeight: '700', fontSize: '14px', marginBottom: '18px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <FiCheck /> Branch parameters successfully updated!
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="cb-form-group">
              <label className="cb-label">Branch Hub Designation</label>
              <input type="text" value={settings.branchName} onChange={e => setSettings({ ...settings, branchName: e.target.value })} className="cb-input" />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div className="cb-form-group">
                <label className="cb-label">Dispatch Radius (KM)</label>
                <input type="number" value={settings.dispatchRadiusKm} onChange={e => setSettings({ ...settings, dispatchRadiusKm: Number(e.target.value) })} className="cb-input" />
              </div>

              <div className="cb-form-group">
                <label className="cb-label">Kitchen SLA (Mins)</label>
                <input type="number" value={settings.kitchenPrepSlaMins} onChange={e => setSettings({ ...settings, kitchenPrepSlaMins: Number(e.target.value) })} className="cb-input" />
              </div>
            </div>

            <div className="cb-form-group">
              <label className="cb-label">Max Active Batched Orders per Rider</label>
              <input type="number" value={settings.maxRiderOrders} onChange={e => setSettings({ ...settings, maxRiderOrders: Number(e.target.value) })} className="cb-input" />
            </div>

            <button type="submit" className="cb-btn cb-btn-primary cb-btn-lg" style={{ width: '100%', marginTop: '12px' }}>
              <FiSave /> Save Operational Parameters
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
