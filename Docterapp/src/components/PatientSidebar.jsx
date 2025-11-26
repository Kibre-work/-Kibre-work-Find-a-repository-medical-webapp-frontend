import React from 'react';
import { Nav } from 'react-bootstrap';
import { FaCalendarCheck, FaHeartbeat, FaVideo, FaDownload, FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const sidebarLinks = [
  { label: 'Appointments', icon: <FaCalendarCheck />, path: '/appointments' },
  { label: 'Health Status', icon: <FaHeartbeat />, path: '/health-status' },
  { label: 'Prescriptions', icon: <FaDownload />, path: '/download-prescriptions' },
];

const PatientSidebar = ({ onLogout, activePath }) => {
  const navigate = useNavigate();
  return (
    <div style={{ minHeight: '100vh', background: '#f4f6fa', borderRight: '1px solid #e0e0e0', padding: '32px 0', width: 230, display: 'flex', flexDirection: 'column' }}>
      <div className="text-center mb-4">
        <img
          src="/log4.png"
          alt="Logo"
          style={{ height: 72, width: 104, objectFit: 'contain' }}
        />
      </div>
      <Nav className="flex-column" variant="pills" style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
        <div style={{ height: 56 }} />
        {sidebarLinks.map(link => (
          <Nav.Link
            key={link.label}
            active={activePath === link.path}
            onClick={() => navigate(link.path)}
            style={{ display: 'flex', alignItems: 'center', fontSize: 17, marginBottom: 16 }}
          >
            <span style={{ marginRight: 12, fontSize: 20 }}>{link.icon}</span>
            {link.label}
          </Nav.Link>
        ))}
        <div style={{ marginTop: 'auto', padding: '0 12px' }}>
          <button
            className="btn btn-outline-danger"
            style={{ width: '100%' }}
            onClick={onLogout}
          >
            <FaSignOutAlt style={{ marginRight: 8 }} /> Log Out
          </button>
        </div>
      </Nav>
    </div>
  );
};

export default PatientSidebar;
