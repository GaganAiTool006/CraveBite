import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import RoleSwitcherBar from '../components/common/RoleSwitcherBar';
import { 
  FiGrid, 
  FiShoppingBag, 
  FiMenu, 
  FiPlusCircle, 
  FiUser, 
  FiTrendingUp, 
  FiLogOut,
  FiArrowLeft,
  FiX
} from 'react-icons/fi';

export default function RestaurantLayout() {
  const { currentUser, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'Overview', path: '/restaurant/dashboard', icon: <FiGrid size={18} /> },
    { label: 'Live Orders', path: '/restaurant/orders', icon: <FiShoppingBag size={18} /> },
    { label: 'Menu Catalog', path: '/restaurant/menu', icon: <FiMenu size={18} /> },
    { label: 'Add Food Item', path: '/restaurant/menu/add', icon: <FiPlusCircle size={18} /> },
    { label: 'Restaurant Profile', path: '/restaurant/profile', icon: <FiUser size={18} /> },
    { label: 'Sales & Analytics', path: '/restaurant/analytics', icon: <FiTrendingUp size={18} /> }
  ];

  const isActive = (p) => location.pathname === p;

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#F1F5F9' }}>
      <RoleSwitcherBar />

      {/* Mobile Top Header Bar */}
      <div className="cb-portal-mobile-bar">
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              background: 'none',
              border: 'none',
              color: 'white',
              fontSize: '22px',
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer',
              padding: '4px'
            }}
          >
            {mobileMenuOpen ? <FiX /> : <FiMenu />}
          </button>
          <span style={{ color: 'white', fontWeight: '800', fontSize: '16px' }}>
            Merchant Console
          </span>
        </div>

        <button
          onClick={() => { logout(); navigate('/restaurant/login'); }}
          style={{
            background: 'rgba(239, 68, 68, 0.2)',
            color: '#F87171',
            border: 'none',
            padding: '6px 12px',
            borderRadius: 'var(--radius-xs)',
            fontSize: '12px',
            fontWeight: '800',
            cursor: 'pointer'
          }}
        >
          Logout
        </button>
      </div>

      {/* Mobile Sidebar Backdrop */}
      {mobileMenuOpen && (
        <div 
          className="cb-portal-backdrop"
          onClick={() => setMobileMenuOpen(false)} 
        />
      )}
      
      <div style={{ display: 'flex', flex: 1, position: 'relative' }}>
        {/* Sidebar */}
        <aside className={`cb-portal-sidebar ${mobileMenuOpen ? 'mobile-show' : ''}`} style={{
          width: '260px',
          background: '#0F172A',
          color: '#94A3B8',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '24px 16px',
          borderRight: '1px solid #1E293B',
          flexShrink: 0
        }}>
          <div>
            {/* Header with Close Button */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 4px 20px 4px', borderBottom: '1px solid #1E293B', marginBottom: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{
                  width: '36px',
                  height: '36px',
                  background: 'var(--accent)',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontWeight: '900',
                  fontSize: '18px'
                }}>
                  RP
                </div>
                <div>
                  <span style={{ fontSize: '17px', fontWeight: '800', color: 'white' }}>Partner Portal</span>
                  <p style={{ fontSize: '11px', color: '#64748B', fontWeight: '700', margin: 0 }}>CraveBite Kitchens</p>
                </div>
              </div>

              {/* Explicit CLOSE (✕) Button inside Drawer */}
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

            {/* Restaurant badge */}
            <div style={{
              background: '#1E293B',
              padding: '12px',
              borderRadius: 'var(--radius-sm)',
              marginBottom: '20px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}>
              <img 
                src="https://images.unsplash.com/photo-1550547660-d9450f859349?w=100&q=80" 
                alt="Rest" 
                style={{ width: '36px', height: '36px', borderRadius: '6px', objectFit: 'cover' }} 
              />
              <div style={{ overflow: 'hidden' }}>
                <p style={{ color: 'white', fontSize: '13px', fontWeight: '700', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden', margin: 0 }}>
                  {currentUser?.restaurantName || 'Artisan Burger Co.'}
                </p>
                <span style={{ fontSize: '11px', color: '#10B981', fontWeight: '700' }}>● Live & Accepting</span>
              </div>
            </div>

            {/* Navigation links */}
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
                    background: isActive(item.path) ? 'var(--primary)' : 'transparent',
                    transition: 'all 0.2s'
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
              <FiArrowLeft size={16} /> Back to Customer App
            </Link>

            <button
              onClick={() => { logout(); navigate('/restaurant/login'); }}
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
              <FiLogOut size={16} /> Logout Partner
            </button>
          </div>
        </aside>

        {/* Content area */}
        <main className="cb-portal-main" style={{ flex: 1, padding: '32px', overflowY: 'auto', minWidth: 0 }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
