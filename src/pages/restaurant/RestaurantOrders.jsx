import React from 'react';
import { useCart } from '../../context/CartContext';
import { FiCheck, FiX, FiClock, FiShoppingBag, FiTruck } from 'react-icons/fi';

export default function RestaurantOrders() {
  const { orders, updateOrderStatus } = useCart();

  return (
    <div className="cb-page animate-fade-in" style={{ padding: 0 }}>
      
      <div style={{ marginBottom: '28px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: '900', color: 'var(--text-main)' }}>
          Merchant Live Orders Manager
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>
          Accept new orders, update kitchen preparation stages, and dispatch to riders
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {orders.map((o) => (
          <div key={o.orderId} className="cb-card" style={{ padding: '24px' }}>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', marginBottom: '16px', borderBottom: '1px solid var(--border)', paddingBottom: '14px' }}>
              <div>
                <span className="cb-badge cb-badge-primary" style={{ marginBottom: '6px' }}>#{o.orderId}</span>
                <h3 style={{ fontSize: '17px', fontWeight: '800', margin: '2px 0' }}>Customer: {o.deliveryAddress?.flat}, {o.deliveryAddress?.area}</h3>
                <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: 0 }}>
                  Placed at: {new Date(o.createdAt).toLocaleTimeString()} • Payment: {o.paymentMethod}
                </p>
              </div>

              <div style={{ textAlign: 'right' }}>
                <span className={`cb-badge ${o.orderStatus === 'Delivered' ? 'cb-badge-success' : 'cb-badge-warning'}`} style={{ fontSize: '13px', padding: '6px 12px' }}>
                  {o.orderStatus}
                </span>
                <p style={{ fontSize: '18px', fontWeight: '900', color: 'var(--text-main)', margin: '4px 0 0 0' }}>
                  ₹{o.totalAmount}
                </p>
              </div>
            </div>

            {/* Items list */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '18px' }}>
              {o.items.map((item, idx) => (
                <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', fontWeight: '600' }}>
                  <span>{item.quantity}x {item.name}</span>
                  <span>₹{item.price * item.quantity}</span>
                </div>
              ))}
              {o.deliveryInstructions && (
                <p style={{ fontSize: '12.5px', color: 'var(--accent)', fontWeight: '700', marginTop: '6px' }}>
                  Special Note: "{o.deliveryInstructions}"
                </p>
              )}
            </div>

            {/* Status Flow Buttons */}
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', paddingTop: '14px', borderTop: '1px solid var(--border)' }}>
              <button
                onClick={() => updateOrderStatus(o.orderId, 'Restaurant Accepted', 1)}
                className={`cb-btn cb-btn-sm ${o.currentStepIndex >= 1 ? 'cb-btn-primary' : 'cb-btn-outline'}`}
              >
                1. Accept Order
              </button>

              <button
                onClick={() => updateOrderStatus(o.orderId, 'Food Preparing', 2)}
                className={`cb-btn cb-btn-sm ${o.currentStepIndex >= 2 ? 'cb-btn-primary' : 'cb-btn-outline'}`}
              >
                2. Cooking / Preparing
              </button>

              <button
                onClick={() => updateOrderStatus(o.orderId, 'Food Ready', 3)}
                className={`cb-btn cb-btn-sm ${o.currentStepIndex >= 3 ? 'cb-btn-primary' : 'cb-btn-outline'}`}
              >
                3. Mark Food Ready
              </button>

              <button
                onClick={() => updateOrderStatus(o.orderId, 'On the Way', 5)}
                className={`cb-btn cb-btn-sm ${o.currentStepIndex >= 5 ? 'cb-btn-primary' : 'cb-btn-outline'}`}
              >
                4. Handover to Rider
              </button>

              <button
                onClick={() => updateOrderStatus(o.orderId, 'Delivered', 6)}
                className={`cb-btn cb-btn-sm ${o.currentStepIndex >= 6 ? 'cb-btn-primary' : 'cb-btn-outline'}`}
              >
                5. Mark Completed
              </button>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}
