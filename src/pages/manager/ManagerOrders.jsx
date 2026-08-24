import React from 'react';
import { useCart } from '../../context/CartContext';
import { FiCheck, FiRefreshCw, FiClock, FiAlertTriangle } from 'react-icons/fi';

export default function ManagerOrders() {
  const { orders, updateOrderStatus } = useCart();

  return (
    <div className="cb-page animate-fade-in" style={{ padding: 0 }}>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '26px', fontWeight: '900', color: 'var(--text-main)' }}>Regional Orders Queue & Dispatch Control</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>Direct manager interventions, priority assignments, and order lifecycle overrides</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {orders.map(o => (
          <div key={o.orderId} className="cb-card" style={{ padding: '20px' }}>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '14px', marginBottom: '14px', borderBottom: '1px solid var(--border)', paddingBottom: '12px' }}>
              <div>
                <span className="cb-badge cb-badge-primary">ORDER #{o.orderId}</span>
                <h3 style={{ fontSize: '17px', fontWeight: '800', margin: '4px 0 2px 0' }}>{o.restaurantName}</h3>
                <p style={{ fontSize: '12.5px', color: 'var(--text-muted)', margin: 0 }}>
                  Destination: {o.deliveryAddress?.flat}, {o.deliveryAddress?.area} • Placed: {new Date(o.createdAt).toLocaleTimeString()}
                </p>
              </div>

              <div style={{ textAlign: 'right' }}>
                <span className={`cb-badge ${o.orderStatus === 'Delivered' ? 'cb-badge-success' : 'cb-badge-warning'}`}>
                  ● {o.orderStatus.toUpperCase()}
                </span>
                <p style={{ fontSize: '18px', fontWeight: '900', color: 'var(--text-main)', margin: '4px 0 0 0' }}>
                  ₹{o.totalAmount}
                </p>
              </div>
            </div>

            {/* Items */}
            <div style={{ fontSize: '13.5px', color: 'var(--text-main)', fontWeight: '600', marginBottom: '14px' }}>
              {o.items.map(i => `${i.quantity}x ${i.name}`).join(', ')}
            </div>

            {/* Manager Actions Bar */}
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', paddingTop: '12px', borderTop: '1px solid var(--border)', alignItems: 'center' }}>
              <span style={{ fontSize: '12px', fontWeight: '800', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                Set Stage:
              </span>

              <button 
                onClick={() => updateOrderStatus(o.orderId, 'Restaurant Accepted', 1)}
                className="cb-btn cb-btn-subtle cb-btn-sm"
              >
                1. Accepted
              </button>

              <button 
                onClick={() => updateOrderStatus(o.orderId, 'Food Preparing', 2)}
                className="cb-btn cb-btn-subtle cb-btn-sm"
              >
                2. Cooking
              </button>

              <button 
                onClick={() => updateOrderStatus(o.orderId, 'Food Ready', 3)}
                className="cb-btn cb-btn-subtle cb-btn-sm"
              >
                3. Ready
              </button>

              <button 
                onClick={() => updateOrderStatus(o.orderId, 'On the Way', 5)}
                className="cb-btn cb-btn-subtle cb-btn-sm"
              >
                4. On Route
              </button>

              <button 
                onClick={() => updateOrderStatus(o.orderId, 'Delivered', 6)}
                className="cb-btn cb-btn-primary cb-btn-sm"
                style={{ background: 'var(--success)' }}
              >
                <FiCheck /> 5. Mark Delivered
              </button>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}
