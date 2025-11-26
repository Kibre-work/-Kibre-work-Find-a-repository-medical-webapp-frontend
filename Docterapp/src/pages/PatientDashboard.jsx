import React, { useEffect, useState, useContext } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import PatientSidebar from '../components/PatientSidebar';
import HealthStatusForm from './HealthStatusForm';
import BookPatient from './BookPatient';
import NotificationBell from '../components/NotificationBell';
import PrescriptionNotification from '../components/PrescriptionNotification';
 
import DownloadPrescriptions from './DownloadPrescriptions';
import { FaCalendarCheck, FaDownload, FaHeartbeat } from 'react-icons/fa';
import { UserContext } from '../contexts/UserContext';

function PatientDashboard() {
  // Toasts removed per request; bell and dropdown remain active
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useContext(UserContext);

  const handleLogout = () => {
    navigate('/login');
  };

  const showOverview = location.pathname === '/patient-dashboard';

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
    case '/prescriptions':
      mainContent = (
        <div style={{ padding: 32, minHeight: 400 }}>
          <DownloadPrescriptions />
        </div>
      );
      break;
    
    default:
      // On the main patient dashboard route, we already show the overview (banner, stats, quick actions),
      // so avoid rendering the extra welcome card again. For other unexpected routes, keep the card.
      mainContent = showOverview ? null : (
        <div style={{ padding: 32 }}>
          <div style={{
            background: '#fff',
            border: '1px solid #e9ecef',
            borderRadius: 12,
            padding: 24,
            maxWidth: 820
          }}>
            <h4 style={{ fontWeight: 600, color: '#0d6efd', marginBottom: 8 }}>Welcome</h4>
            <p style={{ fontSize: 16, color: '#6c757d', marginBottom: 0 }}>
              Your health information, appointments, and prescriptions are organized here. Select an option
              from the left to continue.
            </p>
          </div>
        </div>
      );
  }

  return (
    <Container fluid style={{ minHeight: '100vh', background: '#e7f1ff', padding: 0 }}>
      <Row style={{ minHeight: '100vh' }}>
        <Col xs={12} md={3} lg={2} style={{ padding: 0 }}>
          <PatientSidebar onLogout={handleLogout} activePath={location.pathname} />
        </Col>
        <Col xs={12} md={9} lg={10} style={{ padding: 0, minHeight: '100vh' }}>
          <div className="d-flex justify-content-start align-items-center" style={{ padding: '0 16px', overflow: 'visible', position: 'relative', zIndex: 2 }}>
            <NotificationBell />
          </div>
          <div style={{ padding: '0 24px 16px 24px' }}>
            <PrescriptionNotification />
            <div style={{ maxWidth: 1100, margin: '0 auto' }}>
              {showOverview && (
                <>
                  {/* Greeting / Quick buttons */}
                  <div style={{
                    background: 'linear-gradient(135deg, #e7f1ff 0%, #ffffff 100%)',
                    border: '1px solid #e5edf9',
                    borderRadius: 16,
                    padding: 20,
                    marginBottom: 18,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 12
                  }}>
                    <div>
                      <h4 style={{ margin: 0, color: '#0d6efd', fontWeight: 700 }}>
                        {`Welcome ${(() => {
                          if (!user) return '';
                          const name =
                            user.name ||
                            [user.first_name, user.last_name].filter(Boolean).join(' ') ||
                            user.full_name ||
                            user.username ||
                            user.user_name ||
                            user.email ||
                            '';
                          return name ? name : '';
                        })()}`}
                      </h4>
                  <div style={{ color: '#5b6b7b' }}>Here’s your health hub with quick shortcuts.</div>
                    </div>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <button
                        onClick={() => navigate('/appointments')}
                        className="btn btn-primary"
                        style={{ fontWeight: 600 }}
                      >
                        <FaCalendarCheck style={{ marginRight: 8 }} />
                        Book Appointment
                      </button>
                      <button
                        onClick={() => navigate('/download-prescriptions')}
                        className="btn btn-outline-primary"
                        style={{ fontWeight: 600 }}
                      >
                        <FaDownload style={{ marginRight: 8 }} />
                        View Prescriptions
                      </button>
                    </div>
                  </div>

                  {/* Your Stats */}
                  <div style={{ marginTop: 8, marginBottom: 8 }}>
                    <div style={{ fontWeight: 700, color: '#0d6efd', marginBottom: 10 }}>Your Stats</div>
                    <PatientDashboardStats />
                  </div>

                  {/* Quick Actions */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16, marginTop: 18 }}>
                    <PatientActionCard
                      title="Book / Manage Appointments"
                      description="Create new requests and track statuses."
                      cta="Open Appointments"
                      onClick={() => navigate('/appointments')}
                      icon={<FaCalendarCheck color="#0d6efd" />}
                    />
                    <PatientActionCard
                      title="Update Health Status"
                      description="Keep your medical info up-to-date."
                      cta="Open Health Status"
                      onClick={() => navigate('/health-status')}
                      icon={<FaHeartbeat color="#0d6efd" />}
                    />
                    <PatientActionCard
                      title="Your Prescriptions"
                      description="View and print your prescriptions."
                      cta="Open Prescriptions"
                      onClick={() => navigate('/download-prescriptions')}
                      icon={<FaDownload color="#0d6efd" />}
                    />
                  </div>
                </>
              )}

              {mainContent}
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default PatientDashboard;

