import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { FiUsers, FiShoppingBag, FiTruck, FiShield, FiBriefcase, FiLock } from 'react-icons/fi';

export default function RoleSwitcherBar() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handlePortalNavigate = (roleKey, targetPath) => {
    if (roleKey === 'customer') {
      navigate('/home');
      return;
    }

    // If current user is already authorized for this role, navigate directly
    if (currentUser && (currentUser.role === roleKey || currentUser.role === 'admin')) {
      navigate(targetPath);
    } else {
      // Direct to secure login with role portal preselected
      navigate(`/login?portal=${roleKey}`);
    }
  };

  return (
    <div className="demo-role-bar">
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span style={{ fontWeight: '800', color: '#F97316' }}>🌐 CraveBite Portals:</span>
        <span>
          Signed in: <strong>{currentUser?.name || 'Guest'}</strong> 
          <span style={{ opacity: 0.75, fontSize: '11px', marginLeft: '4px' }}>({currentUser?.role || 'Not logged in'})</span>
        </span>
      </div>

      <div className="demo-role-pills">
        <button
          className={`demo-role-pill ${currentUser?.role === 'customer' && !location.pathname.startsWith('/admin') && !location.pathname.startsWith('/restaurant') && !location.pathname.startsWith('/delivery') && !location.pathname.startsWith('/manager') ? 'active' : ''}`}
          onClick={() => handlePortalNavigate('customer', '/home')}
        >
          <FiUsers style={{ marginRight: '4px' }} /> Customer Website
        </button>

        <button
          className={`demo-role-pill ${location.pathname.startsWith('/manager') ? 'active' : ''}`}
          onClick={() => handlePortalNavigate('manager', '/manager/dashboard')}
          title="Protected: Requires Manager Credentials"
        >
          <FiBriefcase style={{ marginRight: '4px' }} /> Manager Hub
        </button>

        <button
          className={`demo-role-pill ${location.pathname.startsWith('/restaurant') ? 'active' : ''}`}
          onClick={() => handlePortalNavigate('restaurant', '/restaurant/dashboard')}
          title="Protected: Requires Restaurant Credentials"
        >
          <FiShoppingBag style={{ marginRight: '4px' }} /> Restaurant Portal
        </button>

        <button
          className={`demo-role-pill ${location.pathname.startsWith('/delivery') ? 'active' : ''}`}
          onClick={() => handlePortalNavigate('delivery', '/delivery/dashboard')}
          title="Protected: Requires Delivery Rider Credentials"
        >
          <FiTruck style={{ marginRight: '4px' }} /> Delivery Fleet
        </button>

        <button
          className={`demo-role-pill ${location.pathname.startsWith('/admin') ? 'active' : ''}`}
          onClick={() => handlePortalNavigate('admin', '/admin/dashboard')}
          title="Protected: Requires Super Admin Credentials"
        >
          <FiShield style={{ marginRight: '4px' }} /> Admin Console
        </button>
      </div>
    </div>
  );
}
