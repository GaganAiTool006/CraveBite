import React from 'react';
import { useCart } from '../../context/CartContext';
import { FiCheck, FiMapPin, FiNavigation } from 'react-icons/fi';

export default function DeliveryOrders() {
  const { orders, updateOrderStatus } = useCart();

  return (
    <div className="cb-page animate-fade-in" style={{ padding: 0 }}>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '26px', fontWeight: '900', color: 'var(--text-main)' }}>Delivery Dispatch Pool</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>Available orders ready for pickup across restaurants in your sector</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {orders.map((o) => (
          <div key={o.orderId} className="cb-card" style={{ padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
              <div>
                <span className="cb-badge cb-badge-primary">#{o.orderId}</span>
                <h3 style={{ fontSize: '17px', fontWeight: '800', margin: '4px 0 2px 0' }}>{o.restaurantName}</h3>
                <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: 0 }}>
                  Customer: {o.deliveryAddress?.flat}, {o.deliveryAddress?.area}
                </p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: '18px', fontWeight: '900', color: 'var(--success)' }}>+₹65 payout</span>
                <span style={{ display: 'block', fontSize: '12px', color: 'var(--text-muted)' }}>Estimated 22 mins</span>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '12px', borderTop: '1px solid var(--border)' }}>
              <span className={`cb-badge ${o.orderStatus === 'Delivered' ? 'cb-badge-success' : 'cb-badge-warning'}`}>
                {o.orderStatus}
              </span>

              <div style={{ display: 'flex', gap: '8px' }}>
                <button 
                  onClick={() => updateOrderStatus(o.orderId, 'On the Way', 5)}
                  className="cb-btn cb-btn-primary cb-btn-sm"
                >
                  <FiNavigation /> Accept & Navigate
                </button>
                <button 
                  onClick={() => updateOrderStatus(o.orderId, 'Delivered', 6)}
                  className="cb-btn cb-btn-outline cb-btn-sm"
                >
                  <FiCheck /> Mark Delivered
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
