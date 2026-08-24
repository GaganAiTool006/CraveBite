import React from 'react';

export default function Cart() {
  return (
    <div className="container" style={{ padding: '40px 24px', minHeight: '60vh' }}>
      <h1 style={{ fontSize: '32px', fontWeight: '800' }}>Your Cart</h1>
      <p style={{ color: 'var(--text-muted)' }}>This page will feature the checkout flow, address selection, and total price breakdown.</p>
    </div>
  );
}
