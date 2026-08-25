import React, { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FiStar, FiClock, FiMapPin, FiHeart, FiShoppingBag, FiArrowRight, FiInfo } from 'react-icons/fi';
import { RESTAURANTS } from '../../data/mockData';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import FoodItemCard from '../../components/customer/FoodItemCard';

export default function RestaurantDetails() {
  const { restaurantId } = useParams();
  const { cart, totalCartCount, subtotal } = useCart();
  const { currentUser, toggleFavouriteRestaurant } = useAuth();

  const restaurant = RESTAURANTS.find(r => r.id === restaurantId || r.slug === restaurantId) || RESTAURANTS[0];

  const [activeCategory, setActiveCategory] = useState('All');
  const [vegOnly, setVegOnly] = useState(false);
  const [searchDish, setSearchDish] = useState('');

  const isFav = (currentUser?.favouriteRestaurants || []).includes(restaurant.id);

  // Extract unique menu categories
  const categories = useMemo(() => {
    const cats = ['All', ...new Set((restaurant.menu || []).map(item => item.category))];
    return cats;
  }, [restaurant]);

  // Filter menu
  const filteredMenu = useMemo(() => {
    return (restaurant.menu || []).filter(item => {
      if (activeCategory !== 'All' && item.category !== activeCategory) return false;
      if (vegOnly && !item.isVeg) return false;
      if (searchDish.trim() && !item.name.toLowerCase().includes(searchDish.toLowerCase())) return false;
      return true;
    });
  }, [restaurant, activeCategory, vegOnly, searchDish]);

  return (
    <div className="cb-page animate-fade-in" style={{ paddingBottom: '120px' }}>
      
      {/* Restaurant Header Hero */}
      <div style={{
        background: 'linear-gradient(to bottom, #0F172A 0%, #1E293B 100%)',
        color: 'white',
        padding: '40px 0 50px 0',
        borderBottom: '1px solid #334155'
      }}>
        <div className="cb-container">
          
          {/* Breadcrumb */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#94A3B8', marginBottom: '24px' }}>
            <Link to="/home" style={{ color: '#94A3B8' }}>Home</Link>
            <span>/</span>
            <Link to="/restaurants" style={{ color: '#94A3B8' }}>Restaurants</Link>
            <span>/</span>
            <span style={{ color: 'white', fontWeight: '700' }}>{restaurant.name}</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '30px' }}>
            
            {/* Left Info */}
            <div style={{ flex: '1 1 500px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
                <img 
                  src={restaurant.logo} 
                  alt={restaurant.name} 
                  style={{ width: '70px', height: '70px', borderRadius: '16px', objectFit: 'cover', border: '2px solid white' }} 
                />
                <div>
                  <h1 style={{ fontSize: '32px', fontWeight: '900', margin: '0 0 4px 0' }}>
                    {restaurant.name}
                  </h1>
                  <p style={{ color: '#CBD5E1', fontSize: '14px' }}>
                    {restaurant.cuisine.join(' • ')}
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#94A3B8', fontSize: '13.5px', marginBottom: '16px' }}>
                <FiMapPin size={16} color="var(--accent)" />
                <span>{restaurant.address}</span>
              </div>

              {/* Delivery stats pills */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: 'rgba(255, 255, 255, 0.1)',
                  padding: '6px 14px',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '13px',
                  fontWeight: '700'
                }}>
                  <FiClock color="var(--accent)" />
                  <span>{restaurant.deliveryTime}</span>
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: 'rgba(255, 255, 255, 0.1)',
                  padding: '6px 14px',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '13px',
                  fontWeight: '700'
                }}>
                  <span>₹{restaurant.costForTwo} for two</span>
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: 'var(--success)',
                  padding: '6px 14px',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '13px',
                  fontWeight: '800'
                }}>
                  <FiStar fill="white" size={14} />
                  <span>{restaurant.rating} ({restaurant.reviewCount} reviews)</span>
                </div>
              </div>
            </div>

            {/* Right Action / Favorite */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <button
                onClick={() => toggleFavouriteRestaurant(restaurant.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: isFav ? 'rgba(239, 68, 68, 0.2)' : 'rgba(255, 255, 255, 0.1)',
                  border: '1.5px solid',
                  borderColor: isFav ? 'var(--danger)' : 'rgba(255, 255, 255, 0.2)',
                  color: isFav ? 'var(--danger)' : 'white',
                  padding: '10px 20px',
                  borderRadius: 'var(--radius-full)',
                  fontWeight: '700',
                  fontSize: '14px',
                  cursor: 'pointer'
                }}
              >
                <FiHeart fill={isFav ? 'var(--danger)' : 'none'} size={18} />
                <span>{isFav ? 'Added to Favourites' : 'Add to Favourites'}</span>
              </button>

              {restaurant.offer && (
                <div style={{
                  background: 'var(--accent)',
                  color: 'white',
                  padding: '8px 16px',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '12.5px',
                  fontWeight: '800',
                  textAlign: 'center'
                }}>
                  🏷️ {restaurant.offer}
                </div>
              )}
            </div>

          </div>

        </div>
      </div>

      {/* Menu Section */}
      <div className="cb-container" style={{ marginTop: '36px' }}>
        
        {/* Menu Filters Bar */}
        <div style={{
          background: 'white',
          padding: '16px',
          borderRadius: 'var(--radius-md)',
          boxShadow: 'var(--shadow-xs)',
          border: '1px solid var(--border)',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          marginBottom: '28px'
        }}>
          {/* Categories Tab Selector with touch scrolling */}
          <div style={{
            display: 'flex',
            gap: '8px',
            overflowX: 'auto',
            scrollbarWidth: 'none',
            WebkitOverflowScrolling: 'touch',
            paddingBottom: '4px'
          }}>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  padding: '8px 16px',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '13px',
                  fontWeight: '700',
                  whiteSpace: 'nowrap',
                  background: activeCategory === cat ? 'var(--primary)' : 'var(--bg-subtle)',
                  color: activeCategory === cat ? 'white' : 'var(--text-main)',
                  transition: 'all 0.2s',
                  cursor: 'pointer',
                  border: 'none'
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Pure Veg Switch & Dish search */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', flexWrap: 'wrap' }}>
            <button
              onClick={() => setVegOnly(!vegOnly)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 14px',
                borderRadius: 'var(--radius-sm)',
                border: '1.5px solid',
                borderColor: vegOnly ? '#10B981' : 'var(--border)',
                background: vegOnly ? 'var(--success-light)' : 'white',
                color: vegOnly ? '#10B981' : 'var(--text-main)',
                fontSize: '13px',
                fontWeight: '700',
                cursor: 'pointer'
              }}
            >
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10B981' }} />
              <span>Veg Only</span>
            </button>

            <input 
              type="text" 
              placeholder="Search dish in menu..." 
              value={searchDish}
              onChange={(e) => setSearchDish(e.target.value)}
              style={{
                padding: '8px 14px',
                borderRadius: 'var(--radius-sm)',
                border: '1.5px solid var(--border)',
                fontSize: '13px',
                outline: 'none',
                flex: 1,
                minWidth: '160px'
              }}
            />
          </div>
        </div>

        {/* Menu Items List */}
        <div>
          <h2 style={{ fontSize: '22px', fontWeight: '800', marginBottom: '20px' }}>
            {activeCategory} ({filteredMenu.length} items)
          </h2>

          {filteredMenu.length === 0 ? (
            <div style={{ background: 'white', padding: '60px 20px', textAlign: 'center', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
              <div style={{ fontSize: '40px', marginBottom: '12px' }}>🍽️</div>
              <h3 style={{ fontSize: '18px', fontWeight: '800' }}>No dishes found</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginTop: '4px' }}>
                Try switching categories or disabling the veg filter.
              </p>
            </div>
          ) : (
            <div className="cb-grid-2">
              {filteredMenu.map(dish => (
                <FoodItemCard key={dish.id} item={dish} restaurant={restaurant} />
              ))}
            </div>
          )}
        </div>

      </div>

      {/* Floating Bottom Cart Bar */}
      {totalCartCount > 0 && (
        <div className="cb-floating-cart-bar">
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{
              background: 'white',
              color: 'var(--primary)',
              width: '40px',
              height: '40px',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: '900',
              fontSize: '16px'
            }}>
              {totalCartCount}
            </div>
            <div>
              <p style={{ fontSize: '15px', fontWeight: '800', margin: 0 }}>
                {totalCartCount} {totalCartCount === 1 ? 'item' : 'items'} added • ₹{subtotal}
              </p>
              <p style={{ fontSize: '12px', opacity: 0.85, margin: 0 }}>Extra restaurant taxes & charges may apply</p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Link 
              to="/cart" 
              style={{
                background: 'rgba(255, 255, 255, 0.2)',
                color: 'white',
                padding: '10px 16px',
                borderRadius: 'var(--radius-sm)',
                fontWeight: '800',
                fontSize: '13px',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <span>CART</span>
            </Link>

            <Link 
              to="/checkout" 
              style={{
                background: 'white',
                color: 'var(--primary)',
                padding: '10px 20px',
                borderRadius: 'var(--radius-sm)',
                fontWeight: '900',
                fontSize: '13.5px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                boxShadow: 'var(--shadow-sm)'
              }}
            >
              <span>ORDER NOW</span>
              <FiArrowRight size={16} />
            </Link>
          </div>
        </div>
      )}

    </div>
  );
}
