import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbars from './components/Navbarr';
import Footer from './components/Footer';
import { Outlet } from 'react-router-dom';

export default function Layout() {
  const location = useLocation();
  const dashboardPaths = [
    '/dashboard',
    '/doctor-appointments',
    '/doctor-prescriptions',
    '/patients',
    '/signs-symptoms',
    '/viewfeedback',
    '/patient-dashboard',
    '/appointments',
    '/health-status',
    '/prescriptions',
    '/download-prescriptions',
    '/videocall',
  ];
  const hidePublicChrome = dashboardPaths.includes(location.pathname);

  useEffect(() => {
    if (hidePublicChrome) {
      document.body.style.paddingTop = '0px';
      if (document && document.documentElement) {
        document.documentElement.style.paddingTop = '0px';
      }
    } else {
      document.body.style.paddingTop = '30px';
      if (document && document.documentElement) {
        document.documentElement.style.paddingTop = '30px';
      }
    }
    return () => {
      document.body.style.paddingTop = '30px';
      if (document && document.documentElement) {
        document.documentElement.style.paddingTop = '30px';
      }
    };
  }, [hidePublicChrome]);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {!hidePublicChrome && <Navbars />}
      <div style={{ flex: 1 }}>
        <Outlet />
      </div>
      {!hidePublicChrome && <Footer />}
    </div>
  );
} 