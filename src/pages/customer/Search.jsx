import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { FiSearch, FiX, FiTrendingUp, FiArrowRight } from 'react-icons/fi';
import { RESTAURANTS } from '../../data/mockData';
import RestaurantCard from '../../components/customer/RestaurantCard';
import FoodItemCard from '../../components/customer/FoodItemCard';

export default function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const [query, setQuery] = useState(initialQuery);

  const popularKeywords = ['Biryani', 'Pizza', 'Double Cheeseburger', 'Truffle Fries', 'Cheesecake', 'Pasta', 'Dim Sum', 'Salad'];

  // Flatten all menu items
  const allDishes = RESTAURANTS.flatMap(r => 
    (r.menu || []).map(dish => ({ ...dish, restaurant: r }))
  );

  // Filter restaurants
  const matchedRestaurants = query.trim() 
    ? RESTAURANTS.filter(r => 
        r.name.toLowerCase().includes(query.toLowerCase()) || 
        r.cuisine.some(c => c.toLowerCase().includes(query.toLowerCase()))
      )
    : [];

  // Filter dishes
  const matchedDishes = query.trim()
    ? allDishes.filter(d => 
        d.name.toLowerCase().includes(query.toLowerCase()) ||
        d.category.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const handleQuickKeyword = (kw) => {
    setQuery(kw);
    setSearchParams({ q: kw });
  };

  return (
    <div className="cb-page animate-fade-in" style={{ padding: '40px 0' }}>
      <div className="cb-container" style={{ maxWidth: '900px' }}>
        
        {/* Search Input Bar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '14px',
          background: 'white',
          borderRadius: 'var(--radius-md)',
          padding: '16px 20px',
          boxShadow: 'var(--shadow-md)',
          border: '2px solid var(--primary)',
          marginBottom: '28px'
        }}>
          <FiSearch size={24} color="var(--primary)" />
          <input 
            type="text"
            placeholder="Search for restaurants, dishes and cuisines..."
            value={query}
            onChange={(e) => { setQuery(e.target.value); setSearchParams({ q: e.target.value }); }}
            autoFocus
            style={{
              width: '100%',
              border: 'none',
              outline: 'none',
              fontSize: '17px',
              fontWeight: '600',
              color: 'var(--text-main)'
            }}
          />
          {query && (
            <button onClick={() => { setQuery(''); setSearchParams({}); }} style={{ color: 'var(--text-muted)' }}>
              <FiX size={20} />
            </button>
          )}
        </div>

        {/* Popular Searches */}
        {!query && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px', color: 'var(--text-muted)', fontSize: '13px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              <FiTrendingUp color="var(--accent)" /> Popular Cuisines & Dishes
            </div>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {popularKeywords.map((kw) => (
                <button
                  key={kw}
                  onClick={() => handleQuickKeyword(kw)}
                  style={{
                    padding: '10px 18px',
                    borderRadius: 'var(--radius-full)',
                    background: 'white',
                    border: '1.5px solid var(--border)',
                    fontSize: '14px',
                    fontWeight: '600',
                    color: 'var(--text-main)',
                    boxShadow: 'var(--shadow-xs)',
                    transition: 'all 0.2s'
                  }}
                  onMouseOver={(e) => { e.currentTarget.style.borderColor = 'var(--primary)'; e.currentTarget.style.color = 'var(--primary)'; }}
                  onMouseOut={(e) => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-main)'; }}
                >
                  {kw}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Results Section */}
        {query && (
          <div>
            {/* Restaurant Results */}
            {matchedRestaurants.length > 0 && (
              <div style={{ marginBottom: '40px' }}>
                <h3 style={{ fontSize: '20px', fontWeight: '800', marginBottom: '16px' }}>
                  Restaurants matching "{query}" ({matchedRestaurants.length})
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '20px' }}>
                  {matchedRestaurants.map(r => (
                    <RestaurantCard key={r.id} restaurant={r} />
                  ))}
                </div>
              </div>
            )}

            {/* Dishes Results */}
            {matchedDishes.length > 0 && (
              <div>
                <h3 style={{ fontSize: '20px', fontWeight: '800', marginBottom: '16px' }}>
                  Dishes matching "{query}" ({matchedDishes.length})
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {matchedDishes.map(d => (
                    <FoodItemCard key={d.id} item={d} restaurant={d.restaurant} />
                  ))}
                </div>
              </div>
            )}

            {matchedRestaurants.length === 0 && matchedDishes.length === 0 && (
              <div style={{
                background: 'white',
                borderRadius: 'var(--radius-md)',
                padding: '60px 20px',
                textAlign: 'center',
                border: '1px solid var(--border)'
              }}>
                <div style={{ fontSize: '44px', marginBottom: '12px' }}>🔍</div>
                <h3 style={{ fontSize: '20px', fontWeight: '800', marginBottom: '6px' }}>No matches found for "{query}"</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>
                  Check for spelling errors or try searching for another popular dish or cuisine.
                </p>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
