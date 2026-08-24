import React from 'react';
import { FiTruck, FiCheck, FiStar } from 'react-icons/fi';
import { DEMO_USERS } from '../../data/mockData';

export default function AdminDeliveryPartners() {
  const riders = [
    { id: 'R-1', name: DEMO_USERS.delivery.name, phone: DEMO_USERS.delivery.phone, vehicle: DEMO_USERS.delivery.vehicleNumber, rating: DEMO_USERS.delivery.rating, trips: 482, status: 'Online' },
    { id: 'R-2', name: 'Rohit Meena', phone: '+91 97888 11223', vehicle: 'RJ 14 CZ 9920', rating: 4.88, trips: 312, status: 'Online' },
    { id: 'R-3', name: 'Suraj Verma', phone: '+91 97999 44556', vehicle: 'RJ 14 EA 1029', rating: 4.75, trips: 194, status: 'Offline' }
  ];

  return (
    <div className="cb-page animate-fade-in" style={{ padding: 0 }}>
      <div style={{ marginBottom: '28px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: '900', color: 'var(--text-main)' }}>Delivery Fleet Management</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>Active driver status, vehicle credentials, and performance analytics</p>
      </div>

      <div className="cb-card" style={{ padding: '20px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
          <thead>
            <tr style={{ borderBottom: '1.5px solid var(--border)', color: 'var(--text-muted)' }}>
              <th style={{ padding: '12px 14px' }}>RIDER</th>
              <th style={{ padding: '12px 14px' }}>CONTACT</th>
              <th style={{ padding: '12px 14px' }}>VEHICLE NO.</th>
              <th style={{ padding: '12px 14px' }}>LIFETIME DELIVERIES</th>
              <th style={{ padding: '12px 14px' }}>SCORE</th>
              <th style={{ padding: '12px 14px' }}>FLEET STATUS</th>
            </tr>
          </thead>
          <tbody>
            {riders.map(r => (
              <tr key={r.id} style={{ borderBottom: '1px solid var(--border)' }}>
                <td style={{ padding: '16px 14px', fontWeight: '800' }}>{r.name}</td>
                <td style={{ padding: '16px 14px' }}>{r.phone}</td>
                <td style={{ padding: '16px 14px', color: 'var(--text-muted)' }}>{r.vehicle}</td>
                <td style={{ padding: '16px 14px', fontWeight: '700' }}>{r.trips} trips</td>
                <td style={{ padding: '16px 14px', fontWeight: '800', color: '#D97706' }}>★ {r.rating}</td>
                <td style={{ padding: '16px 14px' }}>
                  <span className={`cb-badge ${r.status === 'Online' ? 'cb-badge-success' : 'cb-badge-warning'}`}>
                    ● {r.status.toUpperCase()}
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
