import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiHeart } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import { RESTAURANTS } from '../../data/mockData';
import RestaurantCard from '../../components/customer/RestaurantCard';
import FoodItemCard from '../../components/customer/FoodItemCard';

export default function Favourites() {
  const { currentUser } = useAuth();
  const [tab, setTab] = useState('restaurants');

  const favRestIds = currentUser?.favouriteRestaurants || [];
  const favFoodIds = currentUser?.favouriteFoods || [];

  const favouriteRestaurants = RESTAURANTS.filter(r => favRestIds.includes(r.id));
  
  const allDishes = RESTAURANTS.flatMap(r => (r.menu || []).map(d => ({ ...d, restaurant: r })));
  const favouriteFoods = allDishes.filter(d => favFoodIds.includes(d.id));

  return (
    <div className="cb-page animate-fade-in" style={{ padding: '40px 0' }}>
      <div className="cb-container">
        
        <div style={{ marginBottom: '28px' }}>
          <h1 style={{ fontSize: '30px', fontWeight: '800', color: 'var(--text-main)' }}>Your Favourites</h1>
          <p style={{ fontSize: '14px', color: 'var(--text-muted)' }}>Quickly order from your loved restaurants and saved dishes</p>
        </div>

        {/* Tab Buttons */}
        <div style={{ display: 'flex', gap: '12px', marginBottom: '32px' }}>
          <button
            onClick={() => setTab('restaurants')}
            style={{
              padding: '10px 22px',
              borderRadius: 'var(--radius-full)',
              fontSize: '14px',
              fontWeight: '700',
              background: tab === 'restaurants' ? 'var(--primary)' : 'white',
              color: tab === 'restaurants' ? 'white' : 'var(--text-main)',
              border: '1px solid var(--border)',
              boxShadow: 'var(--shadow-xs)'
            }}
          >
            Favourite Restaurants ({favouriteRestaurants.length})
          </button>

          <button
            onClick={() => setTab('foods')}
            style={{
              padding: '10px 22px',
              borderRadius: 'var(--radius-full)',
              fontSize: '14px',
              fontWeight: '700',
              background: tab === 'foods' ? 'var(--primary)' : 'white',
              color: tab === 'foods' ? 'white' : 'var(--text-main)',
              border: '1px solid var(--border)',
              boxShadow: 'var(--shadow-xs)'
            }}
          >
            Favourite Dishes ({favouriteFoods.length})
          </button>
        </div>

        {/* Content */}
        {tab === 'restaurants' && (
          <div>
            {favouriteRestaurants.length === 0 ? (
              <div className="cb-card" style={{ padding: '60px 20px', textAlign: 'center' }}>
                <div style={{ fontSize: '40px', marginBottom: '12px' }}>❤️</div>
                <h3 style={{ fontSize: '18px', fontWeight: '800' }}>No favourite restaurants yet</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '20px' }}>
                  Tap the heart icon on any restaurant card to save your top picks here.
                </p>
                <Link to="/restaurants" className="cb-btn cb-btn-primary">
                  Browse Restaurants
                </Link>
              </div>
            ) : (
              <div className="cb-grid-3">
                {favouriteRestaurants.map(r => (
                  <RestaurantCard key={r.id} restaurant={r} />
                ))}
              </div>
            )}
          </div>
        )}

        {tab === 'foods' && (
          <div>
            {favouriteFoods.length === 0 ? (
              <div className="cb-card" style={{ padding: '60px 20px', textAlign: 'center' }}>
                <div style={{ fontSize: '40px', marginBottom: '12px' }}>🍲</div>
                <h3 style={{ fontSize: '18px', fontWeight: '800' }}>No favourite dishes yet</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '20px' }}>
                  Tap the heart icon on any dish to reorder it anytime with a single tap.
                </p>
                <Link to="/restaurants" className="cb-btn cb-btn-primary">
                  Discover Menu Items
                </Link>
              </div>
            ) : (
              <div className="cb-grid-2">
                {favouriteFoods.map(d => (
                  <FoodItemCard key={d.id} item={d} restaurant={d.restaurant} />
                ))}
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
