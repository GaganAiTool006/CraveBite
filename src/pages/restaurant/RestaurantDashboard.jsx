import React from 'react';
import { Link } from 'react-router-dom';
import { FiShoppingBag, FiDollarSign, FiClock, FiStar, FiTrendingUp, FiArrowRight, FiCheck } from 'react-icons/fi';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';

export default function RestaurantDashboard() {
  const { orders, updateOrderStatus } = useCart();
  const { currentUser } = useAuth();

  const totalOrders = orders.length;
  const pendingOrders = orders.filter(o => o.orderStatus !== 'Delivered' && o.orderStatus !== 'Cancelled');
  const revenue = orders.reduce((sum, o) => sum + (o.totalAmount || 0), 0);

  return (
    <div className="cb-page animate-fade-in" style={{ padding: 0 }}>
      
      {/* Top Banner */}
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: '900', color: 'var(--text-main)' }}>
          Merchant Dashboard: {currentUser?.restaurantName || 'Artisan Burger Co.'}
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>
          Real-time kitchen orders, daily revenue, and preparation queue
        </p>
      </div>

      {/* KPI Stats Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '36px' }}>
        
        <div className="cb-card" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <span style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-muted)' }}>TOTAL REVENUE</span>
            <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'var(--success-light)', color: 'var(--success)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <FiDollarSign size={18} />
            </div>
          </div>
          <h2 style={{ fontSize: '28px', fontWeight: '900', color: 'var(--text-main)', margin: 0 }}>₹{Math.round(revenue)}</h2>
          <span style={{ fontSize: '12px', color: 'var(--success)', fontWeight: '700', marginTop: '4px', display: 'block' }}>↑ 18.4% from last week</span>
        </div>

        <div className="cb-card" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <span style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-muted)' }}>ACTIVE ORDERS</span>
            <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'var(--accent-light)', color: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <FiClock size={18} />
            </div>
          </div>
          <h2 style={{ fontSize: '28px', fontWeight: '900', color: 'var(--accent)', margin: 0 }}>{pendingOrders.length}</h2>
          <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: '700', marginTop: '4px', display: 'block' }}>In kitchen queue</span>
        </div>

        <div className="cb-card" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <span style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-muted)' }}>COMPLETED TODAY</span>
            <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'var(--primary-light)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <FiShoppingBag size={18} />
            </div>
          </div>
          <h2 style={{ fontSize: '28px', fontWeight: '900', color: 'var(--primary)', margin: 0 }}>{totalOrders}</h2>
          <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: '700', marginTop: '4px', display: 'block' }}>Lifetime orders processed</span>
        </div>

        <div className="cb-card" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <span style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-muted)' }}>KITCHEN RATING</span>
            <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'var(--warning-light)', color: '#D97706', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <FiStar size={18} />
            </div>
          </div>
          <h2 style={{ fontSize: '28px', fontWeight: '900', color: 'var(--text-main)', margin: 0 }}>4.8 ★</h2>
          <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: '700', marginTop: '4px', display: 'block' }}>Based on 1.4k+ reviews</span>
        </div>

      </div>

      {/* Live Order Queue Table */}
      <div className="cb-card" style={{ padding: '24px', marginBottom: '32px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div>
            <h2 style={{ fontSize: '18px', fontWeight: '800', color: 'var(--text-main)' }}>Incoming & Active Order Pipeline</h2>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Update status directly to keep customers and riders informed</p>
          </div>
          <Link to="/restaurant/orders" className="cb-btn cb-btn-outline cb-btn-sm">
            View Order Manager
          </Link>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13.5px' }}>
            <thead>
              <tr style={{ borderBottom: '1.5px solid var(--border)', color: 'var(--text-muted)' }}>
                <th style={{ padding: '12px 14px' }}>ORDER ID</th>
                <th style={{ padding: '12px 14px' }}>ITEMS</th>
                <th style={{ padding: '12px 14px' }}>TOTAL</th>
                <th style={{ padding: '12px 14px' }}>CURRENT STATUS</th>
                <th style={{ padding: '12px 14px', textAlign: 'right' }}>QUICK ACTION</th>
              </tr>
            </thead>
            <tbody>
              {orders.slice(0, 5).map(o => (
                <tr key={o.orderId} style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '16px 14px', fontWeight: '800' }}>#{o.orderId}</td>
                  <td style={{ padding: '16px 14px', color: 'var(--text-main)', fontWeight: '600' }}>
                    {o.items.map(i => `${i.quantity}x ${i.name}`).join(', ')}
                  </td>
                  <td style={{ padding: '16px 14px', fontWeight: '800' }}>₹{o.totalAmount}</td>
                  <td style={{ padding: '16px 14px' }}>
                    <span className={`cb-badge ${o.orderStatus === 'Delivered' ? 'cb-badge-success' : 'cb-badge-warning'}`}>
                      {o.orderStatus}
                    </span>
                  </td>
                  <td style={{ padding: '16px 14px', textAlign: 'right' }}>
                    {o.orderStatus === 'Order Confirmed' && (
                      <button onClick={() => updateOrderStatus(o.orderId, 'Food Preparing', 2)} className="cb-btn cb-btn-primary cb-btn-sm">
                        Accept & Cook
                      </button>
                    )}
                    {o.orderStatus === 'Food Preparing' && (
                      <button onClick={() => updateOrderStatus(o.orderId, 'Food Ready', 3)} className="cb-btn cb-btn-accent cb-btn-sm">
                        Mark Food Ready
                      </button>
                    )}
                    {o.orderStatus === 'Food Ready' && (
                      <button onClick={() => updateOrderStatus(o.orderId, 'On the Way', 5)} className="cb-btn cb-btn-outline cb-btn-sm">
                        Handover to Rider
                      </button>
                    )}
                    {(o.orderStatus === 'On the Way' || o.orderStatus === 'Delivered') && (
                      <span style={{ color: 'var(--success)', fontWeight: '700', fontSize: '13px' }}>
                        <FiCheck /> Rider Dispatched
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
