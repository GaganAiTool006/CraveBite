import React from 'react';
import { Linkedin, Instagram, Facebook, Twitter } from 'lucide-react';

export default function Footer({ onNavigate }) {
  const linkStyle = {
    color: '#3d4152',
    textDecoration: 'none',
    background: 'none',
    border: 'none',
    padding: '0',
    textAlign: 'left',
    fontSize: '14px',
    cursor: 'pointer',
    transition: 'color 0.2s',
    fontWeight: '500'
  };

  const colTitleStyle = {
    fontSize: '15px',
    fontWeight: '800',
    color: '#02060c',
    marginBottom: '20px'
  };

  return (
    <footer style={{ background: '#f0f0f5', color: '#02060c', paddingTop: '48px', paddingBottom: '32px', marginTop: 'auto', width: '100%' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
        
        {/* Links Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '32px', marginBottom: '40px' }}>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <button onClick={() => onNavigate('home')} style={{ ...linkStyle, display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#FC8019', fontSize: '24px', fontWeight: '800', fontFamily: 'var(--font-heading)' }}>
              <svg viewBox="0 0 512 512" width="28" height="28" fill="#FC8019">
                <path d="M296.3 35.8c-134.4 0-179.9 82.5-179.9 143.9 0 46.1 27.5 75.9 74.4 75.9 22.1 0 43.1-13.6 43.1-34.9 0-21.4-15.5-27.1-33.5-35.4-8.8-4-15.9-9.1-15.9-19.1 0-19.1 21.7-44.5 107.5-44.5 45.3 0 71.4 15.1 71.4 46.1 0 28.5-19.1 43.1-46.1 63.6-56.1 42.6-107.5 95.6-107.5 174.9 0 29.5 7 51.1 19.1 69.4L188 471.2c-5.5 2.5-7 9.1-3.5 14.1l20.1 28.6c3 4 8.5 5 13.1 2.5l56.3-30.6c13.6 5.5 29.1 8 46.1 8 134.4 0 179.9-82.5 179.9-143.9 0-46.1-27.5-75.9-74.4-75.9-22.1 0-43.1 13.6-43.1 34.9 0 21.4 15.5 27.1 33.5 35.4 8.8 4 15.9 9.1 15.9 19.1 0 19.1-21.7 44.5-107.5 44.5-45.3 0-71.4-15.1-71.4-46.1 0-28.5 19.1-43.1 46.1-63.6 56.1-42.6 107.5-95.6 107.5-174.9 0-78.4-70.3-137.9-209.6-137.9z"/>
              </svg>
              <span>Swiggy</span>
            </button>
            <p style={{ color: '#3d4152', fontSize: '13px', fontWeight: '700' }}>
              © 2026 Swiggy Limited
            </p>
          </div>

          <div>
            <h4 style={colTitleStyle}>Company</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <button onClick={() => onNavigate('about')} style={linkStyle}>About Us</button>
              <button onClick={() => onNavigate('corporate')} style={linkStyle}>Swiggy Corporate</button>
              <button onClick={() => onNavigate('careers')} style={linkStyle}>Careers</button>
              <button onClick={() => onNavigate('team')} style={linkStyle}>Team</button>
              <button onClick={() => onNavigate('swiggy-one')} style={linkStyle}>Swiggy One</button>
              <button onClick={() => onNavigate('instamart')} style={linkStyle}>Swiggy Instamart</button>
              <button onClick={() => onNavigate('home')} style={linkStyle}>Swiggy Dineout</button>
            </div>
          </div>

          <div>
            <h4 style={colTitleStyle}>Contact us</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '32px' }}>
              <button onClick={() => onNavigate('help')} style={linkStyle}>Help & Support</button>
              <button onClick={() => onNavigate('partner')} style={linkStyle}>Partner with us</button>
              <button onClick={() => onNavigate('ride')} style={linkStyle}>Ride with us</button>
            </div>
            <h4 style={colTitleStyle}>Legal</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <button onClick={() => onNavigate('terms')} style={linkStyle}>Terms & Conditions</button>
              <button onClick={() => onNavigate('privacy')} style={linkStyle}>Cookie Policy</button>
              <button onClick={() => onNavigate('privacy')} style={linkStyle}>Privacy Policy</button>
              <button onClick={() => onNavigate('investors')} style={linkStyle}>Investor Relations</button>
            </div>
          </div>

          <div>
            <h4 style={colTitleStyle}>Available in:</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <button onClick={() => onNavigate('locations')} style={linkStyle}>Bangalore</button>
              <button onClick={() => onNavigate('locations')} style={linkStyle}>Gurgaon</button>
              <button onClick={() => onNavigate('locations')} style={linkStyle}>Hyderabad</button>
              <button onClick={() => onNavigate('locations')} style={linkStyle}>Delhi</button>
              <button onClick={() => onNavigate('locations')} style={linkStyle}>Mumbai</button>
              <button onClick={() => onNavigate('locations')} style={linkStyle}>Pune</button>
              <select style={{ marginTop: '8px', padding: '8px 12px', borderRadius: '8px', border: '1px solid #ccc', background: 'white', color: '#3d4152', fontSize: '14px', width: '120px' }}>
                <option>47 cities</option>
              </select>
            </div>
          </div>

          <div>
            <h4 style={colTitleStyle}>Life at Swiggy</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '32px' }}>
              <button onClick={() => onNavigate('news')} style={linkStyle}>Explore with Swiggy</button>
              <button onClick={() => onNavigate('news')} style={linkStyle}>Swiggy News</button>
              <button onClick={() => onNavigate('news')} style={linkStyle}>Snackables</button>
            </div>
            
            <h4 style={colTitleStyle}>Social Links</h4>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <a href="#" style={{ color: '#3d4152' }}><Linkedin size={18} /></a>
              <a href="#" style={{ color: '#3d4152' }}><Instagram size={18} /></a>
              <a href="#" style={{ color: '#3d4152' }}><Facebook size={18} /></a>
              <a href="#" style={{ color: '#3d4152' }}><Twitter size={18} /></a>
            </div>
          </div>

        </div>

        {/* Bottom App Download Section */}
        <div style={{ borderTop: '1px solid #e0e0e5', paddingTop: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap', gap: '24px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#02060c', margin: 0 }}>For better experience, download the Swiggy app now</h3>
          <div style={{ display: 'flex', gap: '16px' }}>
            <img src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/portal/m/play_store.png" alt="Google Play" style={{ height: '48px', cursor: 'pointer' }} />
            <img src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/portal/m/app_store.png" alt="App Store" style={{ height: '48px', cursor: 'pointer' }} />
          </div>
        </div>
      </div>
    </footer>
  );
}
