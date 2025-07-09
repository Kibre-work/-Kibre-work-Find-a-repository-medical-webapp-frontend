import React from 'react';
import { Nav } from 'react-bootstrap';
import { FaCalendarCheck, FaHeartbeat, FaVideo, FaDownload, FaMoneyCheckAlt, FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const sidebarLinks = [
  { label: 'Appointments', icon: <FaCalendarCheck />, path: '/appointments' },
  { label: 'Health Status', icon: <FaHeartbeat />, path: '/health-status' },
  { label: 'Prescriptions', icon: <FaDownload />, path: '/download-prescriptions' },
  { label: 'Payment', icon: <FaMoneyCheckAlt />, path: '/payment' },
];

const PatientSidebar = ({ onLogout, activePath }) => {
  const navigate = useNavigate();
  return (
    <div style={{ minHeight: '100vh', background: '#f4f6fa', borderRight: '1px solid #e0e0e0', padding: '32px 0', width: 230 }}>
      <div className="text-center mb-4">
        <div style={{ fontWeight: 700, fontSize: 22, color: '#0d6efd', letterSpacing: 1 }}>Patient Portal</div>
      </div>
      <Nav className="flex-column" variant="pills">
        {sidebarLinks.map(link => (
          <Nav.Link
            key={link.label}
            active={activePath === link.path}
            onClick={() => navigate(link.path)}
            style={{ display: 'flex', alignItems: 'center', fontSize: 17, marginBottom: 8 }}
          >
            <span style={{ marginRight: 12, fontSize: 20 }}>{link.icon}</span>
            {link.label}
          </Nav.Link>
        ))}
        <Nav.Link onClick={onLogout} style={{ display: 'flex', alignItems: 'center', color: '#dc3545', marginTop: 32, fontWeight: 500 }}>
          <FaSignOutAlt style={{ marginRight: 12, fontSize: 20 }} /> Log Out
        </Nav.Link>
      </Nav>
    </div>
  );
};

export default PatientSidebar;
