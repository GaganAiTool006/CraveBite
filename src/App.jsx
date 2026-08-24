import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

// Layouts
import CustomerLayout from './layouts/CustomerLayout';
import RestaurantLayout from './layouts/RestaurantLayout';
import DeliveryLayout from './layouts/DeliveryLayout';
import AdminLayout from './layouts/AdminLayout';
import ManagerLayout from './layouts/ManagerLayout';

// Common / Auth
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ForgotPassword from './pages/auth/ForgotPassword';
import ProtectedRoute from './components/common/ProtectedRoute';
import ManagerProtectedRoute from './components/common/ManagerProtectedRoute';
import DeliveryProtectedRoute from './components/common/DeliveryProtectedRoute';

// Customer Pages
import Home from './pages/customer/Home';
import RestaurantListing from './pages/customer/RestaurantListing';
import RestaurantDetails from './pages/customer/RestaurantDetails';
import Search from './pages/customer/Search';
import Cart from './pages/customer/Cart';
import Checkout from './pages/customer/Checkout';
import OrderSuccess from './pages/customer/OrderSuccess';
import Orders from './pages/customer/Orders';
import OrderDetails from './pages/customer/OrderDetails';
import LiveTracking from './pages/customer/LiveTracking';
import Favourites from './pages/customer/Favourites';
import Profile from './pages/customer/Profile';
import EditProfile from './pages/customer/EditProfile';
import Addresses from './pages/customer/Addresses';
import Offers from './pages/customer/Offers';
import Help from './pages/customer/Help';
import Settings from './pages/customer/Settings';

// Manager Portal Pages
import ManagerLogin from './pages/manager/ManagerLogin';
import ManagerDashboard from './pages/manager/ManagerDashboard';
import ManagerUsers from './pages/manager/ManagerUsers';
import ManagerRestaurants from './pages/manager/ManagerRestaurants';
import ManagerOrders from './pages/manager/ManagerOrders';
import ManagerDeliveryPartners from './pages/manager/ManagerDeliveryPartners';
import ManagerCoupons from './pages/manager/ManagerCoupons';
import ManagerReviews from './pages/manager/ManagerReviews';
import ManagerAnalytics from './pages/manager/ManagerAnalytics';
import ManagerReports from './pages/manager/ManagerReports';
import ManagerSettings from './pages/manager/ManagerSettings';

// Restaurant Partner Pages
import RestaurantLogin from './pages/restaurant/RestaurantLogin';
import RestaurantDashboard from './pages/restaurant/RestaurantDashboard';
import RestaurantOrders from './pages/restaurant/RestaurantOrders';
import RestaurantMenu from './pages/restaurant/RestaurantMenu';
import RestaurantMenuAdd from './pages/restaurant/RestaurantMenuAdd';
import RestaurantMenuEdit from './pages/restaurant/RestaurantMenuEdit';
import RestaurantProfile from './pages/restaurant/RestaurantProfile';
import RestaurantAnalytics from './pages/restaurant/RestaurantAnalytics';

// Delivery Partner Pages
import DeliveryLogin from './pages/delivery/DeliveryLogin';
import DeliveryDashboard from './pages/delivery/DeliveryDashboard';
import DeliveryOrders from './pages/delivery/DeliveryOrders';
import DeliveryEarnings from './pages/delivery/DeliveryEarnings';
import DeliveryProfile from './pages/delivery/DeliveryProfile';

