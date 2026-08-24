import React from 'react';
import { Navigation, Search, User } from 'lucide-react';

export default function Header({
  activeLocation,
  onOpenLocationModal,
  searchQuery,
  onSearchChange,
  onNavigate,
  onOpenAuth,
  user
}) {
  return (
    <header className="navbar" style={{ padding: '0 24px', height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #f0f0f5', background: 'white' }}>
      
      {/* Left: Logo & Location */}
      <div className="header-left" style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
        <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('home'); }} style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <svg viewBox="0 0 512 512" width="40" height="40" fill="#FC8019" className="header-logo">
            <path d="M296.3 35.8c-134.4 0-179.9 82.5-179.9 143.9 0 46.1 27.5 75.9 74.4 75.9 22.1 0 43.1-13.6 43.1-34.9 0-21.4-15.5-27.1-33.5-35.4-8.8-4-15.9-9.1-15.9-19.1 0-19.1 21.7-44.5 107.5-44.5 45.3 0 71.4 15.1 71.4 46.1 0 28.5-19.1 43.1-46.1 63.6-56.1 42.6-107.5 95.6-107.5 174.9 0 29.5 7 51.1 19.1 69.4L188 471.2c-5.5 2.5-7 9.1-3.5 14.1l20.1 28.6c3 4 8.5 5 13.1 2.5l56.3-30.6c13.6 5.5 29.1 8 46.1 8 134.4 0 179.9-82.5 179.9-143.9 0-46.1-27.5-75.9-74.4-75.9-22.1 0-43.1 13.6-43.1 34.9 0 21.4 15.5 27.1 33.5 35.4 8.8 4 15.9 9.1 15.9 19.1 0 19.1-21.7 44.5-107.5 44.5-45.3 0-71.4-15.1-71.4-46.1 0-28.5 19.1-43.1 46.1-63.6 56.1-42.6 107.5-95.6 107.5-174.9 0-78.4-70.3-137.9-209.6-137.9z"/>
          </svg>
          <span className="header-brand-name" style={{ fontSize: '26px', fontWeight: '800', color: '#FC8019', letterSpacing: '-0.5px' }}>Swiggy</span>
        </a>

        <button className="header-location-btn" onClick={onOpenLocationModal} style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
          <Navigation size={18} fill="#FC8019" color="#FC8019" style={{ transform: 'rotate(45deg)' }} />
          <span className="header-location-text" style={{ fontSize: '15px', fontWeight: '700', color: 'var(--text-dark)' }}>Setup your precise location</span>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#FC8019" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>
        </button>
      </div>

      {/* Center: Search Bar */}
      <div className="header-search" style={{ flex: 1, maxWidth: '600px', margin: '0 40px' }}>
        <div style={{ position: 'relative', width: '100%', height: '52px' }}>
          <input
            type="text"
            placeholder="Search for restaurant and food"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            style={{
              width: '100%',
              height: '100%',
              background: '#f0f0f5',
              border: 'none',
              borderRadius: '12px',
              padding: '0 50px 0 20px',
              fontSize: '16px',
              color: 'var(--text-dark)',
              outline: 'none',
              fontWeight: '500'
            }}
          />
          <Search size={20} color="#686b78" style={{ position: 'absolute', right: '16px', top: '16px' }} />
        </div>
      </div>

      {/* Right: Profile */}
      <div>
        <button 
          onClick={() => { if (user) onNavigate('profile'); else onOpenAuth(); }}
          style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#3d4152', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}
        >
          {user ? <span style={{ fontWeight: '800', fontSize: '18px' }}>{user.name.charAt(0).toUpperCase()}</span> : <User size={24} color="white" />}
        </button>
      </div>
      
    </header>
  );
}
