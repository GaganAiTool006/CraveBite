import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FiSearch, FiFilter, FiSliders, FiStar, FiClock, FiPercent, FiX } from 'react-icons/fi';
import { RESTAURANTS, CATEGORIES } from '../../data/mockData';
import RestaurantCard from '../../components/customer/RestaurantCard';

export default function RestaurantListing() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCuisine = searchParams.get('cuisine') || 'all';

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCuisine, setSelectedCuisine] = useState(initialCuisine);
  const [pureVegOnly, setPureVegOnly] = useState(false);
  const [rating4Plus, setRating4Plus] = useState(false);
  const [fastDeliveryOnly, setFastDeliveryOnly] = useState(false);
  const [offersOnly, setOffersOnly] = useState(false);
  const [sortBy, setSortBy] = useState('relevance');

  // Filter and sort logic
  const filteredRestaurants = useMemo(() => {
    return RESTAURANTS.filter((rest) => {
      // Search term
      if (searchTerm.trim()) {
        const query = searchTerm.toLowerCase();
        const matchName = rest.name.toLowerCase().includes(query);
        const matchCuisine = rest.cuisine.some(c => c.toLowerCase().includes(query));
        if (!matchName && !matchCuisine) return false;
      }

      // Cuisine filter
      if (selectedCuisine !== 'all') {
        const matchCuisine = rest.cuisine.some(c => c.toLowerCase() === selectedCuisine.toLowerCase());
        if (!matchCuisine) return false;
      }

      // Veg filter
      if (pureVegOnly && !rest.isVeg) return false;

      // Rating 4+
      if (rating4Plus && rest.rating < 4.5) return false;

      // Fast delivery (< 30 min)
      if (fastDeliveryOnly) {
        const minTime = parseInt(rest.deliveryTime.split('-')[0]) || 30;
        if (minTime > 25) return false;
      }

      // Offers only
      if (offersOnly && !rest.offer) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'deliveryTime') return parseInt(a.deliveryTime) - parseInt(b.deliveryTime);
      if (sortBy === 'costLow') return a.costForTwo - b.costForTwo;
      if (sortBy === 'costHigh') return b.costForTwo - a.costForTwo;
      return 0;
    });
  }, [searchTerm, selectedCuisine, pureVegOnly, rating4Plus, fastDeliveryOnly, offersOnly, sortBy]);

  const clearAllFilters = () => {
    setSearchTerm('');
    setSelectedCuisine('all');
    setPureVegOnly(false);
    setRating4Plus(false);
    setFastDeliveryOnly(false);
    setOffersOnly(false);
    setSortBy('relevance');
  };

  const hasActiveFilters = searchTerm || selectedCuisine !== 'all' || pureVegOnly || rating4Plus || fastDeliveryOnly || offersOnly;

  return (
    <div className="cb-page animate-fade-in" style={{ padding: '40px 0' }}>
      <div className="cb-container">
        
        {/* Header Title */}
        <div style={{ marginBottom: '28px' }}>
          <h1 style={{ fontSize: '32px', fontWeight: '800', color: 'var(--text-main)' }}>
            All Restaurants in Jaipur
          </h1>
          <p style={{ fontSize: '15px', color: 'var(--text-muted)' }}>
            Showing {filteredRestaurants.length} premium kitchen partners delivering to your area
          </p>
        </div>

        {/* Search & Sort Bar */}
        <div style={{
          background: 'white',
          borderRadius: 'var(--radius-md)',
          padding: '16px 20px',
          boxShadow: 'var(--shadow-xs)',
          border: '1px solid var(--border)',
          marginBottom: '24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px'
        }}>
          {/* Search Box */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            background: 'var(--bg-subtle)',
            borderRadius: 'var(--radius-sm)',
            padding: '10px 16px',
            flex: '1 1 300px',
            maxWidth: '480px'
          }}>
            <FiSearch size={18} color="var(--text-muted)" />
            <input 
              type="text"
              placeholder="Search by restaurant name or cuisine..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ width: '100%', border: 'none', background: 'none', outline: 'none', fontSize: '14px', fontWeight: '500' }}
            />
            {searchTerm && (
              <button onClick={() => setSearchTerm('')} style={{ color: 'var(--text-muted)' }}>
                <FiX size={16} />
              </button>
            )}
          </div>

          {/* Sort Dropdown */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '14px', fontWeight: '700', color: 'var(--text-muted)' }}>Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={{
                padding: '10px 14px',
                borderRadius: 'var(--radius-sm)',
                border: '1.5px solid var(--border)',
                background: 'white',
                fontSize: '14px',
                fontWeight: '600',
                color: 'var(--text-main)',
                cursor: 'pointer',
                outline: 'none'
              }}
            >
              <option value="relevance">Relevance</option>
              <option value="rating">Rating: High to Low</option>
              <option value="deliveryTime">Fastest Delivery</option>
              <option value="costLow">Cost: Low to High</option>
              <option value="costHigh">Cost: High to Low</option>
            </select>
          </div>
        </div>

        {/* Filter Pills */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          flexWrap: 'wrap',
          marginBottom: '24px'
        }}>
          {/* Pure Veg Pill */}
          <button
            onClick={() => setPureVegOnly(!pureVegOnly)}
            style={{
              padding: '8px 16px',
              borderRadius: 'var(--radius-full)',
              fontSize: '13px',
              fontWeight: '700',
              border: '1.5px solid',
              borderColor: pureVegOnly ? '#10B981' : 'var(--border)',
              background: pureVegOnly ? 'var(--success-light)' : 'white',
              color: pureVegOnly ? '#10B981' : 'var(--text-main)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'all 0.2s'
            }}
          >
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10B981' }} />
            <span>Pure Veg</span>
          </button>

          {/* Rating 4+ */}
          <button
            onClick={() => setRating4Plus(!rating4Plus)}
            style={{
              padding: '8px 16px',
              borderRadius: 'var(--radius-full)',
              fontSize: '13px',
              fontWeight: '700',
              border: '1.5px solid',
              borderColor: rating4Plus ? 'var(--warning)' : 'var(--border)',
              background: rating4Plus ? 'var(--warning-light)' : 'white',
              color: rating4Plus ? '#B45309' : 'var(--text-main)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'all 0.2s'
            }}
          >
            <FiStar fill={rating4Plus ? '#F59E0B' : 'none'} color="#F59E0B" />
            <span>Ratings 4.5+</span>
          </button>

          {/* Fast Delivery */}
          <button
            onClick={() => setFastDeliveryOnly(!fastDeliveryOnly)}
            style={{
              padding: '8px 16px',
              borderRadius: 'var(--radius-full)',
              fontSize: '13px',
              fontWeight: '700',
              border: '1.5px solid',
              borderColor: fastDeliveryOnly ? 'var(--primary)' : 'var(--border)',
              background: fastDeliveryOnly ? 'var(--primary-light)' : 'white',
              color: fastDeliveryOnly ? 'var(--primary)' : 'var(--text-main)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'all 0.2s'
            }}
          >
            <FiClock />
            <span>Under 25 mins</span>
          </button>

          {/* Offers */}
          <button
            onClick={() => setOffersOnly(!offersOnly)}
            style={{
              padding: '8px 16px',
              borderRadius: 'var(--radius-full)',
              fontSize: '13px',
              fontWeight: '700',
              border: '1.5px solid',
              borderColor: offersOnly ? 'var(--accent)' : 'var(--border)',
              background: offersOnly ? 'var(--accent-light)' : 'white',
              color: offersOnly ? 'var(--accent)' : 'var(--text-main)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'all 0.2s'
            }}
          >
            <FiPercent />
            <span>Special Offers</span>
          </button>

          {hasActiveFilters && (
            <button
              onClick={clearAllFilters}
              style={{
                fontSize: '13px',
                fontWeight: '700',
                color: 'var(--danger)',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                marginLeft: '8px'
              }}
            >
              <FiX /> Clear Filters
            </button>
          )}
        </div>

        {/* Cuisine Selector Chips */}
        <div style={{
          display: 'flex',
          gap: '10px',
          overflowX: 'auto',
          paddingBottom: '12px',
          marginBottom: '32px',
          scrollbarWidth: 'none'
        }}>
          <button
            onClick={() => setSelectedCuisine('all')}
            style={{
              padding: '8px 16px',
              borderRadius: 'var(--radius-sm)',
              fontSize: '13px',
              fontWeight: '700',
              whiteSpace: 'nowrap',
              background: selectedCuisine === 'all' ? 'var(--text-main)' : 'white',
              color: selectedCuisine === 'all' ? 'white' : 'var(--text-main)',
              border: '1px solid var(--border)'
            }}
          >
            All Cuisines
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCuisine(cat.name)}
              style={{
                padding: '8px 16px',
                borderRadius: 'var(--radius-sm)',
                fontSize: '13px',
                fontWeight: '700',
                whiteSpace: 'nowrap',
                background: selectedCuisine.toLowerCase() === cat.name.toLowerCase() ? 'var(--primary)' : 'white',
                color: selectedCuisine.toLowerCase() === cat.name.toLowerCase() ? 'white' : 'var(--text-main)',
                border: '1px solid var(--border)'
              }}
            >
              {cat.emoji} {cat.name}
            </button>
          ))}
        </div>

        {/* Restaurants Grid */}
        {filteredRestaurants.length === 0 ? (
          <div style={{
            background: 'white',
            borderRadius: 'var(--radius-md)',
            padding: '80px 20px',
            textAlign: 'center',
            border: '1px solid var(--border)'
          }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>🍽️</div>
            <h3 style={{ fontSize: '20px', fontWeight: '800', marginBottom: '8px' }}>No restaurants found</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '24px' }}>
              We couldn't find any restaurants matching your selected search or filter criteria.
            </p>
            <button onClick={clearAllFilters} className="cb-btn cb-btn-primary">
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="cb-grid-3">
            {filteredRestaurants.map((rest) => (
              <RestaurantCard key={rest.id} restaurant={rest} />
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
