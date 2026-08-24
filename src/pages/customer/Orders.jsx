import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiPackage, FiCheckCircle, FiClock, FiArrowRight, FiRotateCw, FiMapPin } from 'react-icons/fi';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';

export default function Orders() {
  const { orders, addToCart } = useCart();
  const { currentUser } = useAuth();
  const [filterTab, setFilterTab] = useState('all'); // all, active, completed

  // Filter orders by user ID
  const userOrders = orders.filter(o => !currentUser || o.userId === currentUser.uid || o.userId.startsWith('cust-demo'));

  const filtered = userOrders.filter(o => {
    if (filterTab === 'active') return o.orderStatus !== 'Delivered' && o.orderStatus !== 'Cancelled';
    if (filterTab === 'completed') return o.orderStatus === 'Delivered';
    return true;
  });

  return (
    <div className="cb-page animate-fade-in" style={{ padding: '40px 0' }}>
      <div className="cb-container" style={{ maxWidth: '900px' }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <div>
            <h1 style={{ fontSize: '28px', fontWeight: '800', color: 'var(--text-main)' }}>Your Orders</h1>
            <p style={{ fontSize: '14px', color: 'var(--text-muted)' }}>Review your past deliveries, reorder favorites, and track active food</p>
          </div>
        </div>

        {/* Tab Filters */}
        <div style={{ display: 'flex', gap: '10px', marginBottom: '24px' }}>
          {['all', 'active', 'completed'].map(tab => (
            <button
              key={tab}
              onClick={() => setFilterTab(tab)}
              style={{
                padding: '8px 18px',
                borderRadius: 'var(--radius-full)',
                fontSize: '13.5px',
                fontWeight: '700',
                textTransform: 'capitalize',
                background: filterTab === tab ? 'var(--primary)' : 'white',
                color: filterTab === tab ? 'white' : 'var(--text-main)',
                border: '1px solid var(--border)'
              }}
            >
              {tab === 'all' ? `All Orders (${userOrders.length})` : tab}
            </button>
          ))}
        </div>

        {/* Orders List */}
        {filtered.length === 0 ? (
          <div className="cb-card" style={{ padding: '60px 20px', textAlign: 'center' }}>
            <div style={{ fontSize: '40px', marginBottom: '12px' }}>📦</div>
            <h3 style={{ fontSize: '18px', fontWeight: '800' }}>No orders found</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '20px' }}>
              You don't have any {filterTab !== 'all' ? filterTab : ''} orders yet.
            </p>
            <Link to="/restaurants" className="cb-btn cb-btn-primary">
              Explore Restaurants
            </Link>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {filtered.map((order) => {
              const isDelivered = order.orderStatus === 'Delivered';
              return (
                <div key={order.orderId} className="cb-card" style={{ padding: '24px' }}>
                  
                  {/* Card Header */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px', marginBottom: '16px', borderBottom: '1px solid var(--border)', paddingBottom: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                      <img 
                        src={order.restaurantImage || 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=100&q=80'} 
                        alt={order.restaurantName} 
                        style={{ width: '48px', height: '48px', borderRadius: '10px', objectFit: 'cover' }}
                      />
                      <div>
                        <h3 style={{ fontSize: '17px', fontWeight: '800', margin: '0 0 2px 0' }}>{order.restaurantName}</h3>
                        <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: 0 }}>
                          Order #{order.orderId} • {new Date(order.createdAt).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </div>

                    <div style={{ textAlign: 'right' }}>
                      <span className={`cb-badge ${isDelivered ? 'cb-badge-success' : 'cb-badge-warning'}`} style={{ fontSize: '12px', padding: '4px 10px' }}>
                        {isDelivered ? '● DELIVERED' : `● ${order.orderStatus.toUpperCase()}`}
                      </span>
                      <p style={{ fontSize: '16px', fontWeight: '800', color: 'var(--text-main)', margin: '4px 0 0 0' }}>
                        ₹{order.totalAmount}
                      </p>
                    </div>
                  </div>

                  {/* Items summary */}
                  <div style={{ marginBottom: '18px' }}>
                    <div style={{ fontSize: '14px', color: 'var(--text-main)', fontWeight: '600' }}>
                      {order.items.map(i => `${i.quantity}x ${i.name}`).join(', ')}
                    </div>
                    <p style={{ fontSize: '12.5px', color: 'var(--text-muted)', marginTop: '4px' }}>
                      Delivered to: {order.deliveryAddress?.flat}, {order.deliveryAddress?.area}
                    </p>
                  </div>

                  {/* Actions */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', paddingTop: '12px', borderTop: '1px solid var(--border)' }}>
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <Link 
                        to={`/order/${order.orderId}`}
                        className="cb-btn cb-btn-outline cb-btn-sm"
                      >
                        View Order Details
                      </Link>

                      {!isDelivered && (
                        <Link 
                          to={`/track-order/${order.orderId}`}
                          className="cb-btn cb-btn-primary cb-btn-sm"
                        >
                          <FiMapPin /> Track Live
                        </Link>
                      )}
                    </div>

                    <button
                      onClick={() => alert(`Items from ${order.restaurantName} re-added to your cart!`)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        fontSize: '13px',
                        fontWeight: '700',
                        color: 'var(--primary)'
                      }}
                    >
                      <FiRotateCw /> Reorder
                    </button>
                  </div>

                </div>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
}