// Inline components to mirror doctor's dashboard style
function PatientActionCard({ title, description, cta, onClick, icon }) {
  return (
    <div style={{
      background: '#fff',
      border: '1px solid #e9ecef',
      borderRadius: 12,
      padding: 16,
      boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
      display: 'flex',
      flexDirection: 'column',
      gap: 8
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{
          width: 36, height: 36, borderRadius: 8, background: '#e7f1ff',
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          {icon}
        </div>
        <div style={{ fontWeight: 700, color: '#0d6efd' }}>{title}</div>
      </div>
      <div style={{ color: '#6c757d', flex: 1 }}>{description}</div>
      <button onClick={onClick} className="btn btn-sm btn-primary" style={{ alignSelf: 'flex-start', fontWeight: 600 }}>
        {cta}
      </button>
    </div>
  );
}

function PatientDashboardStats() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({ appointments: 0, prescriptions: 0, unread: 0 });

  useEffect(() => {
    let isMounted = true;
    async function load() {
      try {
        setLoading(true);
        setError(null);
        const userEmail = sessionStorage.getItem('email') || '';
        const [apptsRes, prescRes, notifRes] = await Promise.all([
          fetch('http://localhost:8000/api/appointments/', { credentials: 'include' }),
          fetch(`http://localhost:8000/api/prescriptions?patient_email=${encodeURIComponent(userEmail)}`, { credentials: 'include' }),
          fetch('http://localhost:8000/api/notification/', { credentials: 'include' }),
        ]);
        if (!apptsRes.ok || !prescRes.ok || !notifRes.ok) {
          throw new Error('Failed to load dashboard data');
        }
        const [apptsJson, prescJson, notifJson] = await Promise.all([
          apptsRes.json(),
          prescRes.json(),
          notifRes.json(),
        ]);
        if (!isMounted) return;
        setStats({
          appointments: Array.isArray(apptsJson) ? apptsJson.length : 0,
          prescriptions: Array.isArray(prescJson) ? prescJson.length : 0,
          unread: Array.isArray(notifJson) ? notifJson.filter(n => !n.is_read).length : 0,
        });
      } catch (e) {
        if (!isMounted) return;
        setError(e.message || 'Failed to load');
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    load();
    return () => { isMounted = false; };
  }, []);

  const cards = [
    { label: 'Appointments', value: stats.appointments, color: '#0d6efd' },
    { label: 'Prescriptions', value: stats.prescriptions, color: '#198754' },
    { label: 'Unread Notifications', value: stats.unread, color: '#dc3545' },
  ];

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 14 }}>
      {cards.map(card => (
        <div key={card.label} style={{
          background: '#fff',
          border: '1px solid #e9ecef',
          borderRadius: 12,
          padding: 16,
          boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
          display: 'flex',
          flexDirection: 'column',
          gap: 6
        }}>
          <div style={{ color: '#6c757d', fontSize: 13 }}>{card.label}</div>
          <div style={{ fontWeight: 800, fontSize: 28, color: card.color }}>
            {loading ? '—' : error ? '!' : card.value}
          </div>
          {error && (
            <div style={{ color: '#dc3545', fontSize: 12 }}>Unable to load</div>
          )}
        </div>
      ))}
    </div>
  );
}