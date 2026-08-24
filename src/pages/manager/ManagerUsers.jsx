import React, { useState } from 'react';
import { FiUsers, FiSearch, FiShield, FiPhone, FiMail } from 'react-icons/fi';

export default function ManagerUsers() {
  const [users, setUsers] = useState([
    { id: 'U-1', name: 'Aarav Sharma', email: 'customer@cravebite.com', phone: '+91 98765 43210', orders: 12, spent: '₹6,420', status: 'Active', tier: 'Gold' },
    { id: 'U-2', name: 'Rohan Gupta', email: 'rohan.g@example.com', phone: '+91 98222 33445', orders: 4, spent: '₹1,890', status: 'Active', tier: 'Silver' },
    { id: 'U-3', name: 'Priya Verma', email: 'priya.v@example.com', phone: '+91 98333 44556', orders: 19, spent: '₹11,340', status: 'Active', tier: 'Platinum' },
    { id: 'U-4', name: 'Ananya Roy', email: 'ananya.r@example.com', phone: '+91 98444 55667', orders: 7, spent: '₹3,210', status: 'Active', tier: 'Silver' }
  ]);
  const [search, setSearch] = useState('');

  const filtered = users.filter(u => u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="cb-page animate-fade-in" style={{ padding: 0 }}>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '26px', fontWeight: '900', color: 'var(--text-main)' }}>Customer Accounts & Activity</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>Regional customer directory, order frequency, and loyalty tier categorization</p>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <input 
          type="text" 
          placeholder="Search customer by name or email..." 
          value={search} 
          onChange={e => setSearch(e.target.value)} 
          className="cb-input" 
          style={{ maxWidth: '380px' }} 
        />
      </div>

      <div className="cb-card" style={{ padding: '20px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
          <thead>
            <tr style={{ borderBottom: '1.5px solid var(--border)', color: 'var(--text-muted)' }}>
              <th style={{ padding: '12px 14px' }}>CUSTOMER</th>
              <th style={{ padding: '12px 14px' }}>CONTACT</th>
              <th style={{ padding: '12px 14px' }}>LIFETIME ORDERS</th>
              <th style={{ padding: '12px 14px' }}>TOTAL SPENT</th>
              <th style={{ padding: '12px 14px' }}>LOYALTY TIER</th>
              <th style={{ padding: '12px 14px' }}>STATUS</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(u => (
              <tr key={u.id} style={{ borderBottom: '1px solid var(--border)' }}>
                <td style={{ padding: '16px 14px', fontWeight: '800' }}>{u.name}</td>
                <td style={{ padding: '16px 14px' }}>
                  <div>{u.email}</div>
                  <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{u.phone}</span>
                </td>
                <td style={{ padding: '16px 14px', fontWeight: '700' }}>{u.orders} orders</td>
                <td style={{ padding: '16px 14px', fontWeight: '800', color: 'var(--primary)' }}>{u.spent}</td>
                <td style={{ padding: '16px 14px' }}>
                  <span className="cb-badge cb-badge-primary">{u.tier}</span>
                </td>
                <td style={{ padding: '16px 14px' }}>
                  <span className="cb-badge cb-badge-success">{u.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
