import React, { useState } from 'react';
import { FiStar, FiCheck, FiX, FiMessageSquare } from 'react-icons/fi';

export default function ManagerReviews() {
  const [reviews, setReviews] = useState([
    { id: 'rev-1', customer: 'Aarav Sharma', restaurant: 'Artisan Burger Co.', rating: 5, comment: 'Super fast delivery in 18 minutes! Truffle burger was perfectly warm.', status: 'Resolved' },
    { id: 'rev-2', customer: 'Priya Verma', restaurant: 'Napoli Woodfire Pizzeria', rating: 4, comment: 'Delicious burrata pizza. Garlic dip was slightly cold though.', status: 'Review Passed' },
    { id: 'rev-3', customer: 'Rohan Gupta', restaurant: 'Royal Awadh Dum Biryani', rating: 5, comment: 'Authentic aromatic mutton biryani. Great packaging.', status: 'Resolved' }
  ]);

  return (
    <div className="cb-page animate-fade-in" style={{ padding: 0 }}>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '26px', fontWeight: '900', color: 'var(--text-main)' }}>Customer Ratings & Kitchen Feedback</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>Branch review moderation, food quality audits, and customer support resolutions</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {reviews.map(r => (
          <div key={r.id} className="cb-card" style={{ padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <div>
                <span style={{ fontWeight: '800', fontSize: '15px' }}>{r.customer}</span>
                <span style={{ fontSize: '13px', color: 'var(--text-muted)', marginLeft: '8px' }}>ordered from <strong>{r.restaurant}</strong></span>
              </div>
              <span style={{ color: '#D97706', fontWeight: '900', fontSize: '14px' }}>★ {r.rating} / 5</span>
            </div>
            <p style={{ fontSize: '14px', color: 'var(--text-main)', margin: '6px 0 12px 0' }}>"{r.comment}"</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span className="cb-badge cb-badge-success">{r.status}</span>
              <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Feedback verified by CraveBite Quality AI</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
