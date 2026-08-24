import React from 'react';
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
  FiArrowLeft
} from 'react-icons/fi';

export default function RestaurantLayout() {
  const { currentUser, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

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
      
      <div style={{ display: 'flex', flex: 1 }}>
        {/* Sidebar */}
        <aside style={{
          width: '260px',
          background: '#0F172A',
          color: '#94A3B8',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '24px 16px',
          borderRight: '1px solid #1E293B'
        }}>
          <div>
            {/* Logo */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '0 8px 24px 8px', borderBottom: '1px solid #1E293B', marginBottom: '20px' }}>
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
                <span style={{ fontSize: '18px', fontWeight: '800', color: 'white' }}>Partner Portal</span>
                <p style={{ fontSize: '11px', color: '#64748B', fontWeight: '700' }}>CraveBite Kitchens</p>
              </div>
            </div>

            {/* Restaurant badge */}
            <div style={{
              background: '#1E293B',
              padding: '12px',
              borderRadius: 'var(--radius-sm)',
              marginBottom: '24px',
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
                <p style={{ color: 'white', fontSize: '13px', fontWeight: '700', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
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

          <div>
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
                borderRadius: 'var(--radius-sm)'
              }}
            >
              <FiLogOut size={16} /> Logout Partner
            </button>
          </div>
        </aside>

        {/* Content area */}
        <main style={{ flex: 1, padding: '32px', overflowY: 'auto' }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
