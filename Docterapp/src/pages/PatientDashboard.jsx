import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import PatientSidebar from '../components/PatientSidebar';
import HealthStatusForm from './HealthStatusForm';
import BookPatient from './BookPatient';
import NotificationBell from '../components/NotificationBell';
import Payment from './Payment';
import PatientVideoInvites from '../components/PatientVideoInvites';
import DownloadPrescriptions from './DownloadPrescriptions';

function PatientDashboard() {
  // Toasts removed per request; bell and dropdown remain active
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    navigate('/login');
  };

  // Main content for each section
  let mainContent = null;
  switch (location.pathname) {
    case '/appointments':
      mainContent = (
        <div style={{ padding: 32 }}>
          <h3>Book an Appointment</h3>
          <BookPatient />
        </div>
      );
      break;
    case '/health-status':
      mainContent = (
        <div style={{ padding: 32 }}>
          <h3>Patient Info</h3>
          <HealthStatusForm />
        </div>
      );
      break;
    case '/videocall':
      mainContent = (
        <div style={{ padding: 32 }}>
          <h3>Video Call</h3>
          <p>Start a video consultation with your doctor.</p>
        </div>
      );
      break;
    case '/prescriptions':
      mainContent = (
        <div style={{ padding: 32, minHeight: 400 }}>
          <DownloadPrescriptions />
        </div>
      );
      break;
    case '/payment':
      mainContent = (
        <div style={{ padding: 32 }}>
          <h3>Payment</h3>
          <Payment />
        </div>
      );
      break;
    default:
      mainContent = (
        <div style={{ padding: 32 }}>
          <h3>Welcome to your Patient Dashboard</h3>
          <PatientVideoInvites />
          <p>Select an option from the sidebar to get started.</p>
        </div>
      );
  }

  return (
    <Container fluid style={{ minHeight: '100vh', background: '#f8f9fa', padding: 0 }}>
      <Row style={{ minHeight: '100vh' }}>
        <Col xs={12} md={3} lg={2} style={{ padding: 0 }}>
          <PatientSidebar onLogout={handleLogout} activePath={location.pathname} />
        </Col>
        <Col xs={12} md={9} lg={10} style={{ padding: 0, minHeight: 600 }}>
          <div className="d-flex justify-content-end align-items-center" style={{ padding: '18px 32px 0 0', minHeight: 60 }}>
            <div style={{ position: 'relative', marginTop: 24 }}>
              <NotificationBell />
            </div>
          </div>
          {mainContent}
        </Col>
      </Row>
    </Container>
  );
}

export default PatientDashboard;