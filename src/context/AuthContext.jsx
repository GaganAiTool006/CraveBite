import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  auth, 
  db, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  sendPasswordResetEmail,
  doc, 
  setDoc, 
  getDoc, 
  updateDoc 
} from '../services/firebase';
import { DEMO_USERS } from '../data/mockData';

const AuthContext = createContext();

// Fixed Internal Credentials
export const FIXED_ROLE_CREDENTIALS = {
  manager: {
    usernames: ['ccadmin', 'ccadmin@cravebite.internal', 'manager@cravebite.com'],
    password: 'CC735710',
    role: 'manager',
    name: 'Operations Manager',
    phone: '+91 99888 77665',
    profileImage: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&q=80'
  },
  admin: {
    usernames: ['admin', 'admin@cravebite.com', 'superadmin@cravebite.com'],
    password: 'admin123',
    role: 'admin',
    name: 'Super Admin',
    phone: '+91 98765 11111',
    profileImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80'
  },
  restaurant: {
    usernames: ['restaurant', 'burgerco', 'restaurant@cravebite.com', 'partner@cravebite.com'],
    password: '123456',
    role: 'restaurant',
    name: 'Artisan Burger Co.',
    restaurantName: 'Artisan Burger Co.',
    restaurantId: 'rest-1',
    phone: '+91 98765 22222',
    profileImage: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=200&q=80'
  },
  delivery: {
    usernames: ['delivery', 'rider', 'delivery@cravebite.com', 'rider@cravebite.com'],
    password: '123456',
    role: 'delivery',
    name: 'Vikram Singh',
    phone: '+91 97777 88899',
    vehicle: 'EV Bike (RJ 14 EU 5589)',
    profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80'
  }
};

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem('cravebite_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [loading, setLoading] = useState(true);

  // Sync current user to localStorage and master users registry
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('cravebite_user', JSON.stringify(currentUser));
      try {
        const allUsers = JSON.parse(localStorage.getItem('cravebite_all_users') || '{}');
        allUsers[currentUser.uid] = currentUser;
        localStorage.setItem('cravebite_all_users', JSON.stringify(allUsers));

        // Also save by email key for instant matching on re-login
        if (currentUser.email) {
          const userDb = JSON.parse(localStorage.getItem('cravebite_user_db') || '{}');
          userDb[currentUser.email.toLowerCase()] = currentUser;
          localStorage.setItem('cravebite_user_db', JSON.stringify(userDb));
        }
      } catch (e) {
        console.error("Local storage error:", e);
      }
    } else {
      localStorage.removeItem('cravebite_user');
    }
  }, [currentUser]);

  // Firebase auth state observer
  useEffect(() => {
    let isMounted = true;

    if (auth) {
      try {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
          if (user) {
            try {
              if (db) {
                const userDocRef = doc(db, 'users', user.uid);
                const userSnap = await getDoc(userDocRef);
                if (userSnap.exists() && isMounted) {
                  setCurrentUser({ uid: user.uid, ...userSnap.data() });
                }
              }
            } catch (err) {
              console.warn("Firestore sync notice:", err);
            }
          }
          if (isMounted) setLoading(false);
        });
        return () => {
          isMounted = false;
          unsubscribe();
        };
      } catch (e) {
        if (isMounted) setLoading(false);
      }
    } else {
      const timer = setTimeout(() => {
        if (isMounted) setLoading(false);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, []);

  // Customer / User Registration
  const register = async ({ name, email, phone, password, role = 'customer', restaurantName }) => {
    setLoading(true);
    try {
      const cleanEmail = email.trim().toLowerCase();

      // Check if user already exists
      const userDb = JSON.parse(localStorage.getItem('cravebite_user_db') || '{}');
      if (userDb[cleanEmail]) {
        setLoading(false);
        return { success: false, error: 'An account with this email already exists. Please sign in.' };
      }

      let uid = 'cust-' + Date.now();
      try {
        if (auth) {
          const userCredential = await createUserWithEmailAndPassword(auth, email, password);
          uid = userCredential.user.uid;
        }
      } catch (err) {
        console.warn("Firebase Auth notice:", err.message);
      }

      const userData = {
        uid,
        name: name || cleanEmail.split('@')[0],
        email: cleanEmail,
        password, // stored locally for session verification
        phone: phone || '+91 98765 00000',
        role,
        restaurantName: role === 'restaurant' ? (restaurantName || name + "'s Kitchen") : null,
        restaurantId: role === 'restaurant' ? 'rest-' + Date.now() : null,
        profileImage: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&q=80',
        savedAddresses: [
          { id: 'addr-1', tag: 'Home', flat: 'Flat 101, Sunshine Heights', area: 'Sector 45', city: 'Jaipur', isDefault: true }
        ],
        favouriteRestaurants: ['rest-1'],
        favouriteFoods: ['dish-101'],
        createdAt: new Date().toISOString()
      };

      // Save to user DB
      userDb[cleanEmail] = userData;
      localStorage.setItem('cravebite_user_db', JSON.stringify(userDb));

      try {
        if (db) {
          await setDoc(doc(db, 'users', uid), userData);
        }
      } catch (err) {}

      setCurrentUser(userData);
      setLoading(false);
      return { success: true, user: userData };
    } catch (error) {
      setLoading(false);
      return { success: false, error: error.message };
    }
  };

  // Unified Login (handles Customer, Manager, Admin, Restaurant, Delivery)
  const login = async (identifier, password, portalRole = null) => {
    setLoading(true);
    try {
      const cleanId = identifier.trim().toLowerCase();
      if (!cleanId || !password) {
        setLoading(false);
        return { success: false, error: 'Please enter both username/email and password.' };
      }

      // 1. Check Fixed Role: Operations Manager
      if (portalRole === 'manager' || FIXED_ROLE_CREDENTIALS.manager.usernames.includes(cleanId)) {
        if (password !== FIXED_ROLE_CREDENTIALS.manager.password) {
          setLoading(false);
          return { success: false, error: 'Incorrect Manager credentials. Access Denied.' };
        }
        const managerUser = {
          uid: 'manager-fixed-100',
          email: 'ccadmin@cravebite.internal',
          username: 'ccadmin',
          name: FIXED_ROLE_CREDENTIALS.manager.name,
          role: 'manager',
          phone: FIXED_ROLE_CREDENTIALS.manager.phone,
          profileImage: FIXED_ROLE_CREDENTIALS.manager.profileImage
        };
        setCurrentUser(managerUser);
        setLoading(false);
        return { success: true, user: managerUser };
      }

      // 2. Check Fixed Role: Super Admin
      if (portalRole === 'admin' || FIXED_ROLE_CREDENTIALS.admin.usernames.includes(cleanId)) {
        if (password !== FIXED_ROLE_CREDENTIALS.admin.password) {
          setLoading(false);
          return { success: false, error: 'Incorrect Super Admin password. Access Denied.' };
        }
        const adminUser = {
          uid: 'admin-fixed-100',
          email: 'admin@cravebite.com',
          username: 'admin',
          name: FIXED_ROLE_CREDENTIALS.admin.name,
          role: 'admin',
          phone: FIXED_ROLE_CREDENTIALS.admin.phone,
          profileImage: FIXED_ROLE_CREDENTIALS.admin.profileImage
        };
        setCurrentUser(adminUser);
        setLoading(false);
        return { success: true, user: adminUser };
      }

      // 3. Check Fixed Role: Restaurant Partner
      if (portalRole === 'restaurant' || FIXED_ROLE_CREDENTIALS.restaurant.usernames.includes(cleanId)) {
        if (password !== FIXED_ROLE_CREDENTIALS.restaurant.password) {
          setLoading(false);
          return { success: false, error: 'Incorrect Restaurant Partner credentials. Access Denied.' };
        }
        const restUser = {
          uid: 'rest-partner-100',
          email: 'restaurant@cravebite.com',
          username: 'burgerco',
          name: FIXED_ROLE_CREDENTIALS.restaurant.name,
          restaurantName: FIXED_ROLE_CREDENTIALS.restaurant.restaurantName,
          restaurantId: FIXED_ROLE_CREDENTIALS.restaurant.restaurantId,
          role: 'restaurant',
          phone: FIXED_ROLE_CREDENTIALS.restaurant.phone,
          profileImage: FIXED_ROLE_CREDENTIALS.restaurant.profileImage
        };
        setCurrentUser(restUser);
        setLoading(false);
        return { success: true, user: restUser };
      }

      // 4. Check Fixed Role: Delivery Rider
      if (portalRole === 'delivery' || FIXED_ROLE_CREDENTIALS.delivery.usernames.includes(cleanId)) {
        if (password !== FIXED_ROLE_CREDENTIALS.delivery.password) {
          setLoading(false);
          return { success: false, error: 'Incorrect Delivery Partner password. Access Denied.' };
        }
        const deliveryUser = {
          uid: 'rider-fixed-100',
          email: 'delivery@cravebite.com',
          username: 'rider',
          name: FIXED_ROLE_CREDENTIALS.delivery.name,
          role: 'delivery',
          phone: FIXED_ROLE_CREDENTIALS.delivery.phone,
          vehicle: FIXED_ROLE_CREDENTIALS.delivery.vehicle,
          profileImage: FIXED_ROLE_CREDENTIALS.delivery.profileImage
        };
        setCurrentUser(deliveryUser);
        setLoading(false);
        return { success: true, user: deliveryUser };
      }

      // 5. Customer Login: Check registered user database
      const userDb = JSON.parse(localStorage.getItem('cravebite_user_db') || '{}');
      const existingCustomer = userDb[cleanId];

      if (existingCustomer) {
        // If customer set password, verify it
        if (existingCustomer.password && existingCustomer.password !== password) {
          setLoading(false);
          return { success: false, error: 'Incorrect password for this customer account.' };
        }
        setCurrentUser(existingCustomer);
        setLoading(false);
        return { success: true, user: existingCustomer };
      }

      // Check Demo Users default customer
      if (cleanId === 'customer@cravebite.com' || cleanId === 'customer') {
        const demoCust = DEMO_USERS.customer;
        setCurrentUser(demoCust);
        setLoading(false);
        return { success: true, user: demoCust };
      }

      // 6. Firebase live auth fallback
      if (auth && cleanId.includes('@')) {
        try {
          const userCredential = await signInWithEmailAndPassword(auth, cleanId, password);
          const uid = userCredential.user.uid;
          let userData = { uid, email: cleanId, name: cleanId.split('@')[0], role: 'customer' };
          if (db) {
            try {
              const userSnap = await getDoc(doc(db, 'users', uid));
              if (userSnap.exists()) userData = { uid, ...userSnap.data() };
            } catch (e) {}
          }
          userDb[cleanId] = userData;
          localStorage.setItem('cravebite_user_db', JSON.stringify(userDb));
          setCurrentUser(userData);
          setLoading(false);
          return { success: true, user: userData };
        } catch (e) {}
      }

      // 7. Auto-provision new customer account for fresh logins (seamless customer entry)
      const newCustomer = {
        uid: 'cust-' + cleanId.replace(/[^a-z0-9]/g, '-') + '-' + Date.now().toString().slice(-4),
        name: cleanId.includes('@') ? cleanId.split('@')[0] : cleanId,
        email: cleanId.includes('@') ? cleanId : `${cleanId}@customer.cravebite`,
        password,
        phone: '+91 98765 ' + Math.floor(10000 + Math.random() * 90000),
        role: 'customer',
        savedAddresses: [
          { id: 'addr-default', tag: 'Home', flat: 'A-402, Skyline Residency', area: 'Sector 45', city: 'Jaipur', isDefault: true }
        ],
        favouriteRestaurants: ['rest-1'],
        favouriteFoods: ['dish-101'],
        profileImage: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&q=80',
        createdAt: new Date().toISOString()
      };

      userDb[cleanId] = newCustomer;
      localStorage.setItem('cravebite_user_db', JSON.stringify(userDb));
      setCurrentUser(newCustomer);
      setLoading(false);
      return { success: true, user: newCustomer };

    } catch (error) {
      setLoading(false);
      return { success: false, error: error.message || 'Login failed. Please try again.' };
    }
  };

  // Manager Login helper
  const loginManager = async (username, password) => {
    return login(username, password, 'manager');
  };

  // Logout
  const logout = async () => {
    try {
      if (auth) await signOut(auth);
    } catch (e) {}
    setCurrentUser(null);
    localStorage.removeItem('cravebite_user');
  };

  // Reset password
  const resetPassword = async (email) => {
    try {
      if (auth) await sendPasswordResetEmail(auth, email);
      return { success: true, message: `Password reset link sent to ${email}` };
    } catch (e) {
      return { success: true, message: `Password reset instructions sent to ${email}` };
    }
  };

  // Update profile & persist to user database
  const updateUserProfile = async (updates) => {
    if (!currentUser) return;
    const updated = { ...currentUser, ...updates, updatedAt: new Date().toISOString() };
    setCurrentUser(updated);

    try {
      const userDb = JSON.parse(localStorage.getItem('cravebite_user_db') || '{}');
      if (currentUser.email) {
        userDb[currentUser.email.toLowerCase()] = updated;
        localStorage.setItem('cravebite_user_db', JSON.stringify(userDb));
      }
      if (db && currentUser.uid) {
        await updateDoc(doc(db, 'users', currentUser.uid), updates);
      }
    } catch (e) {
      console.warn("User update notice:", e.message);
    }
  };

  // Favorites management
  const toggleFavouriteRestaurant = (restaurantId) => {
    if (!currentUser) return;
    const currentFavs = currentUser.favouriteRestaurants || [];
    const exists = currentFavs.includes(restaurantId);
    const newFavs = exists 
      ? currentFavs.filter(id => id !== restaurantId) 
      : [...currentFavs, restaurantId];
    
    updateUserProfile({ favouriteRestaurants: newFavs });
  };

  const toggleFavouriteFood = (foodId) => {
    if (!currentUser) return;
    const currentFavs = currentUser.favouriteFoods || [];
    const exists = currentFavs.includes(foodId);
    const newFavs = exists 
      ? currentFavs.filter(id => id !== foodId) 
      : [...currentFavs, foodId];
    
    updateUserProfile({ favouriteFoods: newFavs });
  };

  // Saved Addresses management
  const addAddress = (address) => {
    if (!currentUser) return;
    const newAddr = { id: 'addr-' + Date.now(), ...address, isDefault: (currentUser.savedAddresses || []).length === 0 };
    const list = [...(currentUser.savedAddresses || []), newAddr];
    updateUserProfile({ savedAddresses: list });
  };

  const deleteAddress = (addressId) => {
    if (!currentUser) return;
    const list = (currentUser.savedAddresses || []).filter(a => a.id !== addressId);
    updateUserProfile({ savedAddresses: list });
  };

  const setDefaultAddress = (addressId) => {
    if (!currentUser) return;
    const list = (currentUser.savedAddresses || []).map(a => ({
      ...a,
      isDefault: a.id === addressId
    }));
    updateUserProfile({ savedAddresses: list });
  };

  return (
    <AuthContext.Provider value={{
      currentUser,
      loading,
      login,
      loginManager,
      register,
      logout,
      resetPassword,
      updateUserProfile,
      toggleFavouriteRestaurant,
      toggleFavouriteFood,
      addAddress,
      deleteAddress,
      setDefaultAddress
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
