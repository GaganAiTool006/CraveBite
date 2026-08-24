import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FiMapPin, FiCreditCard, FiCheckCircle, FiShield, FiPlus, FiPhone, FiUser } from 'react-icons/fi';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';

export default function Checkout() {
  const { cart, cartRestaurant, subtotal, deliveryFee, platformFee, tax, discount, grandTotal, placeOrder, deliveryNote } = useCart();
  const { currentUser, addAddress } = useAuth();
  const navigate = useNavigate();

  const [selectedAddressId, setSelectedAddressId] = useState(() => {
    const defaultAddr = (currentUser?.savedAddresses || []).find(a => a.isDefault);
    return defaultAddr ? defaultAddr.id : (currentUser?.savedAddresses?.[0]?.id || 'addr-default');
  });

  const [paymentMethod, setPaymentMethod] = useState('UPI (Google Pay / PhonePe)');
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [showAddAddressModal, setShowAddAddressModal] = useState(false);
  const [newAddress, setNewAddress] = useState({ tag: 'Home', flat: '', area: '', city: 'Jaipur' });

  if (cart.length === 0) {
    navigate('/cart');
    return null;
  }

  const addresses = currentUser?.savedAddresses || [
    { id: 'addr-default', tag: 'Home', flat: 'A-402, Skyline Residency', area: 'Sector 45', city: 'Jaipur', isDefault: true }
  ];

  const currentSelectedAddr = addresses.find(a => a.id === selectedAddressId) || addresses[0];

  const handleSaveNewAddress = (e) => {
    e.preventDefault();
    if (newAddress.flat && newAddress.area) {
      addAddress(newAddress);
      setShowAddAddressModal(false);
      setNewAddress({ tag: 'Home', flat: '', area: '', city: 'Jaipur' });
    }
  };

  const handlePlaceOrderSubmit = async () => {
    setIsPlacingOrder(true);
    try {
      const order = await placeOrder({
        deliveryAddress: currentSelectedAddr || addresses[0],
        paymentMethod,
        paymentStatus: paymentMethod === 'Cash on Delivery' ? 'Pending' : 'Paid',
        instructions: deliveryNote
      });

      if (order && order.orderId) {
        setTimeout(() => {
          setIsPlacingOrder(false);
          navigate(`/order-success/${order.orderId}`, { replace: true });
        }, 800);
      } else {
        setIsPlacingOrder(false);
        alert('Your cart is empty. Please add delicious items to place an order.');
      }
    } catch (err) {
      setIsPlacingOrder(false);
      alert('Failed to place order: ' + (err.message || 'Please try again.'));
    }
  };

  return (
    <div className="cb-page animate-fade-in" style={{ padding: '40px 0' }}>
      <div className="cb-container" style={{ maxWidth: '1000px' }}>
        
        <h1 style={{ fontSize: '30px', fontWeight: '800', color: 'var(--text-main)', marginBottom: '32px' }}>
          Checkout & Place Order
        </h1>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px', alignItems: 'start' }}>
          
          {/* Left Flow */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            
            {/* 1. Delivery Address */}
            <div className="cb-card" style={{ padding: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <FiMapPin color="var(--primary)" /> 1. Delivery Address
                </h3>
                <button 
                  onClick={() => setShowAddAddressModal(true)}
                  style={{ color: 'var(--primary)', fontSize: '13px', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '4px' }}
                >
                  <FiPlus /> Add New Address
                </button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
                {addresses.map((addr) => (
                  <div 
                    key={addr.id}
                    onClick={() => setSelectedAddressId(addr.id)}
                    style={{
                      border: '2px solid',
                      borderColor: selectedAddressId === addr.id ? 'var(--primary)' : 'var(--border)',
                      background: selectedAddressId === addr.id ? 'var(--primary-50)' : 'white',
                      padding: '16px',
                      borderRadius: 'var(--radius-sm)',
                      cursor: 'pointer',
                      position: 'relative'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                      <span className="cb-badge cb-badge-primary" style={{ fontSize: '11px' }}>{addr.tag}</span>
                      {selectedAddressId === addr.id && <FiCheckCircle color="var(--primary)" size={18} />}
                    </div>
                    <p style={{ fontSize: '14px', fontWeight: '700', color: 'var(--text-main)', margin: '0 0 4px 0' }}>{addr.flat}</p>
                    <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: 0 }}>{addr.area}, {addr.city}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* 2. Contact Details */}
            <div className="cb-card" style={{ padding: '24px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                <FiPhone color="var(--primary)" /> 2. Contact & Delivery Info
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                <div>
                  <label style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: '700' }}>CUSTOMER NAME</label>
                  <p style={{ fontSize: '15px', fontWeight: '700', margin: '4px 0' }}>{currentUser?.name || 'Aarav Sharma'}</p>
                </div>
                <div>
                  <label style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: '700' }}>PHONE NUMBER</label>
                  <p style={{ fontSize: '15px', fontWeight: '700', margin: '4px 0' }}>{currentUser?.phone || '+91 98765 43210'}</p>
                </div>
              </div>
            </div>

            {/* 3. Payment Method */}
            <div className="cb-card" style={{ padding: '24px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '18px' }}>
                <FiCreditCard color="var(--primary)" /> 3. Select Payment Method
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {[
                  { id: 'upi', label: 'UPI (Google Pay / PhonePe / Paytm)', desc: 'Fastest payment, zero extra fee' },
                  { id: 'card', label: 'Credit or Debit Card', desc: 'Visa, MasterCard, RuPay & Amex accepted' },
                  { id: 'netbanking', label: 'Net Banking', desc: 'All Indian major banks supported' },
                  { id: 'cod', label: 'Cash on Delivery', desc: 'Pay via cash or UPI to rider upon arrival' }
                ].map((pm) => (
                  <label 
                    key={pm.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '14px',
                      padding: '14px 18px',
                      borderRadius: 'var(--radius-sm)',
                      border: '1.5px solid',
                      borderColor: paymentMethod === pm.label ? 'var(--primary)' : 'var(--border)',
                      background: paymentMethod === pm.label ? 'var(--primary-50)' : 'white',
                      cursor: 'pointer'
                    }}
                  >
                    <input 
                      type="radio" 
                      name="payment" 
                      checked={paymentMethod === pm.label} 
                      onChange={() => setPaymentMethod(pm.label)} 
                      style={{ accentColor: 'var(--primary)' }}
                    />
                    <div>
                      <span style={{ fontSize: '14.5px', fontWeight: '700', color: 'var(--text-main)', display: 'block' }}>{pm.label}</span>
                      <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{pm.desc}</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>

          </div>

          {/* Right Summary Box */}
          <div className="cb-card" style={{ padding: '24px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '800', marginBottom: '16px', borderBottom: '1px solid var(--border)', paddingBottom: '12px' }}>
              Order Summary
            </h3>

            {/* Restaurant tag */}
            <div style={{ marginBottom: '16px' }}>
              <p style={{ fontSize: '15px', fontWeight: '800', color: 'var(--text-main)', margin: '0 0 2px 0' }}>{cartRestaurant?.name}</p>
              <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: 0 }}>Estimated arrival in 30 mins</p>
            </div>

            {/* Item list brief */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '18px', borderBottom: '1px solid var(--border)', paddingBottom: '16px' }}>
              {cart.map(i => (
                <div key={i.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13.5px' }}>
                  <span style={{ color: 'var(--text-muted)' }}>{i.quantity}x {i.name}</span>
                  <span style={{ fontWeight: '700' }}>₹{i.price * i.quantity}</span>
                </div>
              ))}
            </div>

            {/* Price list */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '14px', marginBottom: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>Item Subtotal</span>
                <span style={{ fontWeight: '600' }}>₹{subtotal}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>Delivery Fee</span>
                <span style={{ fontWeight: '600', color: deliveryFee === 0 ? 'var(--success)' : 'inherit' }}>
                  {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>Platform Fee</span>
                <span style={{ fontWeight: '600' }}>₹{platformFee}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>Taxes & GST</span>
                <span style={{ fontWeight: '600' }}>₹{tax}</span>
              </div>
              {discount > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--success)', fontWeight: '700' }}>
                  <span>Discounts</span>
                  <span>-₹{discount}</span>
                </div>
              )}
              <div style={{ borderTop: '1.5px dashed var(--border)', paddingTop: '12px', display: 'flex', justifyContent: 'space-between', fontSize: '18px', fontWeight: '900' }}>
                <span>Grand Total</span>
                <span style={{ color: 'var(--primary)' }}>₹{grandTotal}</span>
              </div>
            </div>

            {/* Place Order CTA */}
            <button
              onClick={handlePlaceOrderSubmit}
              disabled={isPlacingOrder}
              className="cb-btn cb-btn-primary cb-btn-lg"
              style={{ width: '100%', cursor: isPlacingOrder ? 'not-allowed' : 'pointer' }}
            >
              {isPlacingOrder ? 'Confirming Order with Kitchen...' : `Place Order • ₹${grandTotal}`}
            </button>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', fontSize: '12px', color: 'var(--text-muted)', marginTop: '14px' }}>
              <FiShield color="var(--success)" />
              <span>Safe & 100% Encrypted Payment</span>
            </div>
          </div>

        </div>

      </div>

      {/* Add Address Modal */}
      {showAddAddressModal && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '20px'
        }}>
          <form onSubmit={handleSaveNewAddress} style={{
            background: 'white',
            borderRadius: 'var(--radius-md)',
            padding: '28px',
            maxWidth: '460px',
            width: '100%',
            boxShadow: 'var(--shadow-lg)'
          }}>
            <h3 style={{ fontSize: '18px', fontWeight: '800', marginBottom: '18px' }}>Add New Delivery Address</h3>

            <div className="cb-form-group">
              <label className="cb-label">Tag (e.g. Home, Work, Gym)</label>
              <select 
                value={newAddress.tag} 
                onChange={(e) => setNewAddress({ ...newAddress, tag: e.target.value })}
                className="cb-input"
              >
                <option>Home</option>
                <option>Work</option>
                <option>Other</option>
              </select>
            </div>

            <div className="cb-form-group">
              <label className="cb-label">Flat / House No. / Building</label>
              <input 
                type="text" 
                required 
                placeholder="E.g. Flat 302, Green Orchid" 
                value={newAddress.flat} 
                onChange={(e) => setNewAddress({ ...newAddress, flat: e.target.value })}
                className="cb-input" 
              />
            </div>

            <div className="cb-form-group">
              <label className="cb-label">Area / Street / Landmark</label>
              <input 
                type="text" 
                required 
                placeholder="E.g. Near Central Mall, Tonk Road" 
                value={newAddress.area} 
                onChange={(e) => setNewAddress({ ...newAddress, area: e.target.value })}
                className="cb-input" 
              />
            </div>

            <div className="cb-form-group">
              <label className="cb-label">City</label>
              <input 
                type="text" 
                value={newAddress.city} 
                onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                className="cb-input" 
              />
            </div>

            <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
              <button type="button" onClick={() => setShowAddAddressModal(false)} className="cb-btn cb-btn-subtle" style={{ flex: 1 }}>
                Cancel
              </button>
              <button type="submit" className="cb-btn cb-btn-primary" style={{ flex: 1 }}>
                Save & Select
              </button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
}
