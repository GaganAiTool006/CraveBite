import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowRight, FiSearch, FiStar, FiClock, FiPercent, FiTrendingUp, FiCheckCircle } from 'react-icons/fi';
import { CATEGORIES, RESTAURANTS, POPULAR_DISHES, COUPONS } from '../../data/mockData';
import RestaurantCard from '../../components/customer/RestaurantCard';
import FoodItemCard from '../../components/customer/FoodItemCard';

export default function Home() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    } else {
      navigate('/restaurants');
    }
  };

  return (
    <div className="cb-page animate-fade-in">
      
      {/* Hero Section */}
      <section style={{
        background: 'linear-gradient(135deg, #EEF2FF 0%, #FAF5FF 50%, #FFF7ED 100%)',
        padding: '60px 0 80px 0',
        position: 'relative',
        overflow: 'hidden',
        borderBottom: '1px solid var(--border)'
      }}>
        <div className="cb-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '40px', flexWrap: 'wrap' }}>
          
          {/* Left Text */}
          <div style={{ flex: '1 1 500px', maxWidth: '620px' }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: 'white',
              border: '1px solid var(--border)',
              padding: '6px 14px',
              borderRadius: 'var(--radius-full)',
              marginBottom: '20px',
              boxShadow: 'var(--shadow-xs)'
            }}>
              <span style={{ fontSize: '14px' }}>🔥</span>
              <span style={{ fontSize: '13px', fontWeight: '800', color: 'var(--accent)' }}>50% OFF on your first 3 orders</span>
            </div>

            <motion.h1 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              style={{
                fontSize: '52px',
                fontWeight: '900',
                lineHeight: 1.12,
                color: 'var(--text-main)',
                marginBottom: '20px',
                letterSpacing: '-1px'
              }}
            >
              Good food, <br />
              delivered to your <span style={{ color: 'var(--primary)', position: 'relative' }}>
                doorstep.
              </span>
            </motion.h1>

            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              style={{
                fontSize: '18px',
                color: 'var(--text-muted)',
                marginBottom: '32px',
                lineHeight: '1.6'
              }}
            >
              Discover the finest handcrafted gourmet burgers, woodfired pizzas, royal dum biryanis, and wholesome healthy bowls delivered sizzling hot in under 30 minutes.
            </motion.p>

            {/* Quick Hero Search */}
            <form onSubmit={handleSearchSubmit} style={{
              display: 'flex',
              background: 'white',
              borderRadius: 'var(--radius-md)',
              padding: '6px',
              boxShadow: 'var(--shadow-md)',
              border: '1.5px solid var(--border)',
              maxWidth: '540px',
              marginBottom: '28px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', padding: '0 16px', flex: 1, gap: '10px' }}>
                <FiSearch size={20} color="var(--primary)" />
                <input 
                  type="text" 
                  placeholder="Search dishes, restaurants or cuisines..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    width: '100%',
                    border: 'none',
                    outline: 'none',
                    fontSize: '15px',
                    fontWeight: '500'
                  }}
                />
              </div>
              <button type="submit" className="cb-btn cb-btn-primary">
                Search
              </button>
            </form>

            <div style={{ display: 'flex', alignItems: 'center', gap: '18px', flexWrap: 'wrap' }}>
              <Link to="/restaurants" className="cb-btn cb-btn-primary cb-btn-lg">
                Explore Food <FiArrowRight />
              </Link>
              <Link to="/offers" className="cb-btn cb-btn-outline cb-btn-lg">
                <FiPercent color="var(--accent)" /> View Offers
              </Link>
            </div>
          </div>

          {/* Right Hero Image Card */}
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', bounce: 0.3 }}
            style={{ flex: '1 1 450px', position: 'relative' }}
          >
            <div style={{
              position: 'relative',
              borderRadius: 'var(--radius-lg)',
              overflow: 'hidden',
              boxShadow: 'var(--shadow-lg)',
              border: '4px solid white'
            }}>
              <img 
                src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=900&q=80" 
                alt="Feast spread" 
                style={{ width: '100%', height: '460px', objectFit: 'cover' }} 
              />
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(15, 23, 42, 0.7) 0%, transparent 60%)'
              }} />

              {/* Floating review card */}
              <div style={{
                position: 'absolute',
                bottom: '24px',
                left: '24px',
                right: '24px',
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(10px)',
                borderRadius: 'var(--radius-sm)',
                padding: '16px 20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                boxShadow: 'var(--shadow-md)'
              }}>
                <div>
                  <h4 style={{ fontSize: '15px', fontWeight: '800', color: 'var(--text-main)' }}>Express Delivery Hub</h4>
                  <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Average order arrival in 24 mins</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'var(--success-light)', color: 'var(--success)', padding: '6px 12px', borderRadius: 'var(--radius-full)', fontWeight: '800', fontSize: '13px' }}>
                  <FiCheckCircle size={16} /> 99.4% On-time
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* Categories Carousel */}
      <section style={{ padding: '60px 0 30px 0' }}>
        <div className="cb-container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <div>
              <h2 style={{ fontSize: '26px', fontWeight: '800', color: 'var(--text-main)' }}>What's on your mind?</h2>
              <p style={{ fontSize: '14px', color: 'var(--text-muted)' }}>Browse through our curated collection of culinary favorites</p>
            </div>
            <Link to="/restaurants" style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--primary)', fontWeight: '700', fontSize: '14px' }}>
              View all cuisines <FiArrowRight />
            </Link>
          </div>

          <div style={{
            display: 'flex',
            gap: '20px',
            overflowX: 'auto',
            paddingBottom: '16px',
            scrollbarWidth: 'none'
          }}>
            {CATEGORIES.map((cat) => (
              <Link 
                to={`/restaurants?cuisine=${encodeURIComponent(cat.name)}`}
                key={cat.id} 
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  minWidth: '110px',
                  cursor: 'pointer',
                  textAlign: 'center'
                }}
              >
                <div 
                  style={{
                    width: '90px',
                    height: '90px',
                    borderRadius: '50%',
                    background: 'white',
                    padding: '4px',
                    boxShadow: 'var(--shadow-sm)',
                    border: '2px solid var(--border)',
                    overflow: 'hidden',
                    marginBottom: '10px',
                    transition: 'all 0.25s'
                  }}
                  onMouseOver={(e) => { e.currentTarget.style.transform = 'scale(1.08)'; e.currentTarget.style.borderColor = 'var(--primary)'; }}
                  onMouseOut={(e) => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.borderColor = 'var(--border)'; }}
                >
                  <img src={cat.image} alt={cat.name} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} />
                </div>
                <span style={{ fontSize: '14px', fontWeight: '700', color: 'var(--text-main)' }}>{cat.name}</span>
                <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{cat.count}+ places</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Promos & Coupons Strip */}
      <section style={{ padding: '20px 0 60px 0' }}>
        <div className="cb-container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
            {COUPONS.slice(0, 3).map((cp) => (
              <div 
                key={cp.code}
                style={{
                  background: 'white',
                  border: '1.5px dashed var(--primary)',
                  borderRadius: 'var(--radius-md)',
                  padding: '18px 20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  boxShadow: 'var(--shadow-xs)'
                }}
              >
                <div>
                  <span className="cb-badge cb-badge-primary" style={{ marginBottom: '6px' }}>{cp.code}</span>
                  <h4 style={{ fontSize: '15px', fontWeight: '800', color: 'var(--text-main)', margin: '4px 0' }}>{cp.title}</h4>
                  <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{cp.description}</p>
                </div>
                <Link to="/offers" style={{ fontSize: '12px', fontWeight: '800', color: 'var(--primary)' }}>
                  APPLY
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Restaurants Grid */}
      <section style={{ padding: '0 0 60px 0' }}>
        <div className="cb-container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
            <div>
              <h2 style={{ fontSize: '26px', fontWeight: '800', color: 'var(--text-main)' }}>Top-Rated Restaurants Near You</h2>
              <p style={{ fontSize: '14px', color: 'var(--text-muted)' }}>Handpicked kitchens famous for taste, freshness, and quick delivery</p>
            </div>
            <Link to="/restaurants" className="cb-btn cb-btn-outline cb-btn-sm">
              See all ({RESTAURANTS.length})
            </Link>
          </div>

          <div className="cb-grid-3">
            {RESTAURANTS.map((rest) => (
              <RestaurantCard key={rest.id} restaurant={rest} />
            ))}
          </div>
        </div>
      </section>

      {/* Popular Trending Dishes */}
      <section style={{ padding: '0 0 80px 0', background: 'var(--bg-subtle)', margin: '40px 0 0 0', paddingTop: '60px' }}>
        <div className="cb-container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--accent)', fontWeight: '800', fontSize: '13px', textTransform: 'uppercase' }}>
                <FiTrendingUp /> Trending Right Now
              </div>
              <h2 style={{ fontSize: '26px', fontWeight: '800', color: 'var(--text-main)', marginTop: '4px' }}>Most Loved Dishes</h2>
            </div>
            <Link to="/restaurants" style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--primary)', fontWeight: '700', fontSize: '14px' }}>
              Explore Full Menus <FiArrowRight />
            </Link>
          </div>

          <div className="cb-grid-2">
            {POPULAR_DISHES.map((dish) => {
              const matchedRest = RESTAURANTS.find(r => r.id === dish.restaurantId) || RESTAURANTS[0];
              return (
                <FoodItemCard key={dish.id} item={dish} restaurant={matchedRest} />
              );
            })}
          </div>
        </div>
      </section>

    </div>
  );
}
