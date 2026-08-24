import React, { useState } from 'react';
import { FiTruck, FiPhone, FiCheckCircle } from 'react-icons/fi';
import { DEMO_USERS } from '../../data/mockData';

export default function ManagerDeliveryPartners() {
  const [riders, setRiders] = useState([
    { id: 'R-1', name: DEMO_USERS.delivery.name, phone: DEMO_USERS.delivery.phone, vehicle: DEMO_USERS.delivery.vehicleNumber, rating: DEMO_USERS.delivery.rating, completedToday: 14, status: 'On Delivery' },
    { id: 'R-2', name: 'Rohit Meena', phone: '+91 97888 11223', vehicle: 'RJ 14 CZ 9920', rating: 4.88, completedToday: 11, status: 'Idle / Available' },
    { id: 'R-3', name: 'Suraj Verma', phone: '+91 97999 44556', vehicle: 'RJ 14 EA 1029', rating: 4.75, completedToday: 8, status: 'Break' },
    { id: 'R-4', name: 'Deepak Saini', phone: '+91 98111 44556', vehicle: 'RJ 14 EF 4432', rating: 4.91, completedToday: 16, status: 'On Delivery' }
  ]);

  return (
    <div className="cb-page animate-fade-in" style={{ padding: 0 }}>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '26px', fontWeight: '900', color: 'var(--text-main)' }}>Delivery Fleet Roster & Shift Status</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>Real-time driver availability, shift attendance, and hourly pickup performance</p>
      </div>

      <div className="cb-card" style={{ padding: '20px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
          <thead>
            <tr style={{ borderBottom: '1.5px solid var(--border)', color: 'var(--text-muted)' }}>
              <th style={{ padding: '12px 14px' }}>RIDER</th>
              <th style={{ padding: '12px 14px' }}>CONTACT</th>
              <th style={{ padding: '12px 14px' }}>VEHICLE</th>
              <th style={{ padding: '12px 14px' }}>TODAY'S TRIPS</th>
              <th style={{ padding: '12px 14px' }}>RATING</th>
              <th style={{ padding: '12px 14px' }}>SHIFT STATUS</th>
            </tr>
          </thead>
          <tbody>
            {riders.map(r => (
              <tr key={r.id} style={{ borderBottom: '1px solid var(--border)' }}>
                <td style={{ padding: '16px 14px', fontWeight: '800' }}>{r.name}</td>
                <td style={{ padding: '16px 14px' }}>{r.phone}</td>
                <td style={{ padding: '16px 14px', color: 'var(--text-muted)' }}>{r.vehicle}</td>
                <td style={{ padding: '16px 14px', fontWeight: '700' }}>{r.completedToday} deliveries</td>
                <td style={{ padding: '16px 14px', fontWeight: '800', color: '#D97706' }}>★ {r.rating}</td>
                <td style={{ padding: '16px 14px' }}>
                  <span className={`cb-badge ${r.status === 'On Delivery' ? 'cb-badge-primary' : r.status === 'Idle / Available' ? 'cb-badge-success' : 'cb-badge-warning'}`}>
                    ● {r.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
