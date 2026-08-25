import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiStar, FiHeart, FiPlus, FiMinus, FiZap } from 'react-icons/fi';
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
    <div className="cb-card cb-food-item-card">
      {/* Left Details */}
      <div className="cb-food-item-details">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px', flexWrap: 'wrap' }}>
            {/* Veg / Non-Veg symbol */}
            <div style={{
              width: '16px',
              height: '16px',
              border: `2px solid ${item.isVeg ? '#10B981' : '#EF4444'}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '3px',
              flexShrink: 0
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

          <h4 className="cb-food-item-title">
            {item.name}
          </h4>

          <div className="cb-food-item-price">
            ₹{item.price}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: 'var(--text-muted)', marginBottom: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '2px', color: '#F59E0B', fontWeight: '700' }}>
              <FiStar size={13} fill="#F59E0B" />
              <span>{item.rating || 4.8}</span>
            </div>
            <span>({item.reviews || 120})</span>
          </div>

          <p className="cb-food-item-desc">
            {item.description}
          </p>
        </div>

        {/* Favorite toggle */}
        <div style={{ marginTop: '10px' }}>
          <button
            onClick={() => toggleFavouriteFood(item.id)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '5px',
              fontSize: '12px',
              fontWeight: '700',
              color: isFav ? 'var(--danger)' : 'var(--text-muted)',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '2px 0'
            }}
          >
            <FiHeart size={14} fill={isFav ? 'var(--danger)' : 'none'} />
            <span>{isFav ? 'In Favourites' : 'Add to Favourite'}</span>
          </button>
        </div>
      </div>

      {/* Right Image & Action Buttons */}
      <div className="cb-food-item-actions">
        <div className="cb-food-item-image-wrapper">
          <img 
            src={item.image} 
            alt={item.name} 
            className="cb-food-item-image"
          />
        </div>

        {/* Control Buttons */}
        <div className="cb-food-item-btn-group">
          {cartItem ? (
            <div className="cb-qty-selector">
              <button 
                onClick={() => updateQuantity(item.id, -1)}
                className="cb-qty-btn"
                title="Decrease"
              >
                <FiMinus size={13} />
              </button>
              <span className="cb-qty-value">
                {cartItem.quantity}
              </span>
              <button 
                onClick={() => updateQuantity(item.id, 1)}
                className="cb-qty-btn"
                title="Increase"
              >
                <FiPlus size={13} />
              </button>
            </div>
          ) : (
            <button
              onClick={() => addToCart(item, restaurant, 1)}
              className="cb-add-btn"
            >
              <FiPlus size={13} /> ADD
            </button>
          )}

          {/* Persistent Instant ORDER NOW / BUY NOW Button */}
          <button
            onClick={handleBuyNow}
            className="cb-buynow-btn"
            title="Place order directly at checkout"
          >
            <FiZap size={12} fill="white" />
            <span>{cartItem ? `ORDER (${cartItem.quantity})` : 'BUY NOW'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
