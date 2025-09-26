import React, { useEffect, useState, useRef } from 'react';
import { Alert } from 'react-bootstrap';
import { FaBell } from 'react-icons/fa';

const AUTO_HIDE_MS = 6000;

const PrescriptionNotification = () => {
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState('');
  const timerRef = useRef();

  useEffect(() => {
    const handleNewPrescriptions = (e) => {
      const list = (e && e.detail && e.detail.notifications) || [];
      if (list.length > 0) {
        const msg = list[0].message || 'You have a new prescription from your doctor.';
        setMessage(msg);
        setShow(true);
        if (timerRef.current) clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => setShow(false), AUTO_HIDE_MS);
      }
    };
    window.addEventListener('prescriptions:new', handleNewPrescriptions);
    return () => {
      window.removeEventListener('prescriptions:new', handleNewPrescriptions);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  if (!show) return null;

  return (
    <Alert
      variant="info"
      onClose={() => setShow(false)}
      dismissible
      className="d-flex align-items-center"
      style={{ position: 'fixed', top: 20, right: 20, zIndex: 2000, minWidth: 320, boxShadow: '0 2px 12px rgba(0,0,0,0.10)' }}
    >
      <FaBell style={{ marginRight: 12, color: '#0d6efd', fontSize: 22 }} />
      <div style={{ flex: 1 }}>{message}</div>
    </Alert>
  );
};

export default PrescriptionNotification;


