import React from 'react';
import { Star, CheckSquare } from 'lucide-react';

export default function RestaurantCard({ restaurant, onClick }) {
  return (
    <div 
      onClick={onClick} 
      style={{ 
        cursor: 'pointer', 
        display: 'flex', 
        flexDirection: 'column', 
        background: 'white', 
        borderRadius: '20px', 
        border: '1px solid #e0e0e5',
        overflow: 'hidden',
        boxShadow: '0 4px 12px rgba(0,0,0,0.02)',
        transition: 'all 0.2s'
      }}
      onMouseOver={(e) => { e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.08)'; e.currentTarget.style.transform = 'translateY(-4px)'; }}
      onMouseOut={(e) => { e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.02)'; e.currentTarget.style.transform = 'none'; }}
    >
      
      {/* Image Container */}
      <div style={{ position: 'relative', width: '100%', height: '200px' }}>
        <img src={restaurant.image} alt={restaurant.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        {/* Dark gradient overlay at bottom for name */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '100px', background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 100%)' }} />
        
        {/* Name overlaid on image */}
        <div style={{ position: 'absolute', bottom: '12px', left: '16px', right: '60px' }}>
          <h3 style={{ color: 'white', fontSize: '22px', fontWeight: '800', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', margin: 0 }}>
            {restaurant.name}
          </h3>
        </div>

        {/* Rating Badge */}
        <div style={{ position: 'absolute', bottom: '12px', right: '12px', background: '#24963f', color: 'white', padding: '4px 6px', borderRadius: '6px', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '13px', fontWeight: '700' }}>
          <Star size={12} fill="white" />
          <span>{restaurant.rating}</span>
        </div>
      </div>

      {/* Details */}
      <div style={{ padding: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', color: '#686b78', fontSize: '13px', marginBottom: '8px' }}>
          <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '65%' }}>
            {restaurant.cuisine.slice(0,2).join(' • ')}
          </span>
          <span>₹{restaurant.costForTwo} for two</span>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', color: '#93959f', fontSize: '13px', marginBottom: '16px' }}>
          <span>{restaurant.location}</span>
          <span>{restaurant.distance}</span>
        </div>

        {/* Table Booking tag */}
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '4px 8px', background: '#f0f0f5', borderRadius: '6px', color: '#686b78', fontSize: '11px', fontWeight: '700', marginBottom: '16px' }}>
          <CheckSquare size={12} />
          <span>Table booking</span>
        </div>

        {/* Offers Section */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <div style={{ background: '#1c9d60', color: 'white', padding: '8px 12px', borderRadius: '8px', fontSize: '12px', fontWeight: '700', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ fontSize: '14px', lineHeight: 1 }}>%</span>
              <span>Flat 20% off on pre-booking</span>
            </div>
            <span>+ 2 more</span>
          </div>

          <div style={{ background: '#e1faea', color: '#1c9d60', padding: '8px 12px', borderRadius: '8px', fontSize: '12px', fontWeight: '700' }}>
            Up to 10% off with bank offers
          </div>
        </div>

        {/* Bottom Promo */}
        <div style={{ marginTop: '16px', color: '#8a2be2', fontSize: '12px', fontWeight: '700' }}>
          Get extra ₹75 off using PAYTMUPI
        </div>
      </div>
    </div>
  );
}
