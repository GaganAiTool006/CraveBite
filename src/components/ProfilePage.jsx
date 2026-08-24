import React from 'react';
import { User, MapPin, Clock, Heart, LogOut, CheckCircle } from 'lucide-react';

export default function ProfilePage({ user, onLogout }) {
  if (!user) return null;

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '32px 16px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '40px', paddingBottom: '32px', borderBottom: '1px solid var(--border-card)' }}>
        <div style={{ width: '80px', height: '80px', background: '#FC8019', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '32px', fontWeight: '800' }}>
          {user.name.charAt(0).toUpperCase()}
        </div>
        <div style={{ flex: 1 }}>
          <h1 style={{ fontSize: '28px', fontWeight: '800' }}>{user.name}</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '15px', marginTop: '4px' }}>+91 {user.mobile}</p>
        </div>
        <button 
          onClick={onLogout}
          style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px', border: '1px solid #ccc', borderRadius: '8px', fontWeight: '700', color: 'var(--text-dark)' }}
        >
          <LogOut size={16} />
          <span>Logout</span>
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '250px 1fr', gap: '40px' }}>
        {/* Sidebar Nav */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <button style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '16px', background: 'var(--text-dark)', color: 'white', borderRadius: '8px', fontWeight: '700', fontSize: '15px' }}>
            <Clock size={20} />
            <span>Past Orders</span>
          </button>
          <button style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '16px', color: 'var(--text-dark)', borderRadius: '8px', fontWeight: '600', fontSize: '15px' }}>
            <MapPin size={20} color="var(--text-muted)" />
            <span>Manage Addresses</span>
          </button>
          <button style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '16px', color: 'var(--text-dark)', borderRadius: '8px', fontWeight: '600', fontSize: '15px' }}>
            <Heart size={20} color="var(--text-muted)" />
            <span>Favorites</span>
          </button>
        </div>

        {/* Orders Content */}
        <div>
          <h2 style={{ fontSize: '20px', fontWeight: '800', marginBottom: '20px' }}>Past Orders</h2>
          
          <div style={{ background: 'white', border: '1px solid var(--border-card)', borderRadius: 'var(--radius-md)', padding: '24px', marginBottom: '20px', boxShadow: 'var(--shadow-sm)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px dashed #eee', paddingBottom: '16px', marginBottom: '16px' }}>
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: '800' }}>Meghana Foods</h3>
                <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '4px' }}>Koramangala 5th Block</p>
                <div style={{ fontSize: '12px', color: '#888', marginTop: '8px' }}>ORDER #142385934 • Yesterday, 08:30 PM</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--secondary-green)', background: '#e8f5ee', padding: '6px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: '800' }}>
                <CheckCircle size={14} />
                <span>Delivered</span>
              </div>
            </div>
            
            <div style={{ fontSize: '14px', color: 'var(--text-dark)', lineHeight: '1.6', marginBottom: '20px' }}>
              1 x Meghana Special Chicken Biryani<br/>
              1 x Special Raita & Salan Combo
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ fontSize: '16px', fontWeight: '800' }}>Total Paid: ₹400</div>
              <button style={{ background: '#FC8019', color: 'white', padding: '10px 24px', borderRadius: '8px', fontWeight: '800', fontSize: '14px' }}>
                REORDER
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
