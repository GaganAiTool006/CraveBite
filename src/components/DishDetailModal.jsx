import React from 'react';
import { X, Star, Flame, Info } from 'lucide-react';

export default function DishDetailModal({ dish, restaurant, onClose, cartQty, onAddToCart, onUpdateQuantity, onOpenCustomization }) {
  if (!dish) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-card" style={{ maxWidth: '600px', padding: 0, overflow: 'hidden' }}>
        <button 
          className="modal-close-btn" 
          onClick={onClose}
          style={{ background: 'white', color: '#333', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}
        >
          <X size={20} />
        </button>

        <div style={{ height: '300px', width: '100%', position: 'relative' }}>
          <img src={dish.image} alt={dish.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)' }} />
          
          <div style={{ position: 'absolute', bottom: '20px', left: '24px', color: 'white' }}>
            {dish.isBestseller && (
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', background: '#ee5253', padding: '4px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: '800', marginBottom: '8px' }}>
                <Flame size={14} />
                <span>BESTSELLER</span>
              </div>
            )}
            <h2 style={{ fontSize: '24px', fontWeight: '800', marginBottom: '4px' }}>{dish.name}</h2>
            <div style={{ fontSize: '18px', fontWeight: '700', color: '#f0f0f0' }}>₹{dish.price}</div>
          </div>
        </div>

        <div style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                {dish.isVeg ? (
                  <div className="veg-icon-badge"><span /></div>
                ) : (
                  <div className="nonveg-icon-badge"><span /></div>
                )}
                <span style={{ fontSize: '13px', fontWeight: '700', color: dish.isVeg ? 'var(--secondary-green)' : '#e63946' }}>
                  {dish.isVeg ? 'PURE VEG' : 'NON-VEG'}
                </span>
              </div>

              {dish.rating && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px', fontWeight: '700', color: 'var(--text-dark)' }}>
                  <Star size={16} fill="var(--secondary-green)" color="var(--secondary-green)" />
                  <span>{dish.rating} ({dish.ratingCount} reviews)</span>
                </div>
              )}
            </div>

            <div style={{ width: '110px' }}>
              {cartQty === 0 ? (
                <button
                  className="add-item-btn"
                  style={{ position: 'static', width: '100%', padding: '10px' }}
                  onClick={() => {
                    if (dish.customizable) {
                      onOpenCustomization(dish, restaurant);
                    } else {
                      onAddToCart(dish, restaurant);
                    }
                  }}
                >
                  ADD {dish.customizable && '+'}
                </button>
              ) : (
                <div className="qty-counter" style={{ position: 'static', width: '100%', padding: '8px', justifyContent: 'space-between' }}>
                  <button onClick={() => onUpdateQuantity(dish.id, -1)} style={{ padding: '2px', color: 'var(--secondary-green)' }}>-</button>
                  <span style={{ fontWeight: '800' }}>{cartQty}</span>
                  <button onClick={() => {
                    if (dish.customizable) onOpenCustomization(dish, restaurant);
                    else onAddToCart(dish, restaurant);
                  }} style={{ padding: '2px', color: 'var(--secondary-green)' }}>+</button>
                </div>
              )}
            </div>
          </div>

          <p style={{ fontSize: '14px', color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: '24px' }}>
            {dish.description}
          </p>

          <div style={{ background: '#f8f9fa', padding: '16px', borderRadius: '12px', border: '1px solid #eee' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px', fontWeight: '800', marginBottom: '12px' }}>
              <Info size={16} color="var(--text-muted)" />
              <span>Nutritional Info (Approx)</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', textAlign: 'center' }}>
              <div>
                <div style={{ fontSize: '16px', fontWeight: '800', color: 'var(--text-dark)' }}>{Math.floor(Math.random() * 400 + 200)}</div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>kcal</div>
              </div>
              <div>
                <div style={{ fontSize: '16px', fontWeight: '800', color: 'var(--text-dark)' }}>{Math.floor(Math.random() * 30 + 10)}g</div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Proteins</div>
              </div>
              <div>
                <div style={{ fontSize: '16px', fontWeight: '800', color: 'var(--text-dark)' }}>{Math.floor(Math.random() * 50 + 20)}g</div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Carbs</div>
              </div>
              <div>
                <div style={{ fontSize: '16px', fontWeight: '800', color: 'var(--text-dark)' }}>{Math.floor(Math.random() * 20 + 5)}g</div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Fats</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
