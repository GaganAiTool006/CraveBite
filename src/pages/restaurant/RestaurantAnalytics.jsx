import React from 'react';
import { FiTrendingUp, FiDollarSign, FiShoppingBag, FiStar } from 'react-icons/fi';
import { useCart } from '../../context/CartContext';

export default function RestaurantAnalytics() {
  const { orders } = useCart();
  const revenue = orders.reduce((sum, o) => sum + (o.totalAmount || 0), 0);

  const topDishes = [
    { name: 'Truffle Smash Double Cheeseburger', orders: 142, revenue: '₹41,038' },
    { name: 'Cajun Seasoned Crinkle Fries', orders: 110, revenue: '₹15,290' },
    { name: 'Classic Belgian Chocolate Shake', orders: 94, revenue: '₹17,766' },
    { name: 'Crispy Peri-Peri Chicken Burger', orders: 88, revenue: '₹21,912' }
  ];

  return (
    <div className="cb-page animate-fade-in" style={{ padding: 0 }}>
      
      <div style={{ marginBottom: '28px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: '900', color: 'var(--text-main)' }}>Merchant Sales & Revenue Analytics</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>Analyze your top performing items, customer review scores, and growth trends</p>
      </div>

      {/* Highlights */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', marginBottom: '32px' }}>
        <div className="cb-card" style={{ padding: '24px' }}>
          <span style={{ fontSize: '13px', color: 'var(--text-muted)', fontWeight: '700' }}>MONTHLY GROSS REVENUE</span>
          <h2 style={{ fontSize: '32px', fontWeight: '900', color: 'var(--success)', margin: '8px 0' }}>₹{Math.round(revenue * 3.4 + 48200)}</h2>
          <span style={{ fontSize: '12px', color: 'var(--success)', fontWeight: '700' }}>↑ 24% growth month-over-month</span>
        </div>

        <div className="cb-card" style={{ padding: '24px' }}>
          <span style={{ fontSize: '13px', color: 'var(--text-muted)', fontWeight: '700' }}>AVERAGE ORDER VALUE (AOV)</span>
          <h2 style={{ fontSize: '32px', fontWeight: '900', color: 'var(--primary)', margin: '8px 0' }}>₹520</h2>
          <span style={{ fontSize: '12px', color: 'var(--primary)', fontWeight: '700' }}>2.4 items per customer bag</span>
        </div>

        <div className="cb-card" style={{ padding: '24px' }}>
          <span style={{ fontSize: '13px', color: 'var(--text-muted)', fontWeight: '700' }}>CUSTOMER RETENTION</span>
          <h2 style={{ fontSize: '32px', fontWeight: '900', color: 'var(--accent)', margin: '8px 0' }}>78.4%</h2>
          <span style={{ fontSize: '12px', color: 'var(--accent)', fontWeight: '700' }}>High repeat order rate</span>
        </div>
      </div>

      {/* Top Dishes Table */}
      <div className="cb-card" style={{ padding: '24px' }}>
        <h3 style={{ fontSize: '18px', fontWeight: '800', marginBottom: '16px' }}>Top Selling Dishes This Month</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
          <thead>
            <tr style={{ borderBottom: '1.5px solid var(--border)', color: 'var(--text-muted)' }}>
              <th style={{ padding: '12px 14px' }}>DISH NAME</th>
              <th style={{ padding: '12px 14px' }}>ORDERS COUNT</th>
              <th style={{ padding: '12px 14px', textAlign: 'right' }}>REVENUE GENERATED</th>
            </tr>
          </thead>
          <tbody>
            {topDishes.map((dish, i) => (
              <tr key={i} style={{ borderBottom: '1px solid var(--border)' }}>
                <td style={{ padding: '16px 14px', fontWeight: '700' }}>#{i+1} {dish.name}</td>
                <td style={{ padding: '16px 14px', color: 'var(--text-muted)' }}>{dish.orders} orders</td>
                <td style={{ padding: '16px 14px', fontWeight: '800', textAlign: 'right', color: 'var(--text-main)' }}>{dish.revenue}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}
