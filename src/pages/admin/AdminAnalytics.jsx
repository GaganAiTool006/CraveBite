import React from 'react';
import { FiPieChart, FiDollarSign, FiTrendingUp, FiUsers } from 'react-icons/fi';
import { useCart } from '../../context/CartContext';

export default function AdminAnalytics() {
  const { orders } = useCart();
  const gross = orders.reduce((s, o) => s + (o.totalAmount || 0), 0);

  return (
    <div className="cb-page animate-fade-in" style={{ padding: 0 }}>
      <div style={{ marginBottom: '28px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: '900', color: 'var(--text-main)' }}>Platform Financial & Growth Analytics</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>Audited revenue, takeaway commissions, customer acquisition cost, and average basket sizes</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', marginBottom: '32px' }}>
        <div className="cb-card" style={{ padding: '24px' }}>
          <span style={{ fontSize: '13px', color: 'var(--text-muted)', fontWeight: '700' }}>MONTHLY RUN-RATE</span>
          <h2 style={{ fontSize: '32px', fontWeight: '900', color: 'var(--success)', margin: '8px 0' }}>₹1.84M</h2>
          <span style={{ fontSize: '12px', color: 'var(--success)', fontWeight: '700' }}>↑ 32.4% compound growth</span>
        </div>

        <div className="cb-card" style={{ padding: '24px' }}>
          <span style={{ fontSize: '13px', color: 'var(--text-muted)', fontWeight: '700' }}>CUSTOMER ACQUISITION (CAC)</span>
          <h2 style={{ fontSize: '32px', fontWeight: '900', color: 'var(--primary)', margin: '8px 0' }}>₹142</h2>
          <span style={{ fontSize: '12px', color: 'var(--primary)', fontWeight: '700' }}>LTV / CAC Ratio: 4.8x</span>
        </div>

        <div className="cb-card" style={{ padding: '24px' }}>
          <span style={{ fontSize: '13px', color: 'var(--text-muted)', fontWeight: '700' }}>AVERAGE FULFILLMENT TIME</span>
          <h2 style={{ fontSize: '32px', fontWeight: '900', color: 'var(--accent)', margin: '8px 0' }}>24.2 mins</h2>
          <span style={{ fontSize: '12px', color: 'var(--accent)', fontWeight: '700' }}>99.2% on-time guarantee</span>
        </div>
      </div>
    </div>
  );
}
