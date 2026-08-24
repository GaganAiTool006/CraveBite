import React from 'react';
import { Link } from 'react-router-dom';
import { FiStar, FiClock, FiHeart, FiArrowRight, FiZap } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';

export default function RestaurantCard({ restaurant }) {
  const { currentUser, toggleFavouriteRestaurant } = useAuth();
  const isFav = (currentUser?.favouriteRestaurants || []).includes(restaurant.id);

  return (
    <div 
      className="cb-card"
      style={{
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative'
      }}
    >
      {/* Cover Image */}
      <div style={{ position: 'relative', width: '100%', height: '190px' }}>
        <Link to={`/restaurant/${restaurant.id}`}>
          <img 
            src={restaurant.coverImage} 
            alt={restaurant.name} 
            style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s ease' }} 
            onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
            onMouseOut={(e) => e.target.style.transform = 'none'}
          />
        </Link>
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 60%)',
          pointerEvents: 'none'
        }} />

        {/* Offer badge */}
        {restaurant.offer && (
          <div style={{
            position: 'absolute',
            bottom: '12px',
            left: '12px',
            background: 'var(--accent)',
            color: 'white',
            fontSize: '11px',
            fontWeight: '800',
            padding: '4px 8px',
            borderRadius: 'var(--radius-xs)',
            textTransform: 'uppercase',
            letterSpacing: '0.5px'
          }}>
            {restaurant.offer}
          </div>
        )}

        {/* Favorite Heart Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleFavouriteRestaurant(restaurant.id);
          }}
          style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.95)',
            boxShadow: 'var(--shadow-sm)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: isFav ? 'var(--danger)' : '#64748B',
            transition: 'all 0.2s',
            zIndex: 10,
            cursor: 'pointer'
          }}
          title={isFav ? "Remove from favourites" : "Add to favourites"}
        >
          <FiHeart size={18} fill={isFav ? 'var(--danger)' : 'none'} />
        </button>

        {/* Veg badge if pure veg */}
        {restaurant.isVeg && (
          <div style={{
            position: 'absolute',
            top: '12px',
            left: '12px',
            background: '#10B981',
            color: 'white',
            fontSize: '10px',
            fontWeight: '800',
            padding: '3px 8px',
            borderRadius: '4px'
          }}>
            PURE VEG
          </div>
        )}
      </div>

      {/* Details */}
      <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
            <Link to={`/restaurant/${restaurant.id}`}>
              <h3 style={{ fontSize: '18px', fontWeight: '800', color: 'var(--text-main)', margin: 0 }}>
                {restaurant.name}
              </h3>
            </Link>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              background: 'var(--success)',
              color: 'white',
              padding: '3px 7px',
              borderRadius: '6px',
              fontSize: '12px',
              fontWeight: '800'
            }}>
              <FiStar size={12} fill="white" />
              <span>{restaurant.rating}</span>
            </div>
          </div>

          <p style={{
            fontSize: '13px',
            color: 'var(--text-muted)',
            marginBottom: '12px',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}>
            {restaurant.cuisine.join(', ')}
          </p>
        </div>

        <div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: '12px',
            borderTop: '1px solid var(--border)',
            fontSize: '12.5px',
            fontWeight: '700',
            color: 'var(--text-main)',
            marginBottom: '12px'
          }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--primary)' }}>
              <FiClock size={14} />
              <span>{restaurant.deliveryTime}</span>
            </span>

            <span style={{ color: 'var(--text-muted)' }}>•</span>

            <span>{restaurant.distance}</span>

            <span style={{ color: 'var(--text-muted)' }}>•</span>

            <span>₹{restaurant.costForTwo} for two</span>
          </div>

          {/* Quick Order / Explore Menu CTA Button */}
          <Link
            to={`/restaurant/${restaurant.id}`}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              width: '100%',
              padding: '10px 14px',
              borderRadius: 'var(--radius-sm)',
              background: 'var(--primary-50)',
              color: 'var(--primary)',
              fontWeight: '800',
              fontSize: '13px',
              border: '1.5px solid var(--primary-light)',
              transition: 'all 0.2s ease',
              cursor: 'pointer'
            }}
            onMouseOver={(e) => { e.currentTarget.style.background = 'var(--primary)'; e.currentTarget.style.color = 'white'; }}
            onMouseOut={(e) => { e.currentTarget.style.background = 'var(--primary-50)'; e.currentTarget.style.color = 'var(--primary)'; }}
          >
            <FiZap size={14} />
            <span>ORDER FOOD • VIEW MENU</span>
            <FiArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}
