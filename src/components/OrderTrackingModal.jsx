import React, { useState, useEffect } from 'react';
import { X, Bike, CheckCircle, Clock, MapPin, Phone, ShieldCheck } from 'lucide-react';

export default function OrderTrackingModal({ orderData, onClose }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [etaMinutes, setEtaMinutes] = useState(24);

  useEffect(() => {
    // Simulate order progress progression every 6 seconds
    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < 4) return prev + 1;
        return prev;
      });
      setEtaMinutes((prev) => Math.max(1, prev - 4));
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  if (!orderData) return null;

  const steps = [
    { id: 1, title: 'Order Confirmed', time: 'Just now' },
    { id: 2, title: 'Preparing Food', time: '2 mins ago' },
    { id: 3, title: 'Out for Delivery', time: 'On the way' },
    { id: 4, title: 'Delivered', time: 'Enjoy your meal!' }
  ];

  return (
    <div className="modal-overlay">
      <div className="modal-card" style={{ maxWidth: '640px', padding: 0, overflow: 'hidden' }}>
        {/* Header */}
        <div style={{ background: 'var(--bg-dark)', color: 'white', padding: '24px', position: 'relative' }}>
          <button className="modal-close-btn" onClick={onClose} style={{ background: 'rgba(255,255,255,0.15)', color: 'white' }}>
            <X size={18} />
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--primary-orange)', fontWeight: '800', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '1px' }}>
            <Bike size={16} />
            <span>Live Delivery Tracking</span>
          </div>

          <h2 style={{ fontSize: '28px', fontWeight: '800', marginTop: '6px', color: 'white' }}>
            {currentStep === 4 ? 'Order Delivered! 🎉' : `Arriving in ${etaMinutes} mins`}
          </h2>
          <p style={{ fontSize: '13px', color: '#aaa', marginTop: '2px' }}>
            Order ID #{orderData.orderId} • {orderData.restaurantName}
          </p>

          {/* Stepper */}
          <div className="stepper-progress">
            <div
              style={{
                position: 'absolute',
                top: '18px',
                left: '10%',
                right: '10%',
                height: '3px',
                background: '#333952',
                zIndex: 1
              }}
            >
              <div
                style={{
                  height: '100%',
                  background: 'var(--primary-orange)',
                  width: `${((currentStep - 1) / 3) * 100}%`,
                  transition: 'width 0.6s ease'
                }}
              />
            </div>

            {steps.map((step) => {
              const isCompleted = step.id <= currentStep;
              return (
                <div key={step.id} className="stepper-step">
                  <div className={`step-circle ${isCompleted ? 'active' : ''}`}>
                    {isCompleted ? <CheckCircle size={18} /> : step.id}
                  </div>
                  <span className={`step-label ${isCompleted ? 'active' : ''}`}>{step.title}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Map Simulation Graphic */}
        <div style={{ position: 'relative', height: '180px', background: '#e8ecef', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: 'radial-gradient(#c2c9d1 1.5px, transparent 1.5px)',
              backgroundSize: '16px 16px',
              opacity: 0.6
            }}
          />
          {/* Simulated Driver Marker */}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: `${20 + currentStep * 18}%`,
              transform: 'translate(-50%, -50%)',
              transition: 'left 1s cubic-bezier(0.4, 0, 0.2, 1)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
          >
            <div style={{ background: '#FC8019', color: 'white', padding: '6px', borderRadius: '50%', boxShadow: 'var(--shadow-orange)', animation: 'pulseGlow 2s infinite' }}>
              <Bike size={24} />
            </div>
            <div style={{ background: 'white', padding: '2px 8px', borderRadius: '10px', fontSize: '10px', fontWeight: '800', marginTop: '4px', boxShadow: 'var(--shadow-sm)' }}>
              Delivery Partner
            </div>
          </div>
        </div>

        {/* Driver Details & Order Summary */}
        <div style={{ padding: '24px' }}>
          <div className="driver-sim-box">
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#FC8019', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', fontSize: '18px' }}>
              RK
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ color: 'white', fontWeight: '700', fontSize: '15px' }}>Ramesh Kumar</div>
              <div style={{ color: '#aaa', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <ShieldCheck size={14} color="var(--secondary-green)" />
                <span>Vaccinated • Rated 4.9 ★</span>
              </div>
            </div>
            <button
              style={{ background: 'var(--secondary-green)', color: 'white', padding: '10px 16px', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: '700', fontSize: '13px' }}
              onClick={() => alert('Calling delivery executive Ramesh Kumar...')}
            >
              <Phone size={14} />
              <span>Call</span>
            </button>
          </div>

          <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid #eee' }}>
            <h4 style={{ fontSize: '14px', fontWeight: '800', marginBottom: '8px' }}>Delivering to:</h4>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--text-muted)' }}>
              <MapPin size={16} color="#FC8019" />
              <span>{orderData.deliveryAddress}</span>
            </div>

            <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '14px', fontWeight: '800' }}>
              <span>Total Paid ({orderData.itemsCount} items)</span>
              <span style={{ color: 'var(--primary-orange)' }}>₹{orderData.amount}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
