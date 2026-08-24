import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { FiUsers, FiShoppingBag, FiTruck, FiShield, FiBriefcase } from 'react-icons/fi';

export default function RoleSwitcherBar() {
  const { currentUser, switchDemoRole } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleRoleChange = (roleKey, targetPath) => {
    switchDemoRole(roleKey);
    navigate(targetPath);
  };

  return (
    <div className="demo-role-bar">
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span style={{ fontWeight: '800', color: '#F97316' }}>⚡ CraveBite Demo Roles:</span>
        <span>Current user: <strong>{currentUser?.name || 'Guest'}</strong> ({currentUser?.role || 'None'})</span>
      </div>

      <div className="demo-role-pills">
        <button
          className={`demo-role-pill ${currentUser?.role === 'customer' && !location.pathname.startsWith('/admin') && !location.pathname.startsWith('/restaurant') && !location.pathname.startsWith('/delivery') ? 'active' : ''}`}
          onClick={() => handleRoleChange('customer', '/home')}
        >
          <FiUsers style={{ marginRight: '4px' }} /> Customer App
        </button>

        <button
          className={`demo-role-pill ${currentUser?.role === 'restaurant' || location.pathname.startsWith('/restaurant') ? 'active' : ''}`}
          onClick={() => handleRoleChange('restaurant', '/restaurant/dashboard')}
        >
          <FiShoppingBag style={{ marginRight: '4px' }} /> Restaurant Panel
        </button>

        <button
          className={`demo-role-pill ${currentUser?.role === 'delivery' || location.pathname.startsWith('/delivery') ? 'active' : ''}`}
          onClick={() => handleRoleChange('delivery', '/delivery/dashboard')}
        >
          <FiTruck style={{ marginRight: '4px' }} /> Delivery Partner Panel
        </button>

        <button
          className={`demo-role-pill ${currentUser?.role === 'manager' || location.pathname.startsWith('/manager') ? 'active' : ''}`}
          onClick={() => handleRoleChange('manager', '/manager/dashboard')}
        >
          <FiBriefcase style={{ marginRight: '4px' }} /> Manager Hub
        </button>

        <button
          className={`demo-role-pill ${currentUser?.role === 'admin' || location.pathname.startsWith('/admin') ? 'active' : ''}`}
          onClick={() => handleRoleChange('admin', '/admin/dashboard')}
        >
          <FiShield style={{ marginRight: '4px' }} /> Admin Dashboard
        </button>
      </div>
    </div>
  );
}
