import React from 'react';
import { Link } from 'react-router-dom';
import { FiInstagram, FiTwitter, FiFacebook, FiLinkedin, FiShield, FiHeart } from 'react-icons/fi';

export default function Footer() {
  return (
    <footer style={{ background: '#0F172A', color: '#94A3B8', paddingTop: '60px', paddingBottom: '40px', marginTop: 'auto' }}>
      <div className="cb-container">
        
        {/* Top App download promo */}
        <div style={{
          background: 'linear-gradient(135deg, #1E1B4B 0%, #312E81 100%)',
          borderRadius: 'var(--radius-lg)',
          padding: '40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '24px',
          marginBottom: '50px',
          border: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          <div>
            <span style={{ color: 'var(--accent)', fontWeight: '800', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '1px' }}>
              Experience More
            </span>
            <h3 style={{ color: 'white', fontSize: '28px', fontWeight: '800', margin: '6px 0 10px 0' }}>
              Download CraveBite Mobile App
            </h3>
            <p style={{ color: '#C7D2FE', fontSize: '15px', maxWidth: '500px' }}>
              Get instant live order tracking, exclusive flash vouchers, and seamless one-touch checkout right on your phone.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
            <img 
              src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/portal/m/play_store.png" 
              alt="Google Play" 
              style={{ height: '48px', cursor: 'pointer', borderRadius: '8px' }} 
            />
            <img 
              src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/portal/m/app_store.png" 
              alt="App Store" 
              style={{ height: '48px', cursor: 'pointer', borderRadius: '8px' }} 
            />
          </div>
        </div>

        {/* Links Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '36px', marginBottom: '40px' }}>
          
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <div style={{
                width: '36px',
                height: '36px',
                background: 'var(--primary)',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: '900',
                fontSize: '18px'
              }}>
                CB
              </div>
              <span style={{ fontSize: '22px', fontWeight: '800', color: 'white' }}>
                Crave<span style={{ color: 'var(--accent)' }}>Bite</span>
              </span>
            </div>
            <p style={{ fontSize: '14px', lineHeight: '1.6', marginBottom: '16px' }}>
              Delivering happiness and flavor right to your doorstep. Freshly curated from top local kitchens.
            </p>
            <p style={{ fontSize: '12px', color: '#64748B' }}>
              © 2026 CraveBite Technologies Pvt. Ltd. All rights reserved.
            </p>
          </div>

          <div>
            <h4 style={{ color: 'white', fontSize: '16px', fontWeight: '800', marginBottom: '18px' }}>Company</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '14px' }}>
              <Link to="/help">About Us</Link>
              <Link to="/help">Careers</Link>
              <Link to="/help">Team & Culture</Link>
              <Link to="/offers">Special Offers</Link>
              <Link to="/restaurants">All Restaurants</Link>
            </div>
          </div>

          <div>
            <h4 style={{ color: 'white', fontSize: '16px', fontWeight: '800', marginBottom: '18px' }}>Partner with us</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '14px' }}>
              <Link to="/restaurant/login">Restaurant Partner Login</Link>
              <Link to="/restaurant/dashboard">Restaurant Dashboard</Link>
              <Link to="/delivery/login">Delivery Partner Login</Link>
              <Link to="/delivery/dashboard">Rider Dashboard</Link>
              <Link to="/admin/login">Admin Console</Link>
            </div>
          </div>

          <div>
            <h4 style={{ color: 'white', fontSize: '16px', fontWeight: '800', marginBottom: '18px' }}>Help & Legal</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '14px' }}>
              <Link to="/help">Help & FAQs</Link>
              <Link to="/help">Terms & Conditions</Link>
              <Link to="/help">Privacy Policy</Link>
              <Link to="/help">Cookie Policy</Link>
              <Link to="/help">Refund & Cancellation</Link>
            </div>
          </div>

          <div>
            <h4 style={{ color: 'white', fontSize: '16px', fontWeight: '800', marginBottom: '18px' }}>Available Cities</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '14px' }}>
              <span>Jaipur</span>
              <span>Delhi NCR</span>
              <span>Bengaluru</span>
              <span>Mumbai</span>
              <span>Hyderabad</span>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop: '1px solid #334155',
          paddingTop: '24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px',
          fontSize: '13px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <a href="#" style={{ color: '#94A3B8' }}><FiInstagram size={18} /></a>
            <a href="#" style={{ color: '#94A3B8' }}><FiTwitter size={18} /></a>
            <a href="#" style={{ color: '#94A3B8' }}><FiFacebook size={18} /></a>
            <a href="#" style={{ color: '#94A3B8' }}><FiLinkedin size={18} /></a>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#10B981' }}>
            <FiShield size={16} />
            <span>100% Safe & Encrypted Payments • FSSAI Certified</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
