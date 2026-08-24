import React, { useState } from 'react';
import { FiUsers, FiSearch, FiUserX, FiUserCheck } from 'react-icons/fi';
import { DEMO_USERS } from '../../data/mockData';

export default function AdminUsers() {
  const [users, setUsers] = useState([
    { uid: 'u-101', name: 'Aarav Sharma', email: 'customer@cravebite.com', phone: '+91 98765 43210', role: 'customer', status: 'Active', orders: 12 },
    { uid: 'u-102', name: 'Rohan Gupta', email: 'rohan.g@example.com', phone: '+91 98222 33445', role: 'customer', status: 'Active', orders: 4 },
    { uid: 'u-103', name: 'Priya Verma', email: 'priya.v@example.com', phone: '+91 98333 44556', role: 'customer', status: 'Active', orders: 19 },
    { uid: 'u-104', name: 'Marco Rossi', email: 'restaurant@cravebite.com', phone: '+91 98111 22334', role: 'restaurant', status: 'Active', orders: 142 },
    { uid: 'u-105', name: 'Vikram Singh', email: 'delivery@cravebite.com', phone: '+91 97777 88899', role: 'delivery', status: 'Active', orders: 482 }
  ]);
  const [search, setSearch] = useState('');

  const toggleStatus = (uid) => {
    setUsers(prev => prev.map(u => u.uid === uid ? { ...u, status: u.status === 'Active' ? 'Blocked' : 'Active' } : u));
  };

  const filtered = users.filter(u => u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase()) || u.role.includes(search.toLowerCase()));

  return (
    <div className="cb-page animate-fade-in" style={{ padding: 0 }}>
      <div style={{ marginBottom: '28px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: '900', color: 'var(--text-main)' }}>Platform Users & Account Governance</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>Monitor customers, merchant staff, and delivery rider profiles across Firestore</p>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <input 
          type="text" 
          placeholder="Search user by name, email or role..." 
          value={search} 
          onChange={e => setSearch(e.target.value)} 
          className="cb-input" 
          style={{ maxWidth: '400px' }} 
        />
      </div>

      <div className="cb-card" style={{ padding: '20px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
          <thead>
            <tr style={{ borderBottom: '1.5px solid var(--border)', color: 'var(--text-muted)' }}>
              <th style={{ padding: '12px 14px' }}>USER</th>
              <th style={{ padding: '12px 14px' }}>CONTACT</th>
              <th style={{ padding: '12px 14px' }}>ROLE</th>
              <th style={{ padding: '12px 14px' }}>ORDERS / ACTIVITY</th>
              <th style={{ padding: '12px 14px' }}>STATUS</th>
              <th style={{ padding: '12px 14px', textAlign: 'right' }}>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(u => (
              <tr key={u.uid} style={{ borderBottom: '1px solid var(--border)' }}>
                <td style={{ padding: '16px 14px' }}>
                  <span style={{ fontWeight: '800', display: 'block' }}>{u.name}</span>
                  <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>UID: {u.uid}</span>
                </td>
                <td style={{ padding: '16px 14px' }}>
                  <div>{u.email}</div>
                  <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{u.phone}</span>
                </td>
                <td style={{ padding: '16px 14px' }}>
                  <span className={`cb-badge ${u.role === 'admin' ? 'cb-badge-primary' : u.role === 'restaurant' ? 'cb-badge-accent' : u.role === 'delivery' ? 'cb-badge-warning' : 'cb-badge-success'}`}>
                    {u.role.toUpperCase()}
                  </span>
                </td>
                <td style={{ padding: '16px 14px', fontWeight: '700' }}>{u.orders} transactions</td>
                <td style={{ padding: '16px 14px' }}>
                  <span className={`cb-badge ${u.status === 'Active' ? 'cb-badge-success' : 'cb-badge-danger'}`}>
                    {u.status}
                  </span>
                </td>
                <td style={{ padding: '16px 14px', textAlign: 'right' }}>
                  <button 
                    onClick={() => toggleStatus(u.uid)} 
                    className="cb-btn cb-btn-outline cb-btn-sm"
                    style={{ color: u.status === 'Active' ? 'var(--danger)' : 'var(--success)', borderColor: u.status === 'Active' ? 'var(--danger)' : 'var(--success)' }}
                  >
                    {u.status === 'Active' ? 'Block Account' : 'Unblock Account'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
