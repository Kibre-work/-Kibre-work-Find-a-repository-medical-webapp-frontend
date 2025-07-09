import React from 'react';
import Navbars from './components/Navbarr';
import Footer from './components/Footer';
import { Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbars />
      <div style={{ flex: 1 }}>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
} 