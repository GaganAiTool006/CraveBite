import React, { useState } from 'react';
import { X, Star, Clock, MapPin, Plus, Minus, Flame } from 'lucide-react';

export default function RestaurantDetailModal({
  restaurant,
  onClose,
  cartItems,
  onAddToCart,
  onUpdateQuantity,
  onOpenCustomization,
  onOpenDishDetail
}) {
  const [vegOnly, setVegOnly] = useState(false);

  if (!restaurant) return null;

  const filteredMenu = restaurant.menu.filter((item) => {
    if (vegOnly && !item.isVeg) return false;
    return true;
  });

  const getItemQuantityInCart = (itemId) => {
    const existing = cartItems.filter((cartItem) => cartItem.id === itemId);
    return existing.reduce((sum, ci) => sum + ci.quantity, 0);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-card" style={{ maxWidth: '800px' }}>
        <button className="modal-close-btn" onClick={onClose}>
          <X size={20} />
        </button>

        {/* Restaurant Header Banner */}
        <div className="menu-header-banner">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <h2 className="menu-rest-title">{restaurant.name}</h2>
              <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '4px' }}>
                {restaurant.cuisine.join(', ')}
              </p>
              <p style={{ fontSize: '12px', color: 'var(--text-light)', marginTop: '2px' }}>
                {restaurant.location} • {restaurant.distance}
              </p>
            </div>

            <div style={{ background: 'white', padding: '8px 12px', borderRadius: '12px', boxShadow: 'var(--shadow-sm)', textAlign: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--secondary-green)', fontWeight: '800', fontSize: '16px' }}>
                <Star size={16} fill="var(--secondary-green)" />
                <span>{restaurant.rating}</span>
              </div>
              <div style={{ fontSize: '11px', color: 'var(--text-light)', marginTop: '2px', borderTop: '1px solid #eee', paddingTop: '4px' }}>
                {restaurant.ratingCount} ratings
              </div>
            </div>
          </div>

          <div style={{ marginTop: '16px', display: 'flex', alignItems: 'center', gap: '16px', fontSize: '14px', fontWeight: '700' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Clock size={16} color="#FC8019" />
              <span>{restaurant.deliveryTime}</span>
            </div>
            <span>•</span>
            <div>₹{restaurant.costForTwo} for two</div>
          </div>
        </div>

        {/* Veg Toggle Bar */}
        <div className="menu-filter-row">
          <label className="toggle-switch">
            <input
              type="checkbox"
              checked={vegOnly}
              onChange={(e) => setVegOnly(e.target.checked)}
              style={{ accentColor: 'var(--secondary-green)', width: '18px', height: '18px' }}
            />
            <div className="veg-icon-badge">
              <span />
            </div>
            <span>Veg Only</span>
          </label>
        </div>

        {/* Menu Items List */}
        <div>
          {filteredMenu.length === 0 ? (
            <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>
              No items match your filter criteria.
            </div>
          ) : (
            filteredMenu.map((item) => {
              const qty = getItemQuantityInCart(item.id);

              return (
                <div key={item.id} className="menu-item-row" style={{ cursor: 'pointer' }} onClick={() => onOpenDishDetail(item, restaurant)}>
                  <div className="item-left-details">
                    <div>
                      {item.isVeg ? (
                        <div className="veg-icon-badge" style={{ display: 'inline-flex' }}>
                          <span />
                        </div>
                      ) : (
                        <div className="nonveg-icon-badge" style={{ display: 'inline-flex' }}>
                          <span />
                        </div>
                      )}
                    </div>

                    {item.isBestseller && (
                      <span className="bestseller-tag">
                        <Flame size={12} fill="#ee5253" />
                        Bestseller
                      </span>
                    )}

                    <h4 className="item-name">{item.name}</h4>
                    <div className="item-price">₹{item.price}</div>
                    <p className="item-desc">{item.description}</p>
                  </div>

                  <div className="item-right-action" onClick={(e) => e.stopPropagation()}>
                    <img src={item.image} alt={item.name} className="item-img" />

                    {qty === 0 ? (
                      <button
                        className="add-item-btn"
                        onClick={() => {
                          if (item.customizable) {
                            onOpenCustomization(item, restaurant);
                          } else {
                            onAddToCart(item, restaurant);
                          }
                        }}
                      >
                        ADD {item.customizable && '+'}
                      </button>
                    ) : (
                      <div className="qty-counter">
                        <button
                          onClick={() => onUpdateQuantity(item.id, -1)}
                          style={{ padding: '2px 4px', color: 'var(--secondary-green)' }}
                        >
                          <Minus size={14} />
                        </button>
                        <span>{qty}</span>
                        <button
                          onClick={() => {
                            if (item.customizable) {
                              onOpenCustomization(item, restaurant);
                            } else {
                              onAddToCart(item, restaurant);
                            }
                          }}
                          style={{ padding: '2px 4px', color: 'var(--secondary-green)' }}
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
