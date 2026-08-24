import React from 'react';
import { Link } from 'react-router-dom';
import { FiUsers, FiShoppingBag, FiTruck, FiDollarSign, FiPercent, FiTrendingUp } from 'react-icons/fi';
import { useCart } from '../../context/CartContext';
import { RESTAURANTS } from '../../data/mockData';

export default function AdminDashboard() {
  const { orders } = useCart();
  const totalVolume = orders.reduce((sum, o) => sum + (o.totalAmount || 0), 0);
  const platformCommission = Math.round(totalVolume * 0.20);

  return (
    <div className="cb-page animate-fade-in" style={{ padding: 0 }}>
      
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: '900', color: 'var(--text-main)' }}>
          Platform Master Overview
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>
          Executive dashboard tracking network volume, active kitchens, rider fleet, and commission revenue
        </p>
      </div>

      {/* KPI Stats Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '36px' }}>
        
        <div className="cb-card" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-muted)' }}>GROSS MERCHANDISE VALUE</span>
            <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'var(--success-light)', color: 'var(--success)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <FiDollarSign size={18} />
            </div>
          </div>
          <h2 style={{ fontSize: '28px', fontWeight: '900', color: 'var(--text-main)', margin: 0 }}>₹{Math.round(totalVolume * 4 + 142000)}</h2>
          <span style={{ fontSize: '12px', color: 'var(--success)', fontWeight: '700', marginTop: '4px', display: 'block' }}>↑ 28% YoY growth</span>
        </div>

        <div className="cb-card" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-muted)' }}>PLATFORM COMMISSION (20%)</span>
            <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'var(--primary-light)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <FiPercent size={18} />
            </div>
          </div>
          <h2 style={{ fontSize: '28px', fontWeight: '900', color: 'var(--primary)', margin: 0 }}>₹{Math.round(platformCommission * 4 + 28400)}</h2>
          <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: '700', marginTop: '4px', display: 'block' }}>Net platform take</span>
        </div>

        <div className="cb-card" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-muted)' }}>ACTIVE RESTAURANTS</span>
            <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'var(--accent-light)', color: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <FiShoppingBag size={18} />
            </div>
          </div>
          <h2 style={{ fontSize: '28px', fontWeight: '900', color: 'var(--accent)', margin: 0 }}>{RESTAURANTS.length} Kitchens</h2>
          <span style={{ fontSize: '12px', color: 'var(--success)', fontWeight: '700', marginTop: '4px', display: 'block' }}>100% active operational</span>
        </div>

        <div className="cb-card" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-muted)' }}>REGISTERED FLEET RIDERS</span>
            <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'var(--warning-light)', color: '#D97706', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <FiTruck size={18} />
            </div>
          </div>
          <h2 style={{ fontSize: '28px', fontWeight: '900', color: 'var(--text-main)', margin: 0 }}>482 Drivers</h2>
          <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: '700', marginTop: '4px', display: 'block' }}>Average 24m delivery SLA</span>
        </div>

      </div>

      {/* Recent Orders Overview */}
      <div className="cb-card" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: '800' }}>Recent Platform Activity</h3>
          <Link to="/admin/orders" className="cb-btn cb-btn-outline cb-btn-sm">
            View All Orders
          </Link>
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13.5px' }}>
          <thead>
            <tr style={{ borderBottom: '1.5px solid var(--border)', color: 'var(--text-muted)' }}>
              <th style={{ padding: '12px 14px' }}>ORDER ID</th>
              <th style={{ padding: '12px 14px' }}>RESTAURANT</th>
              <th style={{ padding: '12px 14px' }}>CUSTOMER ADDRESS</th>
              <th style={{ padding: '12px 14px' }}>AMOUNT</th>
              <th style={{ padding: '12px 14px' }}>STATUS</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(o => (
              <tr key={o.orderId} style={{ borderBottom: '1px solid var(--border)' }}>
                <td style={{ padding: '14px', fontWeight: '800' }}>#{o.orderId}</td>
                <td style={{ padding: '14px', fontWeight: '700' }}>{o.restaurantName}</td>
                <td style={{ padding: '14px', color: 'var(--text-muted)' }}>{o.deliveryAddress?.flat}, {o.deliveryAddress?.area}</td>
                <td style={{ padding: '14px', fontWeight: '800' }}>₹{o.totalAmount}</td>
                <td style={{ padding: '14px' }}>
                  <span className={`cb-badge ${o.orderStatus === 'Delivered' ? 'cb-badge-success' : 'cb-badge-warning'}`}>
                    {o.orderStatus}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}
