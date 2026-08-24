import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiUser, FiEdit3, FiPackage, FiHeart, FiMapPin, FiSettings, FiHelpCircle, FiLogOut, FiPhone, FiMail, FiCalendar } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';

export default function Profile() {
  const { currentUser, logout } = useAuth();
  const { orders } = useCart();
  const navigate = useNavigate();

  const userOrders = orders.filter(o => !currentUser || o.userId === currentUser.uid || o.userId.startsWith('cust-demo'));
  const favCount = (currentUser?.favouriteRestaurants || []).length + (currentUser?.favouriteFoods || []).length;
  const addressCount = (currentUser?.savedAddresses || []).length;

  return (
    <div className="cb-page animate-fade-in" style={{ padding: '40px 0' }}>
      <div className="cb-container" style={{ maxWidth: '800px' }}>
        
        {/* Profile Card */}
        <div className="cb-card" style={{ padding: '32px', marginBottom: '28px', position: 'relative' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px' }}>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              <img 
                src={currentUser?.profileImage || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&q=80'} 
                alt={currentUser?.name} 
                style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover', border: '3px solid var(--primary-light)' }} 
              />
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <h1 style={{ fontSize: '24px', fontWeight: '900', color: 'var(--text-main)', margin: 0 }}>
                    {currentUser?.name || 'Aarav Sharma'}
                  </h1>
                  <span className="cb-badge cb-badge-primary" style={{ textTransform: 'capitalize' }}>
                    {currentUser?.role || 'Customer'}
                  </span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginTop: '6px', fontSize: '13.5px', color: 'var(--text-muted)' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <FiMail size={14} /> {currentUser?.email || 'customer@cravebite.com'}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <FiPhone size={14} /> {currentUser?.phone || '+91 98765 43210'}
                  </span>
                </div>
              </div>
            </div>

            <Link to="/profile/edit" className="cb-btn cb-btn-outline cb-btn-sm">
              <FiEdit3 /> Edit Profile
            </Link>

          </div>

          {/* Quick Stats Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '16px',
            marginTop: '28px',
            paddingTop: '24px',
            borderTop: '1px solid var(--border)',
            textAlign: 'center'
          }}>
            <div>
              <span style={{ fontSize: '22px', fontWeight: '900', color: 'var(--primary)' }}>{userOrders.length}</span>
              <p style={{ fontSize: '12.5px', color: 'var(--text-muted)', fontWeight: '700', margin: '2px 0 0 0' }}>Orders Placed</p>
            </div>
            <div>
              <span style={{ fontSize: '22px', fontWeight: '900', color: 'var(--danger)' }}>{favCount}</span>
              <p style={{ fontSize: '12.5px', color: 'var(--text-muted)', fontWeight: '700', margin: '2px 0 0 0' }}>Favorites</p>
            </div>
            <div>
              <span style={{ fontSize: '22px', fontWeight: '900', color: 'var(--accent)' }}>{addressCount}</span>
              <p style={{ fontSize: '12.5px', color: 'var(--text-muted)', fontWeight: '700', margin: '2px 0 0 0' }}>Saved Addresses</p>
            </div>
          </div>
        </div>

        {/* Quick Menu Links */}
        <div className="cb-card" style={{ padding: '12px 0', marginBottom: '28px' }}>
          
          <Link to="/orders" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 24px', borderBottom: '1px solid var(--border)', color: 'var(--text-main)', fontWeight: '700', fontSize: '15px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <FiPackage color="var(--primary)" size={20} />
              <span>My Orders & History</span>
            </div>
            <span style={{ color: 'var(--text-muted)' }}>→</span>
          </Link>

          <Link to="/favourites" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 24px', borderBottom: '1px solid var(--border)', color: 'var(--text-main)', fontWeight: '700', fontSize: '15px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <FiHeart color="var(--danger)" size={20} />
              <span>Saved Favourites</span>
            </div>
            <span style={{ color: 'var(--text-muted)' }}>→</span>
          </Link>

          <Link to="/addresses" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 24px', borderBottom: '1px solid var(--border)', color: 'var(--text-main)', fontWeight: '700', fontSize: '15px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <FiMapPin color="var(--accent)" size={20} />
              <span>Saved Delivery Addresses</span>
            </div>
            <span style={{ color: 'var(--text-muted)' }}>→</span>
          </Link>

          <Link to="/settings" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 24px', borderBottom: '1px solid var(--border)', color: 'var(--text-main)', fontWeight: '700', fontSize: '15px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <FiSettings color="var(--primary)" size={20} />
              <span>Preferences & Settings</span>
            </div>
            <span style={{ color: 'var(--text-muted)' }}>→</span>
          </Link>

          <Link to="/help" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 24px', color: 'var(--text-main)', fontWeight: '700', fontSize: '15px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <FiHelpCircle color="var(--success)" size={20} />
              <span>Help & Customer Support</span>
            </div>
            <span style={{ color: 'var(--text-muted)' }}>→</span>
          </Link>

        </div>

        {/* Logout Button */}
        <button
          onClick={() => { logout(); navigate('/login'); }}
          className="cb-btn cb-btn-outline"
          style={{ width: '100%', borderColor: 'var(--danger)', color: 'var(--danger)', fontWeight: '800' }}
        >
          <FiLogOut /> Sign Out Account
        </button>

      </div>
    </div>
  );
}
