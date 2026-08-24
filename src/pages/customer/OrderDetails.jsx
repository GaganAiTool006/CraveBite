import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiMapPin, FiPhone, FiCheckCircle, FiClock, FiCreditCard } from 'react-icons/fi';
import { useCart } from '../../context/CartContext';

export default function OrderDetails() {
  const { orderId } = useParams();
  const { getOrderById } = useCart();
  const navigate = useNavigate();

  const order = getOrderById(orderId) || {
    orderId: orderId || 'ORD-98231',
    restaurantName: 'Artisan Burger Co.',
    restaurantImage: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=500&q=80',
    items: [
      { id: 'dish-101', name: 'Truffle Smash Double Cheeseburger', price: 289, quantity: 2 },
      { id: 'dish-104', name: 'Cajun Seasoned Crinkle Fries', price: 139, quantity: 1 }
    ],
    subtotal: 717,
    deliveryFee: 40,
    platformFee: 6,
    tax: 35.85,
    discount: 100,
    totalAmount: 698.85,
    deliveryAddress: { flat: 'A-402, Skyline Residency', area: 'Sector 45', city: 'Jaipur' },
    paymentMethod: 'UPI (Google Pay)',
    paymentStatus: 'Paid',
    orderStatus: 'Delivered',
    createdAt: new Date().toISOString(),
    deliveryPartner: { name: 'Vikram Singh', phone: '+91 97777 88899', rating: 4.92, vehicle: 'EV Bike (RJ 14 EU 5589)' }
  };

  return (
    <div className="cb-page animate-fade-in" style={{ padding: '40px 0' }}>
      <div className="cb-container" style={{ maxWidth: '800px' }}>
        
        {/* Back Link */}
        <button 
          onClick={() => navigate('/orders')}
          style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-muted)', fontWeight: '700', fontSize: '14px', marginBottom: '20px' }}
        >
          <FiArrowLeft /> Back to Orders
        </button>

        {/* Order Header */}
        <div className="cb-card" style={{ padding: '24px', marginBottom: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <span className="cb-badge cb-badge-primary" style={{ marginBottom: '6px' }}>ORDER #{order.orderId}</span>
              <h2 style={{ fontSize: '24px', fontWeight: '900', margin: '4px 0' }}>{order.restaurantName}</h2>
              <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                Placed on {new Date(order.createdAt).toLocaleDateString('en-IN', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>

            <div style={{ textAlign: 'right' }}>
              <span className={`cb-badge ${order.orderStatus === 'Delivered' ? 'cb-badge-success' : 'cb-badge-warning'}`} style={{ fontSize: '13px', padding: '6px 12px' }}>
                ● {order.orderStatus.toUpperCase()}
              </span>
              {order.orderStatus !== 'Delivered' && (
                <div style={{ marginTop: '10px' }}>
                  <Link to={`/track-order/${order.orderId}`} className="cb-btn cb-btn-primary cb-btn-sm">
                    <FiMapPin /> Track Live
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Items Bill Breakdown */}
        <div className="cb-card" style={{ padding: '24px', marginBottom: '24px' }}>
          <h3 style={{ fontSize: '17px', fontWeight: '800', marginBottom: '18px', borderBottom: '1px solid var(--border)', paddingBottom: '12px' }}>
            Order Items & Invoice
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '24px', borderBottom: '1px solid var(--border)', paddingBottom: '16px' }}>
            {order.items.map((i, idx) => (
              <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '14.5px', fontWeight: '600' }}>
                  {i.quantity}x {i.name}
                </span>
                <span style={{ fontSize: '14.5px', fontWeight: '700' }}>
                  ₹{i.price * i.quantity}
                </span>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '14px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)' }}>
              <span>Item Subtotal</span>
              <span style={{ fontWeight: '600', color: 'var(--text-main)' }}>₹{order.subtotal}</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)' }}>
              <span>Delivery Partner Fee</span>
              <span style={{ fontWeight: '600', color: order.deliveryFee === 0 ? 'var(--success)' : 'var(--text-main)' }}>
                {order.deliveryFee === 0 ? 'FREE' : `₹${order.deliveryFee}`}
              </span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)' }}>
              <span>Platform Fee</span>
              <span style={{ fontWeight: '600', color: 'var(--text-main)' }}>₹{order.platformFee || 6}</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)' }}>
              <span>GST & Taxes</span>
              <span style={{ fontWeight: '600', color: 'var(--text-main)' }}>₹{order.tax}</span>
            </div>

            {order.discount > 0 && (
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--success)', fontWeight: '700' }}>
                <span>Coupon Savings</span>
                <span>-₹{order.discount}</span>
              </div>
            )}

            <div style={{ borderTop: '1.5px dashed var(--border)', paddingTop: '12px', marginTop: '6px', display: 'flex', justifyContent: 'space-between', fontSize: '18px', fontWeight: '900' }}>
              <span>Total Paid</span>
              <span style={{ color: 'var(--primary)' }}>₹{order.totalAmount}</span>
            </div>
          </div>
        </div>

        {/* Delivery & Payment Details */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
          
          <div className="cb-card" style={{ padding: '20px' }}>
            <h4 style={{ fontSize: '15px', fontWeight: '800', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <FiMapPin color="var(--primary)" /> Delivery Address
            </h4>
            <p style={{ fontSize: '14px', fontWeight: '700', margin: '0 0 4px 0' }}>{order.deliveryAddress?.flat}</p>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: 0 }}>{order.deliveryAddress?.area}, {order.deliveryAddress?.city}</p>
          </div>

          <div className="cb-card" style={{ padding: '20px' }}>
            <h4 style={{ fontSize: '15px', fontWeight: '800', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <FiCreditCard color="var(--primary)" /> Payment Information
            </h4>
            <p style={{ fontSize: '14px', fontWeight: '700', margin: '0 0 4px 0' }}>{order.paymentMethod}</p>
            <p style={{ fontSize: '13px', color: 'var(--success)', fontWeight: '700', margin: 0 }}>Status: {order.paymentStatus || 'Paid'}</p>
          </div>

        </div>

      </div>
    </div>
  );
}
