import React from 'react';
import { FiPieChart, FiTrendingUp, FiClock, FiCheckCircle } from 'react-icons/fi';

export default function ManagerAnalytics() {
  return (
    <div className="cb-page animate-fade-in" style={{ padding: 0 }}>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '26px', fontWeight: '900', color: 'var(--text-main)' }}>Operations Fulfillment Analytics</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>Delivery time trends, dispatch speed, and kitchen preparation throughput</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px', marginBottom: '32px' }}>
        <div className="cb-card" style={{ padding: '24px' }}>
          <span style={{ fontSize: '12px', fontWeight: '800', color: 'var(--text-muted)' }}>AVG ORDER-TO-DOOR TIME</span>
          <h2 style={{ fontSize: '32px', fontWeight: '900', color: 'var(--primary)', margin: '8px 0' }}>21.4 mins</h2>
          <span style={{ fontSize: '12px', color: 'var(--success)', fontWeight: '700' }}>↓ 3.8 mins faster than city average</span>
        </div>

        <div className="cb-card" style={{ padding: '24px' }}>
          <span style={{ fontSize: '12px', fontWeight: '800', color: 'var(--text-muted)' }}>AVG KITCHEN PREP TIME</span>
          <h2 style={{ fontSize: '32px', fontWeight: '900', color: 'var(--accent)', margin: '8px 0' }}>11.2 mins</h2>
          <span style={{ fontSize: '12px', color: 'var(--accent)', fontWeight: '700' }}>Within optimum 12 min window</span>
        </div>

        <div className="cb-card" style={{ padding: '24px' }}>
          <span style={{ fontSize: '12px', fontWeight: '800', color: 'var(--text-muted)' }}>PEAK HOUR DISPATCH SUCCESS</span>
          <h2 style={{ fontSize: '32px', fontWeight: '900', color: 'var(--success)', margin: '8px 0' }}>99.8%</h2>
          <span style={{ fontSize: '12px', color: 'var(--success)', fontWeight: '700' }}>Zero order dropouts</span>
        </div>
      </div>
    </div>
  );
}
