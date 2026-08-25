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
  FiTruck,
  FiBriefcase,
  FiMenu,
  FiX,
  FiArrowRight
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
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

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

            {/* Right: Cart & User Account & Mobile Menu Toggle */}
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

              {/* Desktop Profile Dropdown or Auth buttons */}
              {currentUser ? (
                <div style={{ position: 'relative' }} className="cb-desktop-only">
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
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }} className="cb-desktop-only">
                  <Link to="/login" className="cb-btn cb-btn-outline cb-btn-sm">
                    Sign In
                  </Link>
                  <Link to="/register" className="cb-btn cb-btn-primary cb-btn-sm">
                    Register
                  </Link>
                </div>
              )}

              {/* Mobile Hamburger Menu Button */}
              <button
                onClick={() => setMobileDrawerOpen(true)}
                className="cb-mobile-menu-btn"
                aria-label="Open Mobile Menu"
                title="Open Navigation Menu"
              >
                <FiMenu size={22} />
              </button>

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
                      to="/manager/dashboard" 
                      onClick={() => setShowMoreDropdown(false)}
                      className="cb-dropdown-item"
                    >
                      <FiBriefcase size={15} color="#0284C7" /> Operations Manager Hub
                    </Link>
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

      {/* ================= FULL MOBILE NAVIGATION DRAWER ================= */}
      {mobileDrawerOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="cb-mobile-drawer-backdrop"
            onClick={() => setMobileDrawerOpen(false)}
          />

          {/* Slide-out Drawer */}
          <div className="cb-mobile-drawer">
            
            {/* Drawer Header with Close (✕) Button */}
            <div className="cb-mobile-drawer-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div className="cb-brand-icon" style={{ width: '32px', height: '32px', fontSize: '15px' }}>CB</div>
                <span className="cb-brand-name" style={{ fontSize: '18px' }}>
                  Crave<span>Bite</span>
                </span>
              </div>

              {/* Explicit CLOSE (✕) Button */}
              <button 
                onClick={() => setMobileDrawerOpen(false)}
                className="cb-mobile-drawer-close-btn"
                title="Close Menu"
              >
                <FiX size={22} />
              </button>
            </div>

            {/* User Profile Bar inside drawer */}
            {currentUser ? (
              <div className="cb-mobile-drawer-user">
                <img 
                  src={currentUser.profileImage || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&q=80'} 
                  alt={currentUser.name} 
                  style={{ width: '42px', height: '42px', borderRadius: '50%', objectFit: 'cover' }}
                />
                <div style={{ overflow: 'hidden' }}>
                  <p style={{ fontSize: '14px', fontWeight: '800', margin: 0, color: 'var(--text-main)' }}>{currentUser.name}</p>
                  <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis' }}>{currentUser.email}</p>
                  <span style={{ fontSize: '10.5px', background: 'var(--primary-light)', color: 'var(--primary)', padding: '1px 6px', borderRadius: '4px', fontWeight: '800', textTransform: 'uppercase', display: 'inline-block', marginTop: '3px' }}>
                    {currentUser.role}
                  </span>
                </div>
              </div>
            ) : (
              <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border)', display: 'flex', gap: '10px' }}>
                <Link 
                  to="/login" 
                  onClick={() => setMobileDrawerOpen(false)}
                  className="cb-btn cb-btn-outline cb-btn-sm" 
                  style={{ flex: 1, justifyContent: 'center' }}
                >
                  Sign In
                </Link>
                <Link 
                  to="/register" 
                  onClick={() => setMobileDrawerOpen(false)}
                  className="cb-btn cb-btn-primary cb-btn-sm" 
                  style={{ flex: 1, justifyContent: 'center' }}
                >
                  Register
                </Link>
              </div>
            )}

            {/* Navigation List */}
            <div className="cb-mobile-drawer-body">
              
              <div className="cb-mobile-drawer-section">
                <span className="cb-mobile-drawer-section-title">Explore & Order</span>
                
                <Link to="/home" onClick={() => setMobileDrawerOpen(false)} className="cb-mobile-drawer-link">
                  <FiHome size={18} color="var(--primary)" /> Home Feed
                </Link>
                <Link to="/restaurants" onClick={() => setMobileDrawerOpen(false)} className="cb-mobile-drawer-link">
                  <FiCompass size={18} color="var(--primary)" /> All Restaurants & Cuisines
                </Link>
                <Link to="/search" onClick={() => setMobileDrawerOpen(false)} className="cb-mobile-drawer-link">
                  <FiSearch size={18} color="var(--primary)" /> Search Dishes
                </Link>
                <Link to="/offers" onClick={() => setMobileDrawerOpen(false)} className="cb-mobile-drawer-link">
                  <FiPercent size={18} color="var(--accent)" /> Offers & Coupons <span style={{ fontSize: '10px', background: 'var(--accent)', color: 'white', padding: '1px 6px', borderRadius: 'var(--radius-xs)', marginLeft: 'auto', fontWeight: '800' }}>HOT</span>
                </Link>
              </div>

              <div className="cb-mobile-drawer-section">
                <span className="cb-mobile-drawer-section-title">My Account</span>

                <Link to="/orders" onClick={() => setMobileDrawerOpen(false)} className="cb-mobile-drawer-link">
                  <FiPackage size={18} color="var(--primary)" /> My Orders & History
                </Link>
                <Link to="/favourites" onClick={() => setMobileDrawerOpen(false)} className="cb-mobile-drawer-link">
                  <FiHeart size={18} color="var(--danger)" /> Favourites
                </Link>
                <Link to="/addresses" onClick={() => setMobileDrawerOpen(false)} className="cb-mobile-drawer-link">
                  <FiMapPin size={18} color="var(--accent)" /> Saved Addresses
                </Link>
                <Link to="/settings" onClick={() => setMobileDrawerOpen(false)} className="cb-mobile-drawer-link">
                  <FiSettings size={18} color="var(--primary)" /> Preferences & Settings
                </Link>
                <Link to="/help" onClick={() => setMobileDrawerOpen(false)} className="cb-mobile-drawer-link">
                  <FiHelpCircle size={18} color="var(--success)" /> Help & Support
                </Link>
              </div>

              <div className="cb-mobile-drawer-section">
                <span className="cb-mobile-drawer-section-title">Internal Portals</span>

                <Link to="/manager/dashboard" onClick={() => setMobileDrawerOpen(false)} className="cb-mobile-drawer-link">
                  <FiBriefcase size={18} color="#0284C7" /> Operations Manager Hub
                </Link>
                <Link to="/restaurant/dashboard" onClick={() => setMobileDrawerOpen(false)} className="cb-mobile-drawer-link">
                  <FiShoppingBag size={18} color="var(--accent)" /> Restaurant Merchant Panel
                </Link>
                <Link to="/delivery/dashboard" onClick={() => setMobileDrawerOpen(false)} className="cb-mobile-drawer-link">
                  <FiTruck size={18} color="var(--success)" /> Delivery Fleet Portal
                </Link>
                <Link to="/admin/dashboard" onClick={() => setMobileDrawerOpen(false)} className="cb-mobile-drawer-link">
                  <FiShield size={18} color="#7C3AED" /> Admin Console
                </Link>
              </div>

              {currentUser && (
                <div style={{ padding: '16px 20px' }}>
                  <button 
                    onClick={() => { logout(); setMobileDrawerOpen(false); navigate('/login'); }}
                    className="cb-btn cb-btn-outline" 
                    style={{ width: '100%', borderColor: 'var(--danger)', color: 'var(--danger)', justifyContent: 'center' }}
                  >
                    <FiLogOut size={16} /> Log Out Account
                  </button>
                </div>
              )}

            </div>

          </div>
        </>
      )}

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
