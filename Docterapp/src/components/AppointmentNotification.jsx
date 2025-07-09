import React from 'react';
import { Alert } from 'react-bootstrap';
import { FaBell } from 'react-icons/fa';

const AppointmentNotification = ({ show, message, onClose }) => {
  if (!show) return null;
  return (
    <Alert variant="info" onClose={onClose} dismissible className="d-flex align-items-center" style={{ position: 'fixed', top: 20, right: 20, zIndex: 2000, minWidth: 320, boxShadow: '0 2px 12px rgba(0,0,0,0.10)' }}>
      <FaBell style={{ marginRight: 12, color: '#0d6efd', fontSize: 22 }} />
      <div style={{ flex: 1 }}>{message}</div>
    </Alert>
  );
};

export default AppointmentNotification;
