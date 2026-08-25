import React from 'react';

export default function RestaurantListing() {
  return (
    <div className="container" style={{ padding: '40px 24px', minHeight: '60vh' }}>
      <h1 style={{ fontSize: '32px', fontWeight: '800' }}>Explore Restaurants</h1>
      <p style={{ color: 'var(--text-muted)' }}>This page will feature advanced search, filters, and an infinite scroll of restaurants.</p>
    </div>
  );
}
