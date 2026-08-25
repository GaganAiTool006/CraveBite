import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import RoleSwitcherBar from '../components/common/RoleSwitcherBar';
import { 
  FiTruck, 
  FiList, 
  FiDollarSign, 
  FiUser, 
  FiArrowLeft,
  FiLogOut,
  FiMenu,
  FiX
} from 'react-icons/fi';

export default function DeliveryLayout() {
  const { currentUser, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isOnline, setIsOnline] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'Active Radar', path: '/delivery/dashboard', icon: <FiTruck size={17} /> },
    { label: 'Delivery Requests', path: '/delivery/orders', icon: <FiList size={17} /> },
    { label: 'Earnings & Payouts', path: '/delivery/earnings', icon: <FiDollarSign size={17} /> },
    { label: 'Rider Profile', path: '/delivery/profile', icon: <FiUser size={17} /> }
  ];

  const isActive = (p) => location.pathname === p;

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#F8FAFC' }}>
      <RoleSwitcherBar />
      
      {/* Top Rider Bar */}
      <header style={{
        background: '#0F172A',
        color: 'white',
        padding: '12px 16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '12px',
        borderBottom: '1px solid #334155'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {/* Hamburger button for mobile */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="cb-mobile-menu-btn"
            style={{ color: 'white', background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}
            title="Open Rider Menu"
          >
            {mobileMenuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>

          <div style={{
            width: '36px',
            height: '36px',
            background: 'var(--success)',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: '900',
            fontSize: '18px',
            color: 'white',
            boxShadow: '0 4px 12px rgba(16, 185, 129, 0.35)'
          }}>
            <FiTruck size={18} />
          </div>
          <div>
            <span style={{ fontSize: '16px', fontWeight: '900', display: 'block', lineHeight: 1.2 }}>CraveBite Fleet</span>
            <span style={{ fontSize: '11px', color: '#94A3B8' }}>Rider Partner Portal</span>
          </div>
        </div>

        {/* Online / Offline Toggle & Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: isOnline ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
            border: '1.5px solid',
            borderColor: isOnline ? 'var(--success)' : 'var(--danger)',
            padding: '4px 10px',
            borderRadius: 'var(--radius-full)'
          }}>
            <span style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: isOnline ? 'var(--success)' : 'var(--danger)',
              boxShadow: isOnline ? '0 0 8px var(--success)' : 'none'
            }} />
            <span style={{ fontSize: '11.5px', fontWeight: '800', color: isOnline ? 'var(--success)' : 'var(--danger)' }}>
              {isOnline ? 'ONLINE' : 'OFFLINE'}
            </span>
            <button 
              onClick={() => setIsOnline(!isOnline)}
              style={{
                fontSize: '11px',
                fontWeight: '800',
                background: isOnline ? 'var(--success)' : 'var(--danger)',
                color: 'white',
                padding: '2px 8px',
                borderRadius: '4px',
                cursor: 'pointer',
                border: 'none'
              }}
            >
              Toggle
            </button>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }} className="cb-desktop-only">
            <Link to="/home" style={{ fontSize: '12px', color: '#94A3B8', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: '600' }}>
              <FiArrowLeft size={14} /> Customer View
            </Link>
            <button 
              onClick={() => { logout(); navigate('/delivery/login'); }} 
              style={{ color: 'var(--danger)', fontSize: '12px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', background: 'none', border: 'none' }}
            >
              <FiLogOut size={13} /> Logout
            </button>
          </div>
        </div>
      </header>

      {/* Sub Nav Tabs for desktop and mobile touch scroll */}
      <nav style={{
        background: 'white',
        borderBottom: '1px solid var(--border)',
        padding: '0 16px',
        display: 'flex',
        gap: '12px',
        overflowX: 'auto',
        scrollbarWidth: 'none',
        WebkitOverflowScrolling: 'touch'
      }}>
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '12px 6px',
              fontSize: '13px',
              fontWeight: '700',
              color: isActive(item.path) ? 'var(--primary)' : 'var(--text-muted)',
              borderBottom: '2.5px solid',
              borderColor: isActive(item.path) ? 'var(--primary)' : 'transparent',
              whiteSpace: 'nowrap',
              transition: 'color 0.2s'
            }}
          >
            {item.icon}
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>

      {/* Mobile Drawer Backdrop */}
      {mobileMenuOpen && (
        <div 
          className="cb-portal-backdrop"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Drawer for Rider */}
      {mobileMenuOpen && (
        <div className="cb-portal-sidebar mobile-show" style={{
          width: '270px',
          background: '#0F172A',
          color: '#94A3B8',
          padding: '24px 16px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          borderRight: '1px solid #1E293B'
        }}>
          <div>
            {/* Header with Close Button */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '16px', borderBottom: '1px solid #1E293B', marginBottom: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '32px', height: '32px', background: 'var(--success)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: '800' }}>
                  <FiTruck size={16} />
                </div>
                <span style={{ fontSize: '16px', fontWeight: '800', color: 'white' }}>Rider Fleet</span>
              </div>

              {/* Explicit CLOSE (✕) Button */}
              <button 
                onClick={() => setMobileMenuOpen(false)}
                className="cb-close-drawer-btn"
                title="Close Menu"
                style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: 'none',
                  color: 'white',
                  width: '32px',
                  height: '32px',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}
              >
                <FiX size={18} />
              </button>
            </div>

            {/* Rider Info Pill */}
            <div style={{ background: '#1E293B', padding: '12px', borderRadius: 'var(--radius-sm)', marginBottom: '20px' }}>
              <p style={{ color: 'white', fontSize: '13.5px', fontWeight: '800', margin: 0 }}>
                {currentUser?.name || 'Vikram Singh'}
              </p>
              <p style={{ color: '#94A3B8', fontSize: '11px', margin: '2px 0 0 0' }}>
                {currentUser?.vehicle || 'EV Bike (RJ 14 EU 5589)'}
              </p>
            </div>

            {/* Nav list */}
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '12px 14px',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '14px',
                    fontWeight: '600',
                    color: isActive(item.path) ? 'white' : '#94A3B8',
                    background: isActive(item.path) ? 'var(--primary)' : 'transparent'
                  }}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              ))}
            </nav>
          </div>

          <div style={{ marginTop: '24px' }}>
            <Link
              to="/home"
              onClick={() => setMobileMenuOpen(false)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 14px',
                fontSize: '13px',
                fontWeight: '600',
                color: '#94A3B8',
                marginBottom: '8px'
              }}
            >
              <FiArrowLeft size={16} /> Customer View
            </Link>

            <button
              onClick={() => { logout(); navigate('/delivery/login'); }}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 14px',
                fontSize: '13px',
                fontWeight: '700',
                color: 'var(--danger)',
                background: 'rgba(239, 68, 68, 0.1)',
                borderRadius: 'var(--radius-sm)',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              <FiLogOut size={16} /> Logout Rider
            </button>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main style={{ flex: 1, padding: '24px 16px', maxWidth: '1200px', width: '100%', margin: '0 auto', boxSizing: 'border-box' }}>
        <Outlet />
      </main>
    </div>
  );
}
