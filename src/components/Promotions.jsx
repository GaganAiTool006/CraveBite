import React from 'react';
import { PROMO_BANNERS } from '../data/mockData';
import { Tag } from 'lucide-react';

export default function Promotions({ onApplyCoupon }) {
  return (
    <section>
      <div className="section-title-row">
        <h2 className="section-heading">Best offers for you</h2>
      </div>

      <div className="promo-grid">
        {PROMO_BANNERS.map((banner) => (
          <div
            key={banner.id}
            className="promo-banner-card"
            style={{ background: banner.color }}
            onClick={() => onApplyCoupon(banner.code)}
            title="Click to copy code"
            role="button"
            tabIndex={0}
          >
            <div>
              <span className="promo-tag">
                <Tag size={11} style={{ display: 'inline', marginRight: '4px' }} />
                {banner.tag}
              </span>
              <h3 className="promo-title">{banner.title}</h3>
              <p className="promo-subtitle">{banner.subtitle}</p>
            </div>
            <div style={{ marginTop: '12px', fontSize: '11px', fontWeight: '800', opacity: 0.8, textTransform: 'uppercase', letterSpacing: '1px' }}>
              Tap to apply code
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
