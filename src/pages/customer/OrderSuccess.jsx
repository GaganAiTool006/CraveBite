import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiCheckCircle, FiPackage, FiMapPin, FiArrowRight, FiPhoneCall } from 'react-icons/fi';
import { useCart } from '../../context/CartContext';

export default function OrderSuccess() {
  const { orderId } = useParams();
  const { getOrderById } = useCart();

  const order = getOrderById(orderId) || {
    orderId: orderId || 'ORD-99821',
    restaurantName: 'Artisan Burger Co.',
    totalAmount: 692.85,
    estimatedDeliveryTime: '30-35 mins',
    deliveryAddress: { flat: 'A-402, Skyline Residency', area: 'Sector 45', city: 'Jaipur' },
    items: [{ id: '1', name: 'Truffle Smash Double Cheeseburger', quantity: 2, price: 289 }]
  };

  return (
    <div className="cb-page animate-fade-in" style={{ padding: '60px 0' }}>
      <div className="cb-container" style={{ maxWidth: '640px' }}>
        
        <div className="cb-card" style={{ padding: '48px 32px', textAlign: 'center' }}>
          
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', damping: 10, stiffness: 100 }}
            style={{
              width: '84px',
              height: '84px',
              background: 'var(--success-light)',
              color: 'var(--success)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 24px auto'
            }}
          >
            <FiCheckCircle size={48} />
          </motion.div>

          <span className="cb-badge cb-badge-success" style={{ marginBottom: '12px' }}>
            PAYMENT CONFIRMED
          </span>

          <h1 style={{ fontSize: '28px', fontWeight: '900', color: 'var(--text-main)', marginBottom: '8px' }}>
            Order Placed Successfully!
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '15px', marginBottom: '32px' }}>
            Your order <strong>#{order.orderId}</strong> has been sent to <strong>{order.restaurantName}</strong> and is being prepared.
          </p>

          {/* Quick Info Box */}
          <div style={{
            background: 'var(--bg-subtle)',
            borderRadius: 'var(--radius-sm)',
            padding: '20px',
            textAlign: 'left',
            marginBottom: '32px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', fontSize: '14px' }}>
              <span style={{ color: 'var(--text-muted)' }}>Estimated Delivery</span>
              <span style={{ fontWeight: '800', color: 'var(--accent)' }}>{order.estimatedDeliveryTime}</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', fontSize: '14px' }}>
              <span style={{ color: 'var(--text-muted)' }}>Total Amount</span>
              <span style={{ fontWeight: '800', color: 'var(--text-main)' }}>₹{order.totalAmount}</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
              <span style={{ color: 'var(--text-muted)' }}>Deliver To</span>
              <span style={{ fontWeight: '600', color: 'var(--text-main)', textAlign: 'right', maxWidth: '60%' }}>
                {order.deliveryAddress?.flat}, {order.deliveryAddress?.area}
              </span>
            </div>
          </div>

          {/* CTA buttons */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <Link 
              to={`/track-order/${order.orderId}`} 
              className="cb-btn cb-btn-primary cb-btn-lg"
              style={{ width: '100%' }}
            >
              <FiMapPin size={18} /> Live Track Order
            </Link>

            <Link 
              to="/orders" 
              className="cb-btn cb-btn-outline"
              style={{ width: '100%' }}
            >
              <FiPackage size={18} /> View All Orders
            </Link>

            <Link 
              to="/home" 
              style={{ fontSize: '14px', fontWeight: '700', color: 'var(--text-muted)', marginTop: '8px' }}
            >
              Continue Browsing Food
            </Link>
          </div>

        </div>

      </div>
    </div>
  );
}
