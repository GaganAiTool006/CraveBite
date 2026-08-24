import React from 'react';
import { Outlet } from 'react-router-dom';
import RoleSwitcherBar from '../components/common/RoleSwitcherBar';
import Navbar from '../components/common/Navbar';
import MobileNav from '../components/common/MobileNav';
import Footer from '../components/common/Footer';

export default function CustomerLayout() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: 'var(--bg-page)' }}>
      <RoleSwitcherBar />
      <Navbar />
      <main style={{ flex: 1 }}>
        <Outlet />
      </main>
      <Footer />
      <MobileNav />
    </div>
  );
}
