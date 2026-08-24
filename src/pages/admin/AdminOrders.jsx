import React from 'react';
import { useCart } from '../../context/CartContext';

export default function AdminOrders() {
  const { orders } = useCart();

  return (
    <div className="cb-page animate-fade-in" style={{ padding: 0 }}>
      <div style={{ marginBottom: '28px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: '900', color: 'var(--text-main)' }}>Platform Orders Monitor</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>Real-time transaction log across all kitchens and delivery zones</p>
      </div>

      <div className="cb-card" style={{ padding: '20px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
          <thead>
            <tr style={{ borderBottom: '1.5px solid var(--border)', color: 'var(--text-muted)' }}>
              <th style={{ padding: '12px 14px' }}>ORDER ID</th>
              <th style={{ padding: '12px 14px' }}>RESTAURANT</th>
              <th style={{ padding: '12px 14px' }}>CUSTOMER / ADDRESS</th>
              <th style={{ padding: '12px 14px' }}>ITEMS COUNT</th>
              <th style={{ padding: '12px 14px' }}>TOTAL</th>
              <th style={{ padding: '12px 14px' }}>PAYMENT</th>
              <th style={{ padding: '12px 14px' }}>STATUS</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(o => (
              <tr key={o.orderId} style={{ borderBottom: '1px solid var(--border)' }}>
                <td style={{ padding: '16px 14px', fontWeight: '800' }}>#{o.orderId}</td>
                <td style={{ padding: '16px 14px', fontWeight: '700' }}>{o.restaurantName}</td>
                <td style={{ padding: '16px 14px' }}>{o.deliveryAddress?.flat}, {o.deliveryAddress?.area}</td>
                <td style={{ padding: '16px 14px' }}>{o.items.length} dishes</td>
                <td style={{ padding: '16px 14px', fontWeight: '800' }}>₹{o.totalAmount}</td>
                <td style={{ padding: '16px 14px', color: 'var(--success)', fontWeight: '700' }}>{o.paymentMethod}</td>
                <td style={{ padding: '16px 14px' }}>
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
