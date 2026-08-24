import React, { useState } from 'react';
import { X, ShoppingBag, Plus, Minus, Tag, ShieldCheck, ArrowRight, Check } from 'lucide-react';
import { COUPONS } from '../data/mockData';

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  restaurant,
  onUpdateQuantity,
  onClearCart,
  onPlaceOrder,
  activeCouponCode,
  onApplyCouponCode
}) {
  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');

  if (!isOpen) return null;

  const calculateSubtotal = () => {
    return cartItems.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);
  };

  const subtotal = calculateSubtotal();

  const getDiscount = () => {
    if (!activeCouponCode) return 0;
    const coupon = COUPONS.find((c) => c.code === activeCouponCode);
    if (!coupon) return 0;

    if (coupon.discountAmount) return coupon.discountAmount;
    if (coupon.discountPercent) {
      const calc = (subtotal * coupon.discountPercent) / 100;
      return coupon.maxDiscount ? Math.min(calc, coupon.maxDiscount) : calc;
    }
    return 0;
  };

  const discount = getDiscount();
  const deliveryFee = activeCouponCode === 'FREEDEL' || subtotal > 499 ? 0 : 35;
  const govtTax = Math.round(subtotal * 0.05); // 5% GST
  const grandTotal = Math.max(0, subtotal - discount + deliveryFee + govtTax);

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    const found = COUPONS.find((c) => c.code.toUpperCase() === couponInput.trim().toUpperCase());
    if (found) {
      if (subtotal < found.minOrder) {
        setCouponError(`Minimum order amount for code ${found.code} is ₹${found.minOrder}`);
      } else {
        onApplyCouponCode(found.code);
        setCouponError('');
        setCouponInput('');
      }
    } else {
      setCouponError('Invalid coupon code. Try SWIGGY50 or WELCOME100');
    }
  };

  return (
    <div className="cart-drawer-overlay">
      <div className="cart-drawer-content">
        <div className="cart-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <ShoppingBag size={20} color="#FC8019" />
            <h3 style={{ fontSize: '18px', fontWeight: '800' }}>Your Food Cart</h3>
          </div>
          <button onClick={onClose} className="modal-close-btn" style={{ position: 'static' }}>
            <X size={18} />
          </button>
        </div>

        <div className="cart-body">
          {cartItems.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 20px' }}>
              <div style={{ fontSize: '64px', marginBottom: '16px' }}>🍽️</div>
              <h4 style={{ fontSize: '18px', fontWeight: '800', marginBottom: '8px' }}>Your cart is empty</h4>
              <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                Good food is always cooking! Go ahead and order some yummy dishes.
              </p>
            </div>
          ) : (
            <>
              {/* Restaurant Banner */}
              {restaurant && (
                <div style={{ padding: '12px 16px', background: '#fff2e6', borderRadius: '12px', marginBottom: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: '800', color: 'var(--text-dark)' }}>{restaurant.name}</div>
                    <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{restaurant.location}</div>
                  </div>
                  <button style={{ fontSize: '12px', color: '#e63946', fontWeight: '700' }} onClick={onClearCart}>
                    Clear
                  </button>
                </div>
              )}

              {/* Cart Items List */}
              {cartItems.map((item) => (
                <div key={item.cartItemId} className="cart-item-card">
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '14px', fontWeight: '700' }}>{item.name}</div>
                    {item.selectedChoicesText && (
                      <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>
                        {item.selectedChoicesText}
                      </div>
                    )}
                    <div style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-dark)', marginTop: '4px' }}>
                      ₹{item.unitPrice * item.quantity}
                    </div>
                  </div>

                  <div className="qty-counter" style={{ position: 'static', width: '80px' }}>
                    <button onClick={() => onUpdateQuantity(item.cartItemId, -1)}>
                      <Minus size={12} />
                    </button>
                    <span style={{ fontSize: '13px' }}>{item.quantity}</span>
                    <button onClick={() => onUpdateQuantity(item.cartItemId, 1)}>
                      <Plus size={12} />
                    </button>
                  </div>
                </div>
              ))}

              {/* Coupon Section */}
              <div style={{ marginTop: '24px' }}>
                <form onSubmit={handleApplyCoupon} style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                  <input
                    type="text"
                    placeholder="Enter Coupon Code (e.g. SWIGGY50)"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    style={{ flex: 1, padding: '10px 14px', borderRadius: '8px', border: '1px solid #ccc', fontSize: '13px', textTransform: 'uppercase' }}
                  />
                  <button
                    type="submit"
                    style={{ background: 'var(--text-dark)', color: 'white', fontWeight: '700', padding: '10px 16px', borderRadius: '8px', fontSize: '13px' }}
                  >
                    Apply
                  </button>
                </form>

                {activeCouponCode && (
                  <div className="coupon-section">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Tag size={16} color="#FC8019" />
                      <div>
                        <div style={{ fontSize: '13px', fontWeight: '800', color: '#FC8019' }}>
                          Code '{activeCouponCode}' Applied!
                        </div>
                        <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>You saved ₹{discount}</div>
                      </div>
                    </div>
                    <button
                      onClick={() => onApplyCouponCode(null)}
                      style={{ fontSize: '12px', color: '#888', fontWeight: '700' }}
                    >
                      Remove
                    </button>
                  </div>
                )}

                {couponError && (
                  <div style={{ fontSize: '12px', color: '#e63946', marginTop: '4px', fontWeight: '500' }}>
                    {couponError}
                  </div>
                )}
              </div>

              {/* Bill Details */}
              <div className="bill-details-box">
                <div style={{ fontSize: '14px', fontWeight: '800', marginBottom: '12px' }}>Bill Details</div>

                <div className="bill-row">
                  <span>Item Total</span>
                  <span>₹{subtotal}</span>
                </div>

                {discount > 0 && (
                  <div className="bill-row" style={{ color: 'var(--secondary-green)', fontWeight: '600' }}>
                    <span>Coupon Discount</span>
                    <span>- ₹{discount}</span>
                  </div>
                )}

                <div className="bill-row">
                  <span>Delivery Fee</span>
                  <span>{deliveryFee === 0 ? <span style={{ color: 'var(--secondary-green)', fontWeight: '700' }}>FREE</span> : `₹${deliveryFee}`}</span>
                </div>

                <div className="bill-row">
                  <span>Govt Taxes (5% GST)</span>
                  <span>₹{govtTax}</span>
                </div>

                <div className="bill-row total">
                  <span>TO PAY</span>
                  <span>₹{grandTotal}</span>
                </div>
              </div>

              {/* Safety guarantee */}
              <div style={{ marginTop: '16px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: 'var(--text-muted)', background: '#f5f5f5', padding: '10px 14px', borderRadius: '8px' }}>
                <ShieldCheck size={18} color="var(--secondary-green)" />
                <span>100% Hygienic Packaging & No Contact Delivery Guaranteed</span>
              </div>
            </>
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="cart-footer">
            <button className="checkout-btn" onClick={() => onPlaceOrder(grandTotal)}>
              <div>
                <div style={{ fontSize: '12px', opacity: 0.85 }}>{cartItems.length} ITEMS</div>
                <div style={{ fontSize: '18px', fontWeight: '800' }}>₹{grandTotal}</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span>PROCEED TO PAY</span>
                <ArrowRight size={18} />
              </div>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
