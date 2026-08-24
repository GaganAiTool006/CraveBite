import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiStar, FiHeart, FiPlus, FiMinus, FiZap, FiArrowRight } from 'react-icons/fi';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';

export default function FoodItemCard({ item, restaurant }) {
  const { cart, addToCart, updateQuantity } = useCart();
  const { currentUser, toggleFavouriteFood } = useAuth();
  const navigate = useNavigate();

  const cartItem = cart.find(c => c.id === item.id);
  const isFav = (currentUser?.favouriteFoods || []).includes(item.id);

  const handleBuyNow = () => {
    if (!cartItem) {
      addToCart(item, restaurant, 1);
    }
    navigate('/checkout');
  };

  return (
    <div 
      className="cb-card"
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        padding: '18px',
        gap: '16px',
        position: 'relative'
      }}
    >
      {/* Left Details */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            {/* Veg / Non-Veg symbol */}
            <div style={{
              width: '16px',
              height: '16px',
              border: `2px solid ${item.isVeg ? '#10B981' : '#EF4444'}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '3px'
            }}>
              <div style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: item.isVeg ? '#10B981' : '#EF4444'
              }} />
            </div>

            {item.isBestseller && (
              <span className="cb-badge cb-badge-warning" style={{ fontSize: '10px', padding: '2px 6px' }}>
                ★ BESTSELLER
              </span>
            )}
          </div>

          <h4 style={{ fontSize: '16px', fontWeight: '800', color: 'var(--text-main)', marginBottom: '4px' }}>
            {item.name}
          </h4>

          <div style={{ fontSize: '16px', fontWeight: '900', color: 'var(--text-main)', marginBottom: '6px' }}>
            ₹{item.price}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: 'var(--text-muted)', marginBottom: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '2px', color: '#F59E0B', fontWeight: '700' }}>
              <FiStar size={13} fill="#F59E0B" />
              <span>{item.rating || 4.8}</span>
            </div>
            <span>({item.reviews || 120})</span>
          </div>

          <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: '1.4', maxWidth: '420px', margin: 0 }}>
            {item.description}
          </p>
        </div>

        {/* Favorite toggle */}
        <div style={{ marginTop: '12px' }}>
          <button
            onClick={() => toggleFavouriteFood(item.id)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '12px',
              fontWeight: '700',
              color: isFav ? 'var(--danger)' : 'var(--text-muted)'
            }}
          >
            <FiHeart size={14} fill={isFav ? 'var(--danger)' : 'none'} />
            <span>{isFav ? 'In Favourites' : 'Add to Favourite'}</span>
          </button>
        </div>
      </div>

      {/* Right Image & Both ADD + BUY/ORDER NOW Controls */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '130px', flexShrink: 0 }}>
        <div style={{ width: '130px', height: '100px', borderRadius: 'var(--radius-sm)', overflow: 'hidden', marginBottom: '8px' }}>
          <img 
            src={item.image} 
            alt={item.name} 
            style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
          />
        </div>

        {/* Control Buttons Group */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', width: '100%', alignItems: 'center' }}>
          
          {/* Item Add/Quantity Box */}
          {cartItem ? (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              background: 'white',
              border: '2px solid var(--primary)',
              borderRadius: 'var(--radius-sm)',
              boxShadow: 'var(--shadow-sm)',
              width: '100%',
              height: '34px',
              padding: '0 8px'
            }}>
              <button 
                onClick={() => updateQuantity(item.id, -1)}
                style={{ color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '900', padding: '4px' }}
                title="Decrease"
              >
                <FiMinus size={13} />
              </button>
              <span style={{ fontWeight: '900', fontSize: '14px', color: 'var(--primary)' }}>
                {cartItem.quantity}
              </span>
              <button 
                onClick={() => updateQuantity(item.id, 1)}
                style={{ color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '900', padding: '4px' }}
                title="Increase"
              >
                <FiPlus size={13} />
              </button>
            </div>
          ) : (
            <button
              onClick={() => addToCart(item, restaurant, 1)}
              style={{
                background: 'white',
                border: '1.5px solid var(--primary)',
                color: 'var(--primary)',
                fontWeight: '800',
                fontSize: '12.5px',
                borderRadius: 'var(--radius-sm)',
                boxShadow: 'var(--shadow-sm)',
                width: '100%',
                height: '34px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '4px',
                transition: 'all 0.2s',
                cursor: 'pointer'
              }}
              onMouseOver={(e) => { e.currentTarget.style.background = 'var(--primary)'; e.currentTarget.style.color = 'white'; }}
              onMouseOut={(e) => { e.currentTarget.style.background = 'white'; e.currentTarget.style.color = 'var(--primary)'; }}
            >
              <FiPlus size={13} /> ADD
            </button>
          )}

          {/* Persistent Instant ORDER NOW / BUY NOW Button (Always Visible!) */}
          <button
            onClick={handleBuyNow}
            style={{
              background: 'linear-gradient(135deg, #F97316 0%, #EA580C 100%)',
              color: 'white',
              fontWeight: '900',
              fontSize: '11.5px',
              borderRadius: 'var(--radius-sm)',
              boxShadow: '0 3px 10px rgba(249, 115, 22, 0.35)',
              width: '100%',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '4px',
              transition: 'all 0.15s ease',
              cursor: 'pointer',
              letterSpacing: '0.3px'
            }}
            onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 5px 14px rgba(249, 115, 22, 0.45)'; }}
            onMouseOut={(e) => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 3px 10px rgba(249, 115, 22, 0.35)'; }}
            title="Place order directly at checkout"
          >
            <FiZap size={13} fill="white" />
            <span>{cartItem ? `ORDER NOW (${cartItem.quantity})` : 'BUY NOW'}</span>
          </button>

        </div>
      </div>
    </div>
  );
}
