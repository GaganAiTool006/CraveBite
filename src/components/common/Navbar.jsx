import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { 
  FiSearch, 
  FiShoppingBag, 
  FiUser, 
  FiHeart, 
  FiMapPin, 
  FiPercent, 
  FiPackage, 
  FiChevronDown, 
  FiLogOut,
  FiSettings,
  FiHelpCircle,
  FiHome,
  FiCompass,
  FiTag,
  FiMoreHorizontal,
  FiShield,
  FiTruck
} from 'react-icons/fi';

export default function Navbar() {
  const { currentUser, logout } = useAuth();
  const { totalCartCount } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [showMoreDropdown, setShowMoreDropdown] = useState(false);
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState('Sector 45, Jaipur');

  const locationsList = [
    'Sector 45, Jaipur',
    'Civil Lines, Jaipur',
    'Malviya Nagar, Jaipur',
    'C-Scheme, Jaipur',
    'Bani Park, Jaipur',
    'Mansarovar, Jaipur'
  ];

  const isActive = (path) => {
    if (path === '/home') return location.pathname === '/home' || location.pathname === '/';
    return location.pathname === path;
  };

  return (
    <>
      <header className="cb-navbar-wrapper">
        
        {/* ================= LEVEL 1: MAIN PRIMARY NAVBAR ================= */}
        <div className="cb-navbar-primary">
          <div className="cb-container cb-navbar-inner">
            
            {/* Left: Brand Logo & Location */}
            <div className="cb-navbar-left">
              <Link to="/home" className="cb-navbar-brand">
                <div className="cb-brand-icon">CB</div>
                <div className="cb-brand-text">
                  <span className="cb-brand-name">
                    Crave<span>Bite</span>
                  </span>
                </div>
              </Link>

              {/* Location Picker */}
              <div 
                className="cb-location-picker"
                onClick={() => setShowLocationModal(!showLocationModal)}
              >
                <FiMapPin size={14} color="var(--accent)" />
                <div className="cb-location-text">
                  <span className="cb-location-label">Deliver to</span>
                  <span className="cb-location-val">{selectedLocation}</span>
                </div>
                <FiChevronDown size={12} color="var(--text-muted)" />
              </div>
            </div>

            {/* Center: Main Primary Navigation Links */}
            <nav className="cb-navbar-primary-links">
              <Link 
                to="/home" 
                className={`cb-main-nav-link ${isActive('/home') ? 'active' : ''}`}
              >
                <FiHome size={16} />
                <span>Home</span>
              </Link>

              <Link 
                to="/restaurants" 
                className={`cb-main-nav-link ${isActive('/restaurants') ? 'active' : ''}`}
              >
                <FiCompass size={16} />
                <span>Restaurants</span>
              </Link>

              <Link 
                to="/search" 
                className={`cb-main-nav-link ${isActive('/search') ? 'active' : ''}`}
              >
                <FiSearch size={16} />
                <span>Search</span>
              </Link>
            </nav>

            {/* Right: Cart & User Account */}
            <div className="cb-navbar-right">
              
              {/* Cart Button */}
              <Link 
                to="/cart"
                className={`cb-cart-btn ${totalCartCount > 0 ? 'has-items' : ''}`}
                title="View Cart"
              >
                <FiShoppingBag size={18} />
                <span className="cb-cart-btn-text">Cart</span>
                {totalCartCount > 0 && (
                  <span className="cb-cart-badge">{totalCartCount}</span>
                )}
              </Link>

              {/* Profile Dropdown or Auth buttons */}
              {currentUser ? (
                <div style={{ position: 'relative' }}>
                  <button 
                    onClick={() => {
                      setShowUserDropdown(!showUserDropdown);
                      setShowMoreDropdown(false);
                    }}
                    className="cb-user-menu-btn"
                  >
                    <img 
                      src={currentUser.profileImage || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&q=80'} 
                      alt={currentUser.name} 
                      className="cb-user-avatar"
                    />
                    <div className="cb-user-info-text">
                      <span className="cb-user-name">{currentUser.name}</span>
                      <span className="cb-user-role">{currentUser.role}</span>
                    </div>
                    <FiChevronDown size={14} color="var(--text-muted)" />
                  </button>

                  {showUserDropdown && (
                    <div className="cb-dropdown-menu">
                      <div style={{ padding: '10px 16px', borderBottom: '1px solid var(--border)' }}>
                        <p style={{ fontSize: '14px', fontWeight: '800', margin: 0 }}>{currentUser.name}</p>
                        <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: 0 }}>{currentUser.email}</p>
                      </div>

                      <Link 
                        to="/profile" 
                        onClick={() => setShowUserDropdown(false)}
                        className="cb-dropdown-item"
                      >
                        <FiUser size={16} color="var(--primary)" /> Profile & Details
                      </Link>

                      <Link 
                        to="/orders" 
                        onClick={() => setShowUserDropdown(false)}
                        className="cb-dropdown-item"
                      >
                        <FiPackage size={16} color="var(--primary)" /> My Orders
                      </Link>

                      <Link 
                        to="/favourites" 
                        onClick={() => setShowUserDropdown(false)}
                        className="cb-dropdown-item"
                      >
                        <FiHeart size={16} color="var(--danger)" /> Favourites
                      </Link>

                      <Link 
                        to="/addresses" 
                        onClick={() => setShowUserDropdown(false)}
                        className="cb-dropdown-item"
                      >
                        <FiMapPin size={16} color="var(--accent)" /> Saved Addresses
                      </Link>

                      <Link 
                        to="/settings" 
                        onClick={() => setShowUserDropdown(false)}
                        className="cb-dropdown-item"
                      >
                        <FiSettings size={16} color="var(--primary)" /> Preferences
                      </Link>

                      <Link 
                        to="/help" 
                        onClick={() => setShowUserDropdown(false)}
                        className="cb-dropdown-item"
                      >
                        <FiHelpCircle size={16} color="var(--success)" /> Help & Support
                      </Link>

                      <div style={{ borderTop: '1px solid var(--border)', margin: '4px 0' }} />

                      <button 
                        onClick={() => { logout(); setShowUserDropdown(false); navigate('/login'); }}
                        className="cb-dropdown-item cb-logout-btn"
                      >
                        <FiLogOut size={16} /> Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Link to="/login" className="cb-btn cb-btn-outline cb-btn-sm">
                    Sign In
                  </Link>
                  <Link to="/register" className="cb-btn cb-btn-primary cb-btn-sm">
                    Register
                  </Link>
                </div>
              )}

            </div>

          </div>
        </div>

        {/* ================= LEVEL 2: SECONDARY NAVIGATION ROW ================= */}
        <div className="cb-navbar-secondary">
          <div className="cb-container">
            <div className="cb-secondary-scroll-container">
              
              <Link 
                to="/offers" 
                className={`cb-sub-nav-item ${isActive('/offers') ? 'active' : ''}`}
              >
                <FiPercent size={14} color="var(--accent)" />
                <span>Offers & Deals</span>
                <span className="cb-sub-nav-badge">HOT</span>
              </Link>

              <Link 
                to="/favourites" 
                className={`cb-sub-nav-item ${isActive('/favourites') ? 'active' : ''}`}
              >
                <FiHeart size={14} color={isActive('/favourites') ? 'var(--danger)' : 'var(--text-muted)'} />
                <span>Favourites</span>
              </Link>

              <Link 
                to="/orders" 
                className={`cb-sub-nav-item ${isActive('/orders') ? 'active' : ''}`}
              >
                <FiPackage size={14} />
                <span>My Orders</span>
              </Link>

              <Link 
                to="/addresses" 
                className={`cb-sub-nav-item ${isActive('/addresses') ? 'active' : ''}`}
              >
                <FiMapPin size={14} />
                <span>Saved Addresses</span>
              </Link>

              <Link 
                to="/help" 
                className={`cb-sub-nav-item ${isActive('/help') ? 'active' : ''}`}
              >
                <FiHelpCircle size={14} />
                <span>Help & Support</span>
              </Link>

              <Link 
                to="/settings" 
                className={`cb-sub-nav-item ${isActive('/settings') ? 'active' : ''}`}
              >
                <FiSettings size={14} />
                <span>Preferences</span>
              </Link>

              {/* More Portals Dropdown */}
              <div style={{ position: 'relative', display: 'inline-flex' }}>
                <button
                  onClick={() => {
                    setShowMoreDropdown(!showMoreDropdown);
                    setShowUserDropdown(false);
                  }}
                  className={`cb-sub-nav-item cb-more-btn ${showMoreDropdown ? 'active' : ''}`}
                >
                  <FiMoreHorizontal size={14} />
                  <span>Portals</span>
                  <FiChevronDown size={12} />
                </button>

                {showMoreDropdown && (
                  <div className="cb-dropdown-menu cb-more-dropdown-menu">
                    <Link 
                      to="/restaurant/dashboard" 
                      onClick={() => setShowMoreDropdown(false)}
                      className="cb-dropdown-item"
                    >
                      <FiShoppingBag size={15} color="var(--accent)" /> Restaurant Merchant Panel
                    </Link>
                    <Link 
                      to="/delivery/dashboard" 
                      onClick={() => setShowMoreDropdown(false)}
                      className="cb-dropdown-item"
                    >
                      <FiTruck size={15} color="var(--success)" /> Delivery Rider Panel
                    </Link>
                    <Link 
                      to="/admin/dashboard" 
                      onClick={() => setShowMoreDropdown(false)}
                      className="cb-dropdown-item"
                    >
                      <FiShield size={15} color="#7C3AED" /> Admin Console
                    </Link>
                  </div>
                )}
              </div>

            </div>
          </div>
        </div>

      </header>

      {/* Location Modal */}
      {showLocationModal && (
        <div className="cb-modal-backdrop" onClick={() => setShowLocationModal(false)}>
          <div className="cb-modal-box" onClick={e => e.stopPropagation()}>
            <h3 style={{ fontSize: '18px', fontWeight: '800', marginBottom: '16px' }}>Select Delivery Location</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
              {locationsList.map((loc) => (
                <div 
                  key={loc}
                  onClick={() => { setSelectedLocation(loc); setShowLocationModal(false); }}
                  className={`cb-location-option ${selectedLocation === loc ? 'active' : ''}`}
                >
                  <FiMapPin color={selectedLocation === loc ? 'var(--primary)' : 'var(--text-muted)'} />
                  <span>{loc}</span>
                </div>
              ))}
            </div>
            <button 
              className="cb-btn cb-btn-subtle" 
              style={{ width: '100%' }}
              onClick={() => setShowLocationModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
