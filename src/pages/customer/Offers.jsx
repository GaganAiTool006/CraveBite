import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiPercent, FiCopy, FiCheck, FiArrowRight } from 'react-icons/fi';
import { COUPONS, RESTAURANTS } from '../../data/mockData';
import { useCart } from '../../context/CartContext';
import RestaurantCard from '../../components/customer/RestaurantCard';

export default function Offers() {
  const { applyCoupon } = useCart();
  const [copiedCode, setCopiedCode] = useState(null);

  const handleCopy = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    applyCoupon(code);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  const offerRestaurants = RESTAURANTS.filter(r => Boolean(r.offer));

  return (
    <div className="cb-page animate-fade-in" style={{ padding: '40px 0' }}>
      <div className="cb-container">
        
        {/* Banner */}
        <div style={{
          background: 'linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)',
          color: 'white',
          borderRadius: 'var(--radius-lg)',
          padding: '40px',
          marginBottom: '40px',
          boxShadow: 'var(--shadow-md)'
        }}>
          <span className="cb-badge cb-badge-accent" style={{ marginBottom: '12px' }}>
            DEALS & SAVINGS
          </span>
          <h1 style={{ fontSize: '36px', fontWeight: '900', margin: '4px 0 10px 0' }}>
            Exclusive Vouchers & Best Food Offers
          </h1>
          <p style={{ color: '#E0E7FF', fontSize: '16px', maxWidth: '600px' }}>
            Save extra on your orders with our promotional codes, bank card discounts, and free delivery vouchers.
          </p>
        </div>

        {/* Coupons Grid */}
        <div style={{ marginBottom: '50px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: '800', marginBottom: '20px' }}>Available Platform Coupons</h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
            {COUPONS.map((cp) => (
              <div 
                key={cp.code} 
                className="cb-card"
                style={{ padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', border: '1.5px dashed var(--primary)' }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <span className="cb-badge cb-badge-primary" style={{ fontSize: '13px', padding: '4px 12px' }}>
                      {cp.code}
                    </span>
                    <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: '700' }}>
                      Min. ₹{cp.minOrder}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '18px', fontWeight: '800', color: 'var(--text-main)', margin: '0 0 6px 0' }}>
                    {cp.title}
                  </h3>
                  <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: 0 }}>
                    {cp.description}
                  </p>
                </div>

                <div style={{ marginTop: '20px', paddingTop: '14px', borderTop: '1px solid var(--border)' }}>
                  <button
                    onClick={() => handleCopy(cp.code)}
                    className="cb-btn cb-btn-outline"
                    style={{ width: '100%', fontSize: '13px', borderColor: copiedCode === cp.code ? 'var(--success)' : 'var(--primary)', color: copiedCode === cp.code ? 'var(--success)' : 'var(--primary)' }}
                  >
                    {copiedCode === cp.code ? (
                      <>
                        <FiCheck size={16} /> Applied to Cart!
                      </>
                    ) : (
                      <>
                        <FiCopy size={16} /> Copy & Apply Code
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Restaurants with Offers */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: '800' }}>Restaurants Offering Special Deals</h2>
            <Link to="/restaurants" style={{ color: 'var(--primary)', fontWeight: '700', fontSize: '14px' }}>
              View All <FiArrowRight />
            </Link>
          </div>

          <div className="cb-grid-3">
            {offerRestaurants.map((rest) => (
              <RestaurantCard key={rest.id} restaurant={rest} />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
