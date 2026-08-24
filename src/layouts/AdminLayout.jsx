import React from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import RoleSwitcherBar from '../components/common/RoleSwitcherBar';
import { 
  FiShield, 
  FiUsers, 
  FiShoppingBag, 
  FiTruck, 
  FiList, 
  FiPercent, 
  FiGrid, 
  FiImage, 
  FiPieChart, 
  FiSettings, 
  FiLogOut,
  FiArrowLeft
} from 'react-icons/fi';

export default function AdminLayout() {
  const { currentUser, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { label: 'Executive Overview', path: '/admin/dashboard', icon: <FiPieChart size={18} /> },
    { label: 'Manage Users', path: '/admin/users', icon: <FiUsers size={18} /> },
    { label: 'Manage Restaurants', path: '/admin/restaurants', icon: <FiShoppingBag size={18} /> },
    { label: 'Delivery Fleet', path: '/admin/delivery-partners', icon: <FiTruck size={18} /> },
    { label: 'All Orders Monitor', path: '/admin/orders', icon: <FiList size={18} /> },
    { label: 'Coupons & Vouchers', path: '/admin/coupons', icon: <FiPercent size={18} /> },
    { label: 'Categories Master', path: '/admin/categories', icon: <FiGrid size={18} /> },
    { label: 'Promo Banners', path: '/admin/banners', icon: <FiImage size={18} /> },
    { label: 'Platform Analytics', path: '/admin/analytics', icon: <FiPieChart size={18} /> },
    { label: 'Platform Settings', path: '/admin/settings', icon: <FiSettings size={18} /> }
  ];

  const isActive = (p) => location.pathname === p;

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#F8FAFC' }}>
      <RoleSwitcherBar />
      
      <div style={{ display: 'flex', flex: 1 }}>
        {/* Admin Sidebar */}
        <aside style={{
          width: '270px',
          background: '#0B0F19',
          color: '#94A3B8',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '24px 16px',
          borderRight: '1px solid #1E293B'
        }}>
          <div>
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '0 8px 24px 8px', borderBottom: '1px solid #1E293B', marginBottom: '20px' }}>
              <div style={{
                width: '38px',
                height: '38px',
                background: 'linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: '900',
                fontSize: '18px'
              }}>
                <FiShield size={20} />
              </div>
              <div>
                <span style={{ fontSize: '18px', fontWeight: '800', color: 'white' }}>CraveBite HQ</span>
                <span style={{ fontSize: '11px', color: '#10B981', fontWeight: '700', display: 'block' }}>Super Admin Console</span>
              </div>
            </div>

            {/* Navigation */}
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
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
              <FiArrowLeft size={16} /> Exit to Customer View
            </Link>

            <button
              onClick={() => { logout(); navigate('/admin/login'); }}
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
              <FiLogOut size={16} /> Logout Admin
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
