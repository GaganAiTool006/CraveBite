import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { db, doc, setDoc, getDoc, collection, addDoc } from '../services/firebase';
import { COUPONS, RESTAURANTS } from '../data/mockData';

const CartContext = createContext();

export function CartProvider({ children }) {
  const { currentUser } = useAuth();
  
  // Cart state
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem(`cravebite_cart_${currentUser?.uid || 'guest'}`);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [cartRestaurant, setCartRestaurant] = useState(() => {
    try {
      const saved = localStorage.getItem(`cravebite_cart_rest_${currentUser?.uid || 'guest'}`);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [deliveryNote, setDeliveryNote] = useState('');

  // Orders list
  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem('cravebite_all_orders');
      if (saved) return JSON.parse(saved);
    } catch {}
    
    // Default initial seeded orders
    return [
      {
        orderId: 'ORD-98231',
        userId: 'cust-demo-100',
        restaurantId: 'rest-1',
        restaurantName: 'Artisan Burger Co.',
        restaurantImage: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=500&q=80',
        items: [
          { id: 'dish-101', name: 'Truffle Smash Double Cheeseburger', price: 289, quantity: 2, image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=500&q=80' },
          { id: 'dish-104', name: 'Cajun Seasoned Crinkle Fries', price: 139, quantity: 1, image: 'https://images.unsplash.com/photo-1576107232684-1279f3908594?w=500&q=80' }
        ],
        subtotal: 717,
        deliveryFee: 40,
        tax: 35.85,
        discount: 100,
        totalAmount: 692.85,
        deliveryAddress: { flat: 'A-402, Skyline Residency', area: 'Sector 45', city: 'Jaipur' },
        paymentMethod: 'UPI (Google Pay)',
        paymentStatus: 'Paid',
        orderStatus: 'Delivered',
        createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
        estimatedDeliveryTime: 'Delivered in 28 mins',
        deliveryPartner: { name: 'Vikram Singh', phone: '+91 97777 88899', rating: 4.92, vehicle: 'EV Bike (RJ 14 EU 5589)' },
        currentStepIndex: 6
      },
      {
        orderId: 'ORD-99412',
        userId: 'cust-demo-100',
        restaurantId: 'rest-3',
        restaurantName: 'Napoli Woodfire Pizzeria',
        restaurantImage: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&q=80',
        items: [
          { id: 'dish-301', name: 'Margherita Burrata Special Pizza', price: 449, quantity: 1, image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=500&q=80' },
          { id: 'dish-304', name: 'Cheesy Garlic Pull-Apart Bread', price: 189, quantity: 1, image: 'https://images.unsplash.com/photo-1619895092538-128341789043?w=500&q=80' }
        ],
        subtotal: 638,
        deliveryFee: 0,
        tax: 31.90,
        discount: 50,
        totalAmount: 619.90,
        deliveryAddress: { flat: 'A-402, Skyline Residency', area: 'Sector 45', city: 'Jaipur' },
        paymentMethod: 'Credit Card',
        paymentStatus: 'Paid',
        orderStatus: 'On the Way',
        createdAt: new Date(Date.now() - 15 * 60000).toISOString(),
        estimatedDeliveryTime: '12-15 mins',
        deliveryPartner: { name: 'Vikram Singh', phone: '+91 97777 88899', rating: 4.92, vehicle: 'EV Bike (RJ 14 EU 5589)' },
        currentStepIndex: 5
      }
    ];
  });

  // Sync cart & orders when user switches
  useEffect(() => {
    const userKey = currentUser?.uid || 'guest';
    try {
      const savedCart = localStorage.getItem(`cravebite_cart_${userKey}`);
      const savedRest = localStorage.getItem(`cravebite_cart_rest_${userKey}`);
      setCart(savedCart ? JSON.parse(savedCart) : []);
      setCartRestaurant(savedRest ? JSON.parse(savedRest) : null);

      // Load user-specific orders
      const savedUserOrders = localStorage.getItem(`cravebite_orders_${userKey}`);
      if (savedUserOrders) {
        setOrders(JSON.parse(savedUserOrders));
      } else {
        const allOrders = localStorage.getItem('cravebite_all_orders');
        if (allOrders) {
          const parsed = JSON.parse(allOrders);
          // For customers, filter to their own orders if available
          const filtered = currentUser?.role === 'customer' 
            ? parsed.filter(o => o.userId === currentUser.uid)
            : parsed;
          setOrders(filtered.length > 0 ? filtered : parsed);
        }
      }
    } catch {}
  }, [currentUser]);

  // Persist cart
  useEffect(() => {
    const userKey = currentUser?.uid || 'guest';
    localStorage.setItem(`cravebite_cart_${userKey}`, JSON.stringify(cart));
    localStorage.setItem(`cravebite_cart_rest_${userKey}`, JSON.stringify(cartRestaurant));
  }, [cart, cartRestaurant, currentUser]);

  // Persist orders per user and master list
  useEffect(() => {
    const userKey = currentUser?.uid || 'guest';
    if (orders.length > 0) {
      localStorage.setItem(`cravebite_orders_${userKey}`, JSON.stringify(orders));
      
      // Update global orders registry
      try {
        const existingAll = JSON.parse(localStorage.getItem('cravebite_all_orders') || '[]');
        const merged = [...orders];
        existingAll.forEach(o => {
          if (!merged.find(m => m.orderId === o.orderId)) {
            merged.push(o);
          }
        });
        localStorage.setItem('cravebite_all_orders', JSON.stringify(merged));
      } catch (err) {}
    }
  }, [orders, currentUser]);

  // Cart operations
  const addToCart = (item, restaurant, quantity = 1) => {
    if (cartRestaurant && cartRestaurant.id !== restaurant.id) {
      const confirmReset = window.confirm(
        `Your cart contains items from ${cartRestaurant.name}. Discard cart and start a fresh order from ${restaurant.name}?`
      );
      if (!confirmReset) return false;
      setCart([{ ...item, quantity }]);
      setCartRestaurant(restaurant);
      setAppliedCoupon(null);
      return true;
    }

    setCartRestaurant(restaurant);
    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + quantity } : i
        );
      }
      return [...prev, { ...item, quantity }];
    });
    return true;
  };

  const removeFromCart = (itemId) => {
    setCart((prev) => {
      const updated = prev.filter((i) => i.id !== itemId);
      if (updated.length === 0) setCartRestaurant(null);
      return updated;
    });
  };

  const updateQuantity = (itemId, delta) => {
    setCart((prev) => {
      const updated = prev
        .map((i) => {
          if (i.id === itemId) {
            const newQty = i.quantity + delta;
            return newQty > 0 ? { ...i, quantity: newQty } : null;
          }
          return i;
        })
        .filter(Boolean);

      if (updated.length === 0) {
        setCartRestaurant(null);
        setAppliedCoupon(null);
      }
      return updated;
    });
  };

  const clearCart = () => {
    setCart([]);
    setCartRestaurant(null);
    setAppliedCoupon(null);
    const userKey = currentUser?.uid || 'guest';
    localStorage.removeItem(`cravebite_cart_${userKey}`);
    localStorage.removeItem(`cravebite_cart_rest_${userKey}`);
  };

  // Coupons
  const applyCoupon = (code) => {
    const coupon = COUPONS.find((c) => c.code.toUpperCase() === code.toUpperCase());
    if (!coupon) return { success: false, message: 'Invalid coupon code' };
    
    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    if (subtotal < coupon.minOrder) {
      return { success: false, message: `Minimum order value ₹${coupon.minOrder} required for this coupon` };
    }

    setAppliedCoupon(coupon);
    return { success: true, message: `Coupon ${coupon.code} applied successfully!` };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
  };

  // Totals calculation
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = cart.length === 0 ? 0 : appliedCoupon?.freeDelivery ? 0 : subtotal > 500 ? 0 : 40;
  const platformFee = cart.length === 0 ? 0 : 6;
  const tax = Math.round(subtotal * 0.05 * 100) / 100;
  
  let discount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.flatDiscount) {
      discount = appliedCoupon.flatDiscount;
    } else if (appliedCoupon.discountPercent) {
      discount = Math.min((subtotal * appliedCoupon.discountPercent) / 100, appliedCoupon.maxDiscount || 999);
    }
  }

  const grandTotal = Math.max(0, Math.round((subtotal + deliveryFee + platformFee + tax - discount) * 100) / 100);
  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Place order
  const placeOrder = async ({ deliveryAddress, paymentMethod = 'UPI (Google Pay)', paymentStatus = 'Paid', instructions = '' }) => {
    if (cart.length === 0) return null;

    // Resolve restaurant metadata with fallback
    const resolvedRestaurant = cartRestaurant || RESTAURANTS.find(r => r.id === cart[0]?.restaurantId) || RESTAURANTS[0];

    // Resolve delivery address with fallback
    const resolvedAddress = deliveryAddress || currentUser?.savedAddresses?.[0] || {
      id: 'addr-default',
      tag: 'Home',
      flat: 'A-402, Skyline Residency',
      area: 'Sector 45',
      city: 'Jaipur'
    };

    const orderId = 'ORD-' + Math.floor(10000 + Math.random() * 90000);
    const newOrder = {
      orderId,
      userId: currentUser?.uid || 'guest-' + Date.now(),
      customerName: currentUser?.name || 'Aarav Sharma',
      customerPhone: currentUser?.phone || '+91 98765 43210',
      restaurantId: resolvedRestaurant?.id || 'rest-1',
      restaurantName: resolvedRestaurant?.name || 'Artisan Burger Co.',
      restaurantImage: resolvedRestaurant?.coverImage || resolvedRestaurant?.image || 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=500&q=80',
      items: [...cart],
      subtotal,
      deliveryFee,
      platformFee,
      tax,
      discount,
      totalAmount: grandTotal > 0 ? grandTotal : subtotal,
      deliveryAddress: resolvedAddress,
      paymentMethod,
      paymentStatus,
      deliveryInstructions: instructions || deliveryNote || '',
      orderStatus: 'Order Confirmed',
      currentStepIndex: 0,
      createdAt: new Date().toISOString(),
      estimatedDeliveryTime: '30-35 mins',
      deliveryPartner: {
        name: 'Vikram Singh',
        phone: '+91 97777 88899',
        rating: 4.92,
        vehicle: 'EV Bike (RJ 14 EU 5589)'
      }
    };

    // Update state & localStorage immediately
    setOrders((prev) => {
      const updated = [newOrder, ...prev];
      try {
        localStorage.setItem('cravebite_all_orders', JSON.stringify(updated));
      } catch (err) {}
      return updated;
    });

    // Push to Firestore if active
    try {
      if (db) {
        await setDoc(doc(db, 'orders', orderId), newOrder);
      }
    } catch (e) {
      console.warn("Firestore order sync offline fallback:", e.message);
    }

    clearCart();
    return newOrder;
  };

  const getOrderById = (orderId) => {
    return orders.find((o) => o.orderId === orderId);
  };

  const updateOrderStatus = (orderId, newStatus, stepIndex = null) => {
    const stepsMap = {
      'Order Confirmed': 0,
      'Restaurant Accepted': 1,
      'Food Preparing': 2,
      'Food Ready': 3,
      'Delivery Partner Picked Up': 4,
      'On the Way': 5,
      'Delivered': 6
    };

    setOrders((prev) =>
      prev.map((o) => {
        if (o.orderId === orderId) {
          const index = stepIndex !== null ? stepIndex : (stepsMap[newStatus] ?? o.currentStepIndex);
          return { ...o, orderStatus: newStatus, currentStepIndex: index };
        }
        return o;
      })
    );
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        cartRestaurant,
        totalCartCount,
        subtotal,
        deliveryFee,
        platformFee,
        tax,
        discount,
        grandTotal,
        appliedCoupon,
        deliveryNote,
        setDeliveryNote,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        applyCoupon,
        removeCoupon,
        orders,
        placeOrder,
        getOrderById,
        updateOrderStatus
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