// Admin Pages
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminUsers from './pages/admin/AdminUsers';
import AdminRestaurants from './pages/admin/AdminRestaurants';
import AdminDeliveryPartners from './pages/admin/AdminDeliveryPartners';
import AdminOrders from './pages/admin/AdminOrders';
import AdminCoupons from './pages/admin/AdminCoupons';
import AdminCategories from './pages/admin/AdminCategories';
import AdminBanners from './pages/admin/AdminBanners';
import AdminAnalytics from './pages/admin/AdminAnalytics';
import AdminSettings from './pages/admin/AdminSettings';

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Routes>
          {/* Public Customer Authentication */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          {/* Protected Customer Portal */}
          <Route 
            path="/" 
            element={
              <ProtectedRoute allowedRoles={['customer', 'restaurant', 'delivery', 'admin', 'manager']}>
                <CustomerLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Home />} />
            <Route path="home" element={<Home />} />
            <Route path="restaurants" element={<RestaurantListing />} />
            <Route path="restaurant/:restaurantId" element={<RestaurantDetails />} />
            <Route path="search" element={<Search />} />
            <Route path="cart" element={<Cart />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="order-success/:orderId" element={<OrderSuccess />} />
            <Route path="orders" element={<Orders />} />
            <Route path="order/:orderId" element={<OrderDetails />} />
            <Route path="track-order/:orderId" element={<LiveTracking />} />
            <Route path="favourites" element={<Favourites />} />
            <Route path="profile" element={<Profile />} />
            <Route path="profile/edit" element={<EditProfile />} />
            <Route path="addresses" element={<Addresses />} />
            <Route path="offers" element={<Offers />} />
            <Route path="help" element={<Help />} />
            <Route path="settings" element={<Settings />} />
          </Route>

          {/* Manager Operations Portal */}
          <Route path="/manager/login" element={<ManagerLogin />} />
          <Route 
            path="/manager" 
            element={
              <ManagerProtectedRoute>
                <ManagerLayout />
              </ManagerProtectedRoute>
            }
          >
            <Route index element={<Navigate to="/manager/dashboard" replace />} />
            <Route path="dashboard" element={<ManagerDashboard />} />
            <Route path="users" element={<ManagerUsers />} />
            <Route path="restaurants" element={<ManagerRestaurants />} />
            <Route path="orders" element={<ManagerOrders />} />
            <Route path="delivery-partners" element={<ManagerDeliveryPartners />} />
            <Route path="coupons" element={<ManagerCoupons />} />
            <Route path="reviews" element={<ManagerReviews />} />
            <Route path="analytics" element={<ManagerAnalytics />} />
            <Route path="reports" element={<ManagerReports />} />
            <Route path="settings" element={<ManagerSettings />} />
          </Route>

          {/* Restaurant Partner Portal */}
          <Route path="/restaurant/login" element={<RestaurantLogin />} />
          <Route 
            path="/restaurant" 
            element={
              <ProtectedRoute allowedRoles={['restaurant', 'admin', 'manager']}>
                <RestaurantLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="/restaurant/dashboard" replace />} />
            <Route path="dashboard" element={<RestaurantDashboard />} />
            <Route path="orders" element={<RestaurantOrders />} />
            <Route path="menu" element={<RestaurantMenu />} />
            <Route path="menu/add" element={<RestaurantMenuAdd />} />
            <Route path="menu/edit/:id" element={<RestaurantMenuEdit />} />
            <Route path="profile" element={<RestaurantProfile />} />
            <Route path="analytics" element={<RestaurantAnalytics />} />
          </Route>

          {/* Delivery Partner Portal */}
          <Route path="/delivery/login" element={<DeliveryLogin />} />
          <Route 
            path="/delivery" 
            element={
              <DeliveryProtectedRoute>
                <DeliveryLayout />
              </DeliveryProtectedRoute>
            }
          >
            <Route index element={<Navigate to="/delivery/dashboard" replace />} />
            <Route path="dashboard" element={<DeliveryDashboard />} />
            <Route path="orders" element={<DeliveryOrders />} />
            <Route path="earnings" element={<DeliveryEarnings />} />
            <Route path="profile" element={<DeliveryProfile />} />
          </Route>

          {/* Super Admin Console */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="restaurants" element={<AdminRestaurants />} />
            <Route path="delivery-partners" element={<AdminDeliveryPartners />} />
            <Route path="orders" element={<AdminOrders />} />
            <Route path="coupons" element={<AdminCoupons />} />
            <Route path="categories" element={<AdminCategories />} />
            <Route path="banners" element={<AdminBanners />} />
            <Route path="analytics" element={<AdminAnalytics />} />
            <Route path="settings" element={<AdminSettings />} />
          </Route>

          {/* Catch-all fallback */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </CartProvider>
    </AuthProvider>
  );
}
