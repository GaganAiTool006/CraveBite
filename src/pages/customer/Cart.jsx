import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiTrash2, FiPlus, FiMinus, FiArrowRight, FiPercent, FiShoppingBag, FiCheck, FiX } from 'react-icons/fi';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { COUPONS } from '../../data/mockData';

export default function Cart() {
  const { 
    cart, 
    cartRestaurant, 
    updateQuantity, 
    removeFromCart, 
    clearCart,
    subtotal,
    deliveryFee,
    platformFee,
    tax,
    discount,
    grandTotal,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    deliveryNote,
    setDeliveryNote
  } = useCart();

  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const [inputCoupon, setInputCoupon] = useState('');
  const [couponMessage, setCouponMessage] = useState(null);

  const handleApply = (code) => {
    const res = applyCoupon(code);
    setCouponMessage(res);
  };

  if (cart.length === 0) {
    return (
      <div className="cb-page animate-fade-in" style={{ padding: '80px 0', textAlign: 'center' }}>
        <div className="cb-container" style={{ maxWidth: '500px' }}>
          <div style={{
            width: '100px',
            height: '100px',
            background: 'var(--primary-light)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 24px auto',
            fontSize: '40px'
          }}>
            🛒
          </div>
          <h2 style={{ fontSize: '26px', fontWeight: '800', marginBottom: '8px' }}>Your Cart is Empty</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '15px', marginBottom: '32px' }}>
            Looks like you haven't added anything to your cart yet. Explore our top-rated restaurants and satisfy your cravings!
          </p>
          <Link to="/restaurants" className="cb-btn cb-btn-primary cb-btn-lg">
            Explore Restaurants
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cb-page animate-fade-in" style={{ padding: '40px 0' }}>
      <div className="cb-container">
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
          <h1 style={{ fontSize: '30px', fontWeight: '800', color: 'var(--text-main)' }}>Your Cart</h1>
          <button 
            onClick={clearCart}
            style={{ color: 'var(--danger)', fontSize: '13px', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '4px' }}
          >
            <FiTrash2 /> Clear Entire Cart
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px', alignItems: 'start' }}>
          
          {/* Left Column: Items */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            {/* Restaurant Info Header */}
            {cartRestaurant && (
              <div className="cb-card" style={{ padding: '18px 20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
                <img 
                  src={cartRestaurant.coverImage} 
                  alt={cartRestaurant.name} 
                  style={{ width: '56px', height: '56px', borderRadius: '12px', objectFit: 'cover' }} 
                />
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: '800', margin: '0 0 2px 0' }}>{cartRestaurant.name}</h3>
                  <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: 0 }}>{cartRestaurant.address}</p>
                </div>
              </div>
            )}

            {/* Cart Items List */}
            <div className="cb-card" style={{ padding: '20px' }}>
              <h3 style={{ fontSize: '17px', fontWeight: '800', marginBottom: '16px', borderBottom: '1px solid var(--border)', paddingBottom: '12px' }}>
                Order Items ({cart.length})
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {cart.map((item) => (
                  <div key={item.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1 }}>
                      <div style={{
                        width: '12px',
                        height: '12px',
                        borderRadius: '3px',
                        border: `1.5px solid ${item.isVeg ? '#10B981' : '#EF4444'}`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: item.isVeg ? '#10B981' : '#EF4444' }} />
                      </div>
                      <div>
                        <p style={{ fontSize: '14.5px', fontWeight: '700', color: 'var(--text-main)', margin: 0 }}>{item.name}</p>
                        <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>₹{item.price} each</span>
                      </div>
                    </div>

                    {/* Quantity Controls */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      background: 'var(--bg-subtle)',
                      padding: '4px 10px',
                      borderRadius: 'var(--radius-sm)'
                    }}>
                      <button onClick={() => updateQuantity(item.id, -1)} style={{ color: 'var(--text-main)' }}>
                        <FiMinus size={13} />
                      </button>
                      <span style={{ fontWeight: '800', fontSize: '14px', minWidth: '16px', textAlign: 'center' }}>
                        {item.quantity}
                      </span>
                      <button onClick={() => updateQuantity(item.id, 1)} style={{ color: 'var(--primary)' }}>
                        <FiPlus size={13} />
                      </button>
                    </div>

                    {/* Price total */}
                    <div style={{ fontWeight: '800', fontSize: '15px', color: 'var(--text-main)', minWidth: '60px', textAlign: 'right' }}>
                      ₹{item.price * item.quantity}
                    </div>

                    {/* Remove icon */}
                    <button onClick={() => removeFromCart(item.id)} style={{ color: '#94A3B8', padding: '4px' }}>
                      <FiTrash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Delivery Note */}
            <div className="cb-card" style={{ padding: '16px 20px' }}>
              <label style={{ fontSize: '14px', fontWeight: '700', display: 'block', marginBottom: '8px' }}>
                Cooking / Delivery Instructions
              </label>
              <input 
                type="text" 
                placeholder="E.g. Extra napkins, less spicy, ring the doorbell twice..." 
                value={deliveryNote}
                onChange={(e) => setDeliveryNote(e.target.value)}
                className="cb-input"
              />
            </div>

          </div>

          {/* Right Column: Bill Summary & Checkout CTA */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            {/* Coupon Box */}
            <div className="cb-card" style={{ padding: '20px' }}>
              <h4 style={{ fontSize: '15px', fontWeight: '800', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <FiPercent color="var(--accent)" /> Apply Coupon Code
              </h4>

              {appliedCoupon ? (
                <div style={{
                  background: 'var(--success-light)',
                  border: '1.5px solid var(--success)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '12px 16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}>
                  <div>
                    <span style={{ fontWeight: '900', color: 'var(--success)', fontSize: '14px' }}>{appliedCoupon.code}</span>
                    <p style={{ fontSize: '12px', color: '#065F46', margin: 0 }}>You saved ₹{discount} with this coupon!</p>
                  </div>
                  <button onClick={removeCoupon} style={{ color: 'var(--danger)', fontWeight: '800', fontSize: '12px' }}>
                    REMOVE
                  </button>
                </div>
              ) : (
                <div style={{ display: 'flex', gap: '10px' }}>
                  <input 
                    type="text"
                    placeholder="Enter coupon code (e.g. CRAVE50)"
                    value={inputCoupon}
                    onChange={(e) => setInputCoupon(e.target.value)}
                    style={{
                      flex: 1,
                      padding: '10px 14px',
                      borderRadius: 'var(--radius-sm)',
                      border: '1.5px solid var(--border)',
                      outline: 'none',
                      fontSize: '14px',
                      textTransform: 'uppercase',
                      fontWeight: '700'
                    }}
                  />
                  <button 
                    onClick={() => handleApply(inputCoupon)}
                    className="cb-btn cb-btn-primary"
                    style={{ padding: '10px 18px' }}
                  >
                    Apply
                  </button>
                </div>
              )}

              {couponMessage && !appliedCoupon && (
                <p style={{ fontSize: '12px', color: couponMessage.success ? 'var(--success)' : 'var(--danger)', marginTop: '8px', fontWeight: '600' }}>
                  {couponMessage.message}
                </p>
              )}

              {/* Quick voucher pills */}
              {!appliedCoupon && (
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '14px' }}>
                  {COUPONS.slice(0, 3).map(c => (
                    <button 
                      key={c.code}
                      onClick={() => handleApply(c.code)}
                      style={{
                        background: 'var(--bg-subtle)',
                        border: '1px dashed var(--border)',
                        padding: '4px 10px',
                        borderRadius: 'var(--radius-xs)',
                        fontSize: '11px',
                        fontWeight: '700',
                        color: 'var(--primary)'
                      }}
                    >
                      {c.code}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Bill Details */}
            <div className="cb-card" style={{ padding: '24px' }}>
              <h3 style={{ fontSize: '17px', fontWeight: '800', marginBottom: '18px', borderBottom: '1px solid var(--border)', paddingBottom: '12px' }}>
                Bill Summary
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '14px', color: 'var(--text-main)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Item Total</span>
                  <span style={{ fontWeight: '700' }}>₹{subtotal}</span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Delivery Partner Fee</span>
                  <span style={{ fontWeight: '700', color: deliveryFee === 0 ? 'var(--success)' : 'inherit' }}>
                    {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}
                  </span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Platform Fee</span>
                  <span style={{ fontWeight: '700' }}>₹{platformFee}</span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>GST & Restaurant Charges</span>
                  <span style={{ fontWeight: '700' }}>₹{tax}</span>
                </div>

                {discount > 0 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--success)', fontWeight: '700' }}>
                    <span>Coupon Discount</span>
                    <span>-₹{discount}</span>
                  </div>
                )}

                <div style={{ borderTop: '1.5px dashed var(--border)', paddingTop: '14px', marginTop: '4px', display: 'flex', justifyContent: 'space-between', fontSize: '18px', fontWeight: '900', color: 'var(--text-main)' }}>
                  <span>To Pay</span>
                  <span style={{ color: 'var(--primary)' }}>₹{grandTotal}</span>
                </div>
              </div>

              <div style={{ marginTop: '24px' }}>
                <button 
                  onClick={() => navigate('/checkout')}
                  className="cb-btn cb-btn-primary cb-btn-lg"
                  style={{ width: '100%' }}
                >
                  Proceed to Checkout <FiArrowRight />
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
