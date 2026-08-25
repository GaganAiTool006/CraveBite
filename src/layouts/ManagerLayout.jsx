import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import RoleSwitcherBar from '../components/common/RoleSwitcherBar';
import { 
  FiBriefcase, 
  FiGrid, 
  FiUsers, 
  FiShoppingBag, 
  FiPackage, 
  FiTruck, 
  FiPercent, 
  FiStar, 
  FiPieChart, 
  FiFileText, 
  FiSettings, 
  FiLogOut,
  FiArrowLeft,
  FiMenu,
  FiX
} from 'react-icons/fi';

export default function ManagerLayout() {
  const { currentUser, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { label: 'Dashboard', path: '/manager/dashboard', icon: <FiGrid size={18} /> },
    { label: 'Customers', path: '/manager/users', icon: <FiUsers size={18} /> },
    { label: 'Restaurants', path: '/manager/restaurants', icon: <FiShoppingBag size={18} /> },
    { label: 'Live Orders', path: '/manager/orders', icon: <FiPackage size={18} /> },
    { label: 'Delivery Fleet', path: '/manager/delivery-partners', icon: <FiTruck size={18} /> },
    { label: 'Coupons & Promos', path: '/manager/coupons', icon: <FiPercent size={18} /> },
    { label: 'Reviews & Dispute', path: '/manager/reviews', icon: <FiStar size={18} /> },
    { label: 'Analytics', path: '/manager/analytics', icon: <FiPieChart size={18} /> },
    { label: 'Daily Reports', path: '/manager/reports', icon: <FiFileText size={18} /> },
    { label: 'Branch Settings', path: '/manager/settings', icon: <FiSettings size={18} /> }
  ];

  const isActive = (p) => location.pathname === p;

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#F8FAFC' }}>
      <RoleSwitcherBar />
      
      {/* Mobile Manager Top Bar */}
      <div style={{
        display: 'none',
        background: '#0F172A',
        color: 'white',
        padding: '12px 16px',
        alignItems: 'center',
        justifyContent: 'space-between',
        zIndex: 999
      }} className="cb-manager-mobile-bar">
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '32px', height: '32px', background: 'var(--primary)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800' }}>
            <FiBriefcase size={16} />
          </div>
          <span style={{ fontSize: '16px', fontWeight: '800' }}>Manager Hub</span>
        </div>

        <button 
          onClick={() => setMobileOpen(!mobileOpen)} 
          style={{ color: 'white', padding: '6px' }}
        >
          {mobileOpen ? <FiX size={22} /> : <FiMenu size={22} />}
        </button>
      </div>

      <div style={{ display: 'flex', flex: 1 }}>
        
        {/* Manager Sidebar */}
        <aside 
          className={`cb-manager-sidebar ${mobileOpen ? 'mobile-show' : ''}`}
          style={{
            width: '260px',
            background: '#0F172A',
            color: '#94A3B8',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '24px 16px',
            borderRight: '1px solid #1E293B',
            flexShrink: 0
          }}
        >
          <div>
            {/* Header with Close Button */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 4px 20px 4px', borderBottom: '1px solid #1E293B', marginBottom: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  background: 'linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)',
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontWeight: '900',
                  fontSize: '20px',
                  boxShadow: '0 4px 14px rgba(79, 70, 229, 0.4)'
                }}>
                  <FiBriefcase size={20} />
                </div>
                <div>
                  <span style={{ fontSize: '17px', fontWeight: '900', color: 'white', display: 'block' }}>Operations</span>
                  <span style={{ fontSize: '11px', color: '#10B981', fontWeight: '700' }}>● Manager Authority</span>
                </div>
              </div>

              {/* Explicit CLOSE (✕) Button inside Drawer */}
              <button
                onClick={() => setMobileOpen(false)}
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

            {/* Profile Pill */}
            <div style={{ background: '#1E293B', padding: '12px', borderRadius: 'var(--radius-sm)', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <img 
                src={currentUser?.profileImage || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&q=80'} 
                alt="Manager" 
                style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover' }} 
              />
              <div style={{ overflow: 'hidden' }}>
                <p style={{ color: 'white', fontSize: '13px', fontWeight: '700', margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {currentUser?.name || 'Operations Manager'}
                </p>
                <span style={{ fontSize: '11px', color: '#CBD5E1' }}>Role: Manager</span>
              </div>
            </div>

            {/* Navigation links */}
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileOpen(false)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '11px 14px',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '13.5px',
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
              <FiArrowLeft size={16} /> Exit to Customer View
            </Link>

            <button
              onClick={() => { logout(); navigate('/manager/login'); }}
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
              <FiLogOut size={16} /> Logout Manager
            </button>
          </div>
        </aside>

        {/* Content area */}
        <main style={{ flex: 1, padding: '32px 24px', overflowY: 'auto', maxWidth: '1200px' }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
