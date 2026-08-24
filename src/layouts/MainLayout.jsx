import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { FiSearch, FiShoppingCart, FiUser, FiMapPin } from 'react-icons/fi';

export default function MainLayout() {
  const navigate = useNavigate();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Navbar */}
      <header style={{ 
        background: 'rgba(255, 255, 255, 0.95)', 
        backdropFilter: 'blur(10px)', 
        position: 'sticky', 
        top: 0, 
        zIndex: 100, 
        borderBottom: '1px solid var(--border-light)' 
      }}>
        <div className="container" style={{ 
          height: '80px', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          gap: '24px'
        }}>
          {/* Logo */}
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ 
              width: '40px', height: '40px', background: 'var(--primary)', 
              borderRadius: '12px', display: 'flex', alignItems: 'center', 
              justifyContent: 'center', color: 'white', fontWeight: '800', fontSize: '20px' 
            }}>
              CB
            </div>
            <span style={{ fontSize: '24px', fontWeight: '800', color: 'var(--text-main)', letterSpacing: '-0.5px' }}>
              CraveBite
            </span>
          </Link>

          {/* Location & Search */}
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '16px', maxWidth: '600px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)', cursor: 'pointer' }}>
              <FiMapPin size={18} color="var(--primary)" />
              <span style={{ fontSize: '14px', fontWeight: '600' }}>Deliver to</span>
              <span style={{ fontSize: '14px', fontWeight: '700', color: 'var(--text-main)' }}>New York, NY</span>
            </div>

            <div style={{ 
              flex: 1, position: 'relative', background: 'var(--bg-body)', 
              borderRadius: '12px', display: 'flex', alignItems: 'center', padding: '0 16px' 
            }}>
              <FiSearch size={18} color="var(--text-muted)" />
              <input 
                type="text" 
                placeholder="Search for restaurants, dishes and cuisines" 
                style={{ 
                  width: '100%', border: 'none', background: 'none', 
                  padding: '14px 12px', fontSize: '14px', outline: 'none' 
                }} 
              />
            </div>
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            <Link to="/cart" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '600', position: 'relative' }}>
              <FiShoppingCart size={22} />
              <span>Cart</span>
              <span style={{ 
                position: 'absolute', top: '-8px', right: '-12px', 
                background: 'var(--secondary)', color: 'white', fontSize: '10px', 
                fontWeight: '800', width: '18px', height: '18px', 
                display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%' 
              }}>2</span>
            </Link>
            
            <button className="btn btn-primary" onClick={() => alert('Login Modal')}>
              <FiUser size={18} />
              Sign In
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main style={{ flex: 1 }}>
        <Outlet />
      </main>

      {/* Footer */}
      <footer style={{ background: '#111827', color: '#9CA3AF', padding: '60px 0', marginTop: 'auto' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '40px' }}>
          <div>
            <div style={{ color: 'white', fontSize: '24px', fontWeight: '800', marginBottom: '16px' }}>CraveBite</div>
            <p style={{ fontSize: '14px', lineHeight: '1.6' }}>Good food, delivered to your doorstep. Experience the best dining right at home.</p>
          </div>
          <div>
            <h4 style={{ color: 'white', fontWeight: '700', marginBottom: '16px' }}>Company</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '14px' }}>
              <Link to="#">About Us</Link>
              <Link to="#">Careers</Link>
              <Link to="#">Blog</Link>
            </div>
          </div>
          <div>
            <h4 style={{ color: 'white', fontWeight: '700', marginBottom: '16px' }}>For Partners</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '14px' }}>
              <Link to="#">Partner with us</Link>
              <Link to="#">Ride with us</Link>
            </div>
          </div>
          <div>
            <h4 style={{ color: 'white', fontWeight: '700', marginBottom: '16px' }}>Legal</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '14px' }}>
              <Link to="#">Terms & Conditions</Link>
              <Link to="#">Privacy Policy</Link>
              <Link to="#">Cookie Policy</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
