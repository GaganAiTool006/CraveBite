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
  FiLogOut
} from 'react-icons/fi';

export default function DeliveryLayout() {
  const { logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isOnline, setIsOnline] = useState(true);

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
        padding: '12px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '12px',
        borderBottom: '1px solid #334155'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '38px',
            height: '38px',
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
            <FiTruck size={20} />
          </div>
          <div>
            <span style={{ fontSize: '17px', fontWeight: '900', display: 'block', lineHeight: 1.2 }}>CraveBite Fleet</span>
            <span style={{ fontSize: '11px', color: '#94A3B8' }}>Delivery Partner Portal</span>
          </div>
        </div>

        {/* Online / Offline Toggle & Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: isOnline ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
            border: '1.5px solid',
            borderColor: isOnline ? 'var(--success)' : 'var(--danger)',
            padding: '4px 12px',
            borderRadius: 'var(--radius-full)'
          }}>
            <span style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: isOnline ? 'var(--success)' : 'var(--danger)',
              boxShadow: isOnline ? '0 0 8px var(--success)' : 'none'
            }} />
            <span style={{ fontSize: '12px', fontWeight: '800', color: isOnline ? 'var(--success)' : 'var(--danger)' }}>
              {isOnline ? 'DUTY ONLINE' : 'DUTY OFFLINE'}
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
                cursor: 'pointer'
              }}
            >
              Toggle
            </button>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Link to="/home" style={{ fontSize: '12.5px', color: '#94A3B8', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: '600' }}>
              <FiArrowLeft size={14} /> Customer View
            </Link>
            <button 
              onClick={() => { logout(); navigate('/delivery/login'); }} 
              style={{ color: 'var(--danger)', fontSize: '12.5px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
            >
              <FiLogOut size={13} /> Logout
            </button>
          </div>
        </div>
      </header>

      {/* Sub Nav Tabs with responsive horizontal scroll */}
      <nav style={{
        background: 'white',
        borderBottom: '1px solid var(--border)',
        padding: '0 20px',
        display: 'flex',
        gap: '16px',
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
              gap: '8px',
              padding: '14px 6px',
              fontSize: '13.5px',
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

      {/* Main Content Area */}
      <main style={{ flex: 1, padding: '24px 16px', maxWidth: '1200px', width: '100%', margin: '0 auto', boxSizing: 'border-box' }}>
        <Outlet />
      </main>
    </div>
  );
}
