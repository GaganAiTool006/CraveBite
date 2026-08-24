import React from 'react';
import { Link } from 'react-router-dom';
import { FiTruck, FiDollarSign, FiClock, FiMapPin, FiNavigation, FiCheck } from 'react-icons/fi';
import { useCart } from '../../context/CartContext';

export default function DeliveryDashboard() {
  const { orders, updateOrderStatus } = useCart();

  const activeOrders = orders.filter(o => o.orderStatus !== 'Delivered' && o.orderStatus !== 'Cancelled');
  const deliveredToday = orders.filter(o => o.orderStatus === 'Delivered');

  return (
    <div className="cb-page animate-fade-in" style={{ padding: 0 }}>
      
      {/* Top Welcome */}
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '26px', fontWeight: '900', color: 'var(--text-main)' }}>
          Rider Radar & Live Route Overview
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>
          You are currently in active duty. Delivery alerts will pop up automatically.
        </p>
      </div>

      {/* KPI Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '32px' }}>
        <div className="cb-card" style={{ padding: '20px' }}>
          <span style={{ fontSize: '13px', color: 'var(--text-muted)', fontWeight: '700' }}>TODAY'S EARNINGS</span>
          <h2 style={{ fontSize: '28px', fontWeight: '900', color: 'var(--success)', margin: '6px 0 0 0' }}>₹840.00</h2>
          <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>14 trips completed</span>
        </div>

        <div className="cb-card" style={{ padding: '20px' }}>
          <span style={{ fontSize: '13px', color: 'var(--text-muted)', fontWeight: '700' }}>ACTIVE ASSIGNMENTS</span>
          <h2 style={{ fontSize: '28px', fontWeight: '900', color: 'var(--primary)', margin: '6px 0 0 0' }}>{activeOrders.length}</h2>
          <span style={{ fontSize: '12px', color: 'var(--primary)', fontWeight: '700' }}>In transit</span>
        </div>

        <div className="cb-card" style={{ padding: '20px' }}>
          <span style={{ fontSize: '13px', color: 'var(--text-muted)', fontWeight: '700' }}>RIDER RATING</span>
          <h2 style={{ fontSize: '28px', fontWeight: '900', color: 'var(--accent)', margin: '6px 0 0 0' }}>4.92 ★</h2>
          <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Top 5% rider in Jaipur</span>
        </div>
      </div>

      {/* Active Trip Card */}
      {activeOrders.length > 0 ? (
        <div className="cb-card" style={{ padding: '24px', marginBottom: '32px', border: '2px solid var(--primary)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <span className="cb-badge cb-badge-primary">CURRENT ACTIVE TRIP</span>
            <span style={{ fontSize: '14px', fontWeight: '800', color: 'var(--accent)' }}>Payout: ₹65</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
            <img 
              src={activeOrders[0].restaurantImage || 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=100&q=80'} 
              alt="Rest" 
              style={{ width: '56px', height: '56px', borderRadius: '12px', objectFit: 'cover' }} 
            />
            <div>
              <h3 style={{ fontSize: '18px', fontWeight: '800', margin: '0 0 4px 0' }}>{activeOrders[0].restaurantName}</h3>
              <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: 0 }}>
                Drop to: {activeOrders[0].deliveryAddress?.flat}, {activeOrders[0].deliveryAddress?.area}
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <button 
              onClick={() => updateOrderStatus(activeOrders[0].orderId, 'Delivery Partner Picked Up', 4)}
              className="cb-btn cb-btn-outline cb-btn-sm"
            >
              1. Arrived & Picked Up
            </button>
            <button 
              onClick={() => updateOrderStatus(activeOrders[0].orderId, 'On the Way', 5)}
              className="cb-btn cb-btn-primary cb-btn-sm"
            >
              <FiNavigation /> 2. Start GPS Route
            </button>
            <button 
              onClick={() => updateOrderStatus(activeOrders[0].orderId, 'Delivered', 6)}
              className="cb-btn cb-btn-sm"
              style={{ background: 'var(--success)', color: 'white' }}
            >
              <FiCheck /> 3. Mark Delivered (OTP Verified)
            </button>
          </div>
        </div>
      ) : (
        <div className="cb-card" style={{ padding: '40px 20px', textAlign: 'center', marginBottom: '32px' }}>
          <p style={{ fontWeight: '700', fontSize: '16px', color: 'var(--text-muted)' }}>
            No trips currently in transit. Stay in high-demand zones for upcoming orders!
          </p>
        </div>
      )}

      {/* Available Requests Queue */}
      <div className="cb-card" style={{ padding: '24px' }}>
        <h2 style={{ fontSize: '18px', fontWeight: '800', marginBottom: '16px' }}>Upcoming Nearby Pickups</h2>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {orders.map((o) => (
            <div key={o.orderId} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px', background: 'var(--bg-subtle)', borderRadius: 'var(--radius-sm)' }}>
              <div>
                <span style={{ fontSize: '14px', fontWeight: '800', display: 'block' }}>{o.restaurantName} (Order #{o.orderId})</span>
                <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Deliver to: {o.deliveryAddress?.flat}, {o.deliveryAddress?.area} • 2.4 km distance</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontWeight: '800', color: 'var(--success)', fontSize: '15px' }}>+₹65</span>
                <button 
                  onClick={() => updateOrderStatus(o.orderId, 'On the Way', 5)} 
                  className="cb-btn cb-btn-primary cb-btn-sm"
                >
                  Accept Delivery
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
