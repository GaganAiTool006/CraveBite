import React from 'react';
import { useParams } from 'react-router-dom';

export default function RestaurantDetails() {
  const { id } = useParams();
  
  return (
    <div className="container" style={{ padding: '40px 24px', minHeight: '60vh' }}>
      <h1 style={{ fontSize: '32px', fontWeight: '800' }}>Restaurant Details ({id})</h1>
      <p style={{ color: 'var(--text-muted)' }}>This page will feature the full restaurant menu, cover image, and add to cart functionality.</p>
    </div>
  );
}
