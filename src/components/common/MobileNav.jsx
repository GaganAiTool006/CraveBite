import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiHome, FiCompass, FiSearch, FiPackage, FiHeart, FiUser } from 'react-icons/fi';
import { useCart } from '../../context/CartContext';

export default function MobileNav() {
  const location = useLocation();
  const { totalCartCount } = useCart();
  
  const isActive = (path) => {
    if (path === '/home') return location.pathname === '/home' || location.pathname === '/';
    return location.pathname === path;
  };

  return (
    <nav className="cb-mobile-bottom-nav">
      <Link 
        to="/home"
        className={`cb-mobile-nav-item ${isActive('/home') ? 'active' : ''}`}
      >
        <FiHome size={20} />
        <span>Home</span>
      </Link>

      <Link 
        to="/restaurants"
        className={`cb-mobile-nav-item ${isActive('/restaurants') ? 'active' : ''}`}
      >
        <FiCompass size={20} />
        <span>Explore</span>
      </Link>

      <Link 
        to="/search"
        className={`cb-mobile-nav-item ${isActive('/search') ? 'active' : ''}`}
      >
        <FiSearch size={20} />
        <span>Search</span>
      </Link>

      <Link 
        to="/orders"
        className={`cb-mobile-nav-item ${isActive('/orders') ? 'active' : ''}`}
      >
        <FiPackage size={20} />
        <span>Orders</span>
      </Link>

      <Link 
        to="/favourites"
        className={`cb-mobile-nav-item ${isActive('/favourites') ? 'active' : ''}`}
      >
        <FiHeart size={20} />
        <span>Saved</span>
      </Link>

      <Link 
        to="/profile"
        className={`cb-mobile-nav-item ${isActive('/profile') || isActive('/profile/edit') ? 'active' : ''}`}
      >
        <FiUser size={20} />
        <span>Profile</span>
      </Link>
    </nav>
  );
}
