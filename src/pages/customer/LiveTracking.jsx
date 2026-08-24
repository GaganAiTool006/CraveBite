import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FiCheckCircle, FiClock, FiPhone, FiMapPin, FiTruck, FiArrowLeft, FiPlay } from 'react-icons/fi';
import { useCart } from '../../context/CartContext';

export default function LiveTracking() {
  const { orderId } = useParams();
  const { getOrderById, updateOrderStatus } = useCart();

  const STEPS = [
    { title: 'Order Confirmed', desc: 'Your order was sent to the kitchen', time: 'Just now' },
    { title: 'Restaurant Accepted', desc: 'Kitchen confirmed availability', time: '1 min ago' },
    { title: 'Food Preparing', desc: 'Chef is preparing your fresh meal', time: '5 mins ago' },
    { title: 'Food Ready', desc: 'Packed and waiting for pickup', time: '12 mins ago' },
    { title: 'Picked Up', desc: 'Rider collected your package', time: '18 mins ago' },
    { title: 'On the Way', desc: 'Delivery partner is arriving soon', time: '22 mins ago' },
    { title: 'Delivered', desc: 'Enjoy your hot meal!', time: '28 mins ago' }
  ];

  const order = getOrderById(orderId) || {
    orderId: orderId || 'ORD-99412',
    restaurantName: 'Napoli Woodfire Pizzeria',
    restaurantImage: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&q=80',
    totalAmount: 619.90,
    estimatedDeliveryTime: '12-15 mins',
    deliveryAddress: { flat: 'A-402, Skyline Residency', area: 'Sector 45', city: 'Jaipur' },
    deliveryPartner: { name: 'Vikram Singh', phone: '+91 97777 88899', rating: 4.92, vehicle: 'EV Bike (RJ 14 EU 5589)' },
    currentStepIndex: 5,
    items: [{ name: 'Margherita Burrata Special Pizza', quantity: 1 }, { name: 'Cheesy Garlic Bread', quantity: 1 }]
  };

  const [currentStep, setCurrentStep] = useState(order.currentStepIndex ?? 5);

  const handleAdvanceStep = () => {
    if (currentStep < STEPS.length - 1) {
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
      updateOrderStatus(order.orderId, STEPS[nextStep].title, nextStep);
    }
  };

  return (
    <div className="cb-page animate-fade-in" style={{ padding: '40px 0' }}>
      <div className="cb-container" style={{ maxWidth: '960px' }}>
        
        {/* Back Link */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <Link 
            to="/orders"
            style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-muted)', fontWeight: '700', fontSize: '14px' }}
          >
            <FiArrowLeft /> Back to Orders
          </Link>

          <button 
            onClick={handleAdvanceStep} 
            className="cb-btn cb-btn-outline cb-btn-sm"
            style={{ borderColor: 'var(--primary)', color: 'var(--primary)' }}
          >
            <FiPlay /> Simulate Next Step
          </button>
        </div>

        {/* Top Header Card */}
        <div className="cb-card" style={{ padding: '24px', marginBottom: '28px', background: 'linear-gradient(135deg, #1E1B4B 0%, #312E81 100%)', color: 'white' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
            <div>
              <span style={{ background: 'rgba(255,255,255,0.15)', color: '#C7D2FE', padding: '4px 10px', borderRadius: 'var(--radius-full)', fontSize: '12px', fontWeight: '800' }}>
                ORDER #{order.orderId}
              </span>
              <h2 style={{ fontSize: '28px', fontWeight: '900', margin: '8px 0 4px 0' }}>
                {STEPS[currentStep].title}
              </h2>
              <p style={{ color: '#E0E7FF', fontSize: '15px', margin: 0 }}>
                {STEPS[currentStep].desc}
              </p>
            </div>

            <div style={{ textAlign: 'right', background: 'rgba(255, 255, 255, 0.1)', padding: '14px 20px', borderRadius: 'var(--radius-sm)' }}>
              <span style={{ fontSize: '12px', color: '#CBD5E1', fontWeight: '700', display: 'block' }}>ESTIMATED ARRIVAL</span>
              <span style={{ fontSize: '22px', fontWeight: '900', color: 'var(--accent)' }}>
                {currentStep === 6 ? 'Delivered!' : order.estimatedDeliveryTime}
              </span>
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '28px', alignItems: 'start' }}>
          
          {/* Left: Stepper Timeline */}
          <div className="cb-card" style={{ padding: '28px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '800', marginBottom: '24px' }}>Live Order Status</h3>

            <div style={{ display: 'flex', flexDirection: 'column', position: 'relative' }}>
              {STEPS.map((step, idx) => {
                const isPassed = idx <= currentStep;
                const isCurrent = idx === currentStep;

                return (
                  <div key={idx} style={{ display: 'flex', gap: '16px', position: 'relative', paddingBottom: idx === STEPS.length - 1 ? '0' : '28px' }}>
                    
                    {/* Vertical connecting line */}
                    {idx !== STEPS.length - 1 && (
                      <div style={{
                        position: 'absolute',
                        left: '15px',
                        top: '30px',
                        bottom: '0',
                        width: '2px',
                        background: idx < currentStep ? 'var(--primary)' : 'var(--border)'
                      }} />
                    )}

                    {/* Step Icon */}
                    <div style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      background: isPassed ? 'var(--primary)' : 'var(--bg-subtle)',
                      color: isPassed ? 'white' : 'var(--text-muted)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '14px',
                      fontWeight: '800',
                      zIndex: 2,
                      boxShadow: isCurrent ? '0 0 0 4px var(--primary-light)' : 'none',
                      transition: 'all 0.3s'
                    }}>
                      {isPassed ? <FiCheckCircle size={16} /> : idx + 1}
                    </div>

                    {/* Step Info */}
                    <div style={{ flex: 1 }}>
                      <h4 style={{
                        fontSize: '15px',
                        fontWeight: '800',
                        color: isPassed ? 'var(--text-main)' : 'var(--text-muted)',
                        margin: '0 0 2px 0'
                      }}>
                        {step.title}
                      </h4>
                      <p style={{ fontSize: '12.5px', color: 'var(--text-muted)', margin: 0 }}>
                        {step.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: Map & Delivery Rider */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            {/* Map Placeholder */}
            <div className="cb-card" style={{ overflow: 'hidden' }}>
              <div style={{
                position: 'relative',
                height: '240px',
                background: 'linear-gradient(135deg, #E2E8F0 0%, #CBD5E1 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden'
              }}>
                <img 
                  src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&q=80" 
                  alt="City Map Route" 
                  style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8 }} 
                />
                
                {/* Rider moving pin overlay */}
                <div style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  background: 'var(--primary)',
                  color: 'white',
                  padding: '10px 16px',
                  borderRadius: 'var(--radius-full)',
                  boxShadow: 'var(--shadow-lg)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontWeight: '800',
                  fontSize: '13px',
                  animation: 'pulse 2s infinite'
                }}>
                  <FiTruck size={18} />
                  <span>Rider on route (800m away)</span>
                </div>
              </div>

              <div style={{ padding: '16px 20px', background: 'white' }}>
                <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: 0 }}>
                  Delivering from <strong>{order.restaurantName}</strong> to <strong>{order.deliveryAddress?.flat}, {order.deliveryAddress?.area}</strong>
                </p>
              </div>
            </div>

            {/* Delivery Partner Profile Card */}
            {order.deliveryPartner && (
              <div className="cb-card" style={{ padding: '20px' }}>
                <h4 style={{ fontSize: '14px', color: 'var(--text-muted)', fontWeight: '700', marginBottom: '14px', textTransform: 'uppercase' }}>
                  Your Delivery Partner
                </h4>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <img 
                      src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&q=80" 
                      alt="Rider" 
                      style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover' }} 
                    />
                    <div>
                      <h4 style={{ fontSize: '16px', fontWeight: '800', margin: 0 }}>{order.deliveryPartner.name}</h4>
                      <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: 0 }}>
                        ★ {order.deliveryPartner.rating} Rating • {order.deliveryPartner.vehicle}
                      </p>
                    </div>
                  </div>

                  <a 
                    href={`tel:${order.deliveryPartner.phone}`}
                    className="cb-btn cb-btn-outline cb-btn-sm"
                    style={{ color: 'var(--success)', borderColor: 'var(--success)' }}
                  >
                    <FiPhone /> Call Rider
                  </a>
                </div>
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}
