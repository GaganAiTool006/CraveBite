import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiStar, FiHeart, FiClock } from 'react-icons/fi';

const CATEGORIES = [
  { name: 'Pizza', emoji: '🍕' },
  { name: 'Burger', emoji: '🍔' },
  { name: 'Biryani', emoji: '🥘' },
  { name: 'Healthy', emoji: '🥗' },
  { name: 'Desserts', emoji: '🍰' },
  { name: 'Beverages', emoji: '🥤' }
];

const RESTAURANTS = [
  { id: 1, name: 'The Burger Joint', rating: 4.8, time: '25-30 min', price: '₹400 for two', cuisine: 'American, Fast Food', img: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&h=400&fit=crop' },
  { id: 2, name: 'Spicy Biryani House', rating: 4.5, time: '35-40 min', price: '₹600 for two', cuisine: 'North Indian, Mughlai', img: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=600&h=400&fit=crop' },
  { id: 3, name: 'Pizza Paradise', rating: 4.2, time: '30-45 min', price: '₹800 for two', cuisine: 'Italian, Pizzas', img: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=600&h=400&fit=crop' },
];

export default function Home() {
  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section style={{ background: 'var(--primary-light)', padding: '80px 0', overflow: 'hidden' }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', gap: '40px' }}>
          <div style={{ flex: 1 }}>
            <motion.h1 
              initial={{ y: 20, opacity: 0 }} 
              animate={{ y: 0, opacity: 1 }} 
              style={{ fontSize: '56px', fontWeight: '800', lineHeight: 1.1, marginBottom: '24px', color: 'var(--text-main)' }}
            >
              Good food, <br/>delivered to your <span style={{ color: 'var(--primary)' }}>doorstep.</span>
            </motion.h1>
            <motion.p 
              initial={{ y: 20, opacity: 0 }} 
              animate={{ y: 0, opacity: 1 }} 
              transition={{ delay: 0.1 }}
              style={{ fontSize: '18px', color: 'var(--text-muted)', marginBottom: '32px', maxWidth: '480px' }}
            >
              Explore thousands of restaurants and get your favorite meals delivered fast and fresh.
            </motion.p>
            <motion.div 
              initial={{ y: 20, opacity: 0 }} 
              animate={{ y: 0, opacity: 1 }} 
              transition={{ delay: 0.2 }}
              style={{ display: 'flex', gap: '16px' }}
            >
              <Link to="/restaurants" className="btn btn-primary" style={{ padding: '16px 32px', fontSize: '16px' }}>
                Explore Food
              </Link>
              <Link to="/restaurants" className="btn btn-outline" style={{ padding: '16px 32px', fontSize: '16px' }}>
                Order Now
              </Link>
            </motion.div>
          </div>
          <div style={{ flex: 1, position: 'relative' }}>
            <motion.img 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', bounce: 0.4 }}
              src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80" 
              alt="Delicious Food" 
              style={{ width: '100%', height: '500px', objectFit: 'cover', borderRadius: '40px', boxShadow: 'var(--shadow-lg)' }} 
            />
          </div>
        </div>
      </section>

      {/* Categories */}
      <section style={{ padding: '80px 0' }}>
        <div className="container">
          <h2 style={{ fontSize: '28px', fontWeight: '800', marginBottom: '32px' }}>What's on your mind?</h2>
          <div style={{ display: 'flex', gap: '24px', overflowX: 'auto', paddingBottom: '16px', scrollbarWidth: 'none' }}>
            {CATEGORIES.map(cat => (
              <div key={cat.name} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', minWidth: '100px', cursor: 'pointer' }}>
                <div style={{ width: '80px', height: '80px', background: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '32px', boxShadow: 'var(--shadow-sm)', transition: 'transform 0.2s' }} onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'} onMouseOut={(e) => e.currentTarget.style.transform = 'none'}>
                  {cat.emoji}
                </div>
                <span style={{ fontWeight: '600', fontSize: '15px' }}>{cat.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Restaurants */}
      <section style={{ padding: '0 0 80px 0' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
            <h2 style={{ fontSize: '28px', fontWeight: '800' }}>Top restaurant chains</h2>
            <Link to="/restaurants" style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--primary)', fontWeight: '700' }}>
              See all <FiArrowRight />
            </Link>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '32px' }}>
            {RESTAURANTS.map(rest => (
              <Link to={`/restaurants/${rest.id}`} key={rest.id} style={{ display: 'block', background: 'white', borderRadius: '24px', overflow: 'hidden', boxShadow: 'var(--shadow-sm)', transition: 'all 0.3s' }} onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-8px)'; e.currentTarget.style.boxShadow = 'var(--shadow-lg)'; }} onMouseOut={(e) => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'var(--shadow-sm)'; }}>
                <div style={{ position: 'relative', height: '200px' }}>
                  <img src={rest.img} alt={rest.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <button style={{ position: 'absolute', top: '16px', right: '16px', width: '36px', height: '36px', background: 'rgba(255,255,255,0.9)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>
                    <FiHeart size={18} />
                  </button>
                </div>
                <div style={{ padding: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                    <h3 style={{ fontSize: '20px', fontWeight: '800', margin: 0 }}>{rest.name}</h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', background: 'var(--success)', color: 'white', padding: '4px 8px', borderRadius: '8px', fontSize: '13px', fontWeight: '700' }}>
                      <FiStar /> {rest.rating}
                    </div>
                  </div>
                  <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '16px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {rest.cuisine}
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px', color: 'var(--text-main)', fontSize: '14px', fontWeight: '600' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><FiClock color="var(--primary)" /> {rest.time}</span>
                    <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'var(--border-light)' }}></span>
                    <span>{rest.price}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
