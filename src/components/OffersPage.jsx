import React from 'react';
import { Tag, Copy, CheckCircle } from 'lucide-react';
import { PROMO_BANNERS, COUPONS } from '../data/mockData';

export default function OffersPage({ onApplyCoupon }) {
  const [copiedCode, setCopiedCode] = React.useState(null);

  const handleCopy = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '32px 16px' }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: '800', marginBottom: '8px' }}>Offers for you</h1>
        <p style={{ color: 'var(--text-muted)' }}>Explore top deals and offers exclusively for you!</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}>
        {PROMO_BANNERS.map((banner) => (
          <div key={banner.id} style={{ background: banner.color, borderRadius: 'var(--radius-lg)', padding: '24px', color: 'white', position: 'relative', overflow: 'hidden', boxShadow: 'var(--shadow-md)' }}>
            <span style={{ background: 'rgba(255,255,255,0.2)', padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: '800' }}>
              {banner.tag}
            </span>
            <h3 style={{ fontSize: '24px', fontWeight: '800', marginTop: '16px' }}>{banner.title}</h3>
            <p style={{ fontSize: '14px', opacity: 0.9, marginTop: '4px' }}>{banner.subtitle}</p>
            
            <div style={{ marginTop: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ background: 'white', color: '#333', padding: '8px 16px', borderRadius: '8px', fontSize: '14px', fontWeight: '800', border: '1px dashed #ccc', flex: 1, textAlign: 'center' }}>
                {banner.code}
              </div>
              <button 
                onClick={() => handleCopy(banner.code)}
                style={{ background: 'rgba(255,255,255,0.2)', color: 'white', padding: '8px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                {copiedCode === banner.code ? <CheckCircle size={20} /> : <Copy size={20} />}
              </button>
            </div>
          </div>
        ))}
      </div>

      <h2 style={{ fontSize: '22px', fontWeight: '800', marginTop: '48px', marginBottom: '24px' }}>Available Coupons</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}>
        {COUPONS.map((coupon) => (
          <div key={coupon.code} style={{ border: '1px solid var(--border-card)', borderRadius: 'var(--radius-md)', padding: '20px', background: 'white', boxShadow: 'var(--shadow-sm)' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
              <div style={{ width: '48px', height: '48px', background: '#fff2e6', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FC8019' }}>
                <Tag size={24} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '16px', fontWeight: '800', border: '1px dashed #ccc', display: 'inline-block', padding: '4px 8px', borderRadius: '4px', marginBottom: '8px' }}>
                  {coupon.code}
                </div>
                <h4 style={{ fontSize: '15px', fontWeight: '700', color: 'var(--text-dark)' }}>{coupon.description}</h4>
                <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '4px' }}>
                  Min order ₹{coupon.minOrder}. {coupon.maxDiscount ? `Max discount ₹${coupon.maxDiscount}.` : ''}
                </p>
              </div>
            </div>
            <button 
              onClick={() => handleCopy(coupon.code)}
              style={{ width: '100%', padding: '10px', marginTop: '16px', borderTop: '1px solid var(--border-card)', color: '#FC8019', fontWeight: '800', fontSize: '14px', background: 'transparent' }}
            >
              {copiedCode === coupon.code ? 'COPIED!' : 'COPY CODE'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
