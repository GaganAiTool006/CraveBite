import React from 'react';
import { Link } from 'react-router-dom';
import { FiUsers, FiShoppingBag, FiTruck, FiPackage, FiAlertCircle, FiCheckCircle, FiClock, FiDollarSign } from 'react-icons/fi';
import { useCart } from '../../context/CartContext';
import { RESTAURANTS } from '../../data/mockData';

export default function ManagerDashboard() {
  const { orders, updateOrderStatus } = useCart();

  const activeOrders = orders.filter(o => o.orderStatus !== 'Delivered' && o.orderStatus !== 'Cancelled');
  const deliveredCount = orders.filter(o => o.orderStatus === 'Delivered').length;
  const totalGMV = orders.reduce((sum, o) => sum + (o.totalAmount || 0), 0);

  return (
    <div className="cb-page animate-fade-in" style={{ padding: 0 }}>
      
      {/* Top Banner */}
      <div style={{ marginBottom: '28px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: '900', color: 'var(--text-main)' }}>
          Operations & Branch Command Center
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>
          Live monitoring of regional order fulfillment, rider assignment latency, and kitchen performance
        </p>
      </div>

      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '18px', marginBottom: '32px' }}>
        
        <div className="cb-card" style={{ padding: '22px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '12.5px', fontWeight: '700', color: 'var(--text-muted)' }}>ACTIVE PIPELINE</span>
            <div style={{ width: '34px', height: '34px', borderRadius: '8px', background: 'var(--accent-light)', color: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <FiClock size={18} />
            </div>
          </div>
          <h2 style={{ fontSize: '28px', fontWeight: '900', color: 'var(--accent)', margin: 0 }}>{activeOrders.length} Orders</h2>
          <span style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px', display: 'block' }}>Under 25 mins SLA target</span>
        </div>

        <div className="cb-card" style={{ padding: '22px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '12.5px', fontWeight: '700', color: 'var(--text-muted)' }}>ON-TIME FULFILLMENT</span>
            <div style={{ width: '34px', height: '34px', borderRadius: '8px', background: 'var(--success-light)', color: 'var(--success)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <FiCheckCircle size={18} />
            </div>
          </div>
          <h2 style={{ fontSize: '28px', fontWeight: '900', color: 'var(--success)', margin: 0 }}>99.2%</h2>
          <span style={{ fontSize: '12px', color: 'var(--success)', fontWeight: '700', marginTop: '4px', display: 'block' }}>Exceeding 98% branch target</span>
        </div>

        <div className="cb-card" style={{ padding: '22px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '12.5px', fontWeight: '700', color: 'var(--text-muted)' }}>OPERATING KITCHENS</span>
            <div style={{ width: '34px', height: '34px', borderRadius: '8px', background: 'var(--primary-light)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <FiShoppingBag size={18} />
            </div>
          </div>
          <h2 style={{ fontSize: '28px', fontWeight: '900', color: 'var(--primary)', margin: 0 }}>{RESTAURANTS.length} Live</h2>
          <span style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px', display: 'block' }}>Zero kitchen backlogs</span>
        </div>

        <div className="cb-card" style={{ padding: '22px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '12.5px', fontWeight: '700', color: 'var(--text-muted)' }}>ONLINE FLEET RIDERS</span>
            <div style={{ width: '34px', height: '34px', borderRadius: '8px', background: 'var(--warning-light)', color: '#D97706', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <FiTruck size={18} />
            </div>
          </div>
          <h2 style={{ fontSize: '28px', fontWeight: '900', color: 'var(--text-main)', margin: 0 }}>34 Active</h2>
          <span style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px', display: 'block' }}>Avg pickup time: 3.2 mins</span>
        </div>

      </div>

      {/* Live Order Escalations Monitor */}
      <div className="cb-card" style={{ padding: '24px', marginBottom: '32px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
          <div>
            <h3 style={{ fontSize: '18px', fontWeight: '800', color: 'var(--text-main)' }}>Live Order Dispatch & SLA Watch</h3>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: '2px 0 0 0' }}>Real-time order stage updates across restaurants in Jaipur</p>
          </div>
          <Link to="/manager/orders" className="cb-btn cb-btn-outline cb-btn-sm">
            Full Orders Queue
          </Link>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13.5px' }}>
            <thead>
              <tr style={{ borderBottom: '1.5px solid var(--border)', color: 'var(--text-muted)' }}>
                <th style={{ padding: '12px 14px' }}>ORDER ID</th>
                <th style={{ padding: '12px 14px' }}>RESTAURANT</th>
                <th style={{ padding: '12px 14px' }}>DELIVERY DESTINATION</th>
                <th style={{ padding: '12px 14px' }}>DISPATCH STATUS</th>
                <th style={{ padding: '12px 14px', textAlign: 'right' }}>MANAGER OVERRIDE</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(o => (
                <tr key={o.orderId} style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '14px', fontWeight: '800' }}>#{o.orderId}</td>
                  <td style={{ padding: '14px', fontWeight: '700' }}>{o.restaurantName}</td>
                  <td style={{ padding: '14px', color: 'var(--text-muted)' }}>{o.deliveryAddress?.flat}, {o.deliveryAddress?.area}</td>
                  <td style={{ padding: '14px' }}>
                    <span className={`cb-badge ${o.orderStatus === 'Delivered' ? 'cb-badge-success' : 'cb-badge-warning'}`}>
                      ● {o.orderStatus}
                    </span>
                  </td>
                  <td style={{ padding: '14px', textAlign: 'right' }}>
                    {o.orderStatus !== 'Delivered' ? (
                      <button 
                        onClick={() => updateOrderStatus(o.orderId, 'Delivered', 6)}
                        className="cb-btn cb-btn-outline cb-btn-sm"
                        style={{ fontSize: '12px', padding: '4px 10px', color: 'var(--success)', borderColor: 'var(--success)' }}
                      >
                        Force Complete
                      </button>
                    ) : (
                      <span style={{ color: 'var(--success)', fontWeight: '700', fontSize: '12px' }}>
                        ✓ Completed
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
