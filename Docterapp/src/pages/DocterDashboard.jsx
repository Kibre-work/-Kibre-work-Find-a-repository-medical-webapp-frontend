import React, { useEffect, useState } from "react";
import { FaBell, FaUserInjured, FaFilePrescription, FaCalendarCheck, FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { logout } from "../utils/auth";
import Prescriptions from "./Prescriptions";
import ViewFeedback from "./ViewFeedback";
import { Modal, Button } from "react-bootstrap";
import NotificationBell from '../components/NotificationBell';

const sidebarLinks = [
  { label: "Appointments", icon: <FaCalendarCheck />, href: "/doctor-appointments" },
  { label: "Patients", icon: <FaUserInjured />, href: "/signs-symptoms" },
  { label: "Prescriptions", icon: <FaFilePrescription />, href: "/doctor-prescriptions" },
  { label: "Feedback", icon: <FaBell />, href: "/viewfeedback" },
];

const DoctorDashboard = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(0);
  const [modal, setModal] = useState({ show: false, action: '', apptId: null });

  const handleLogout = async () => {
    await logout(navigate);
  };

  const handleActionClick = (action, apptId) => {
    setModal({ show: true, action, apptId });
  };

  const handleModalClose = () => setModal({ show: false, action: '', apptId: null });

  const handleModalConfirm = () => {
    // TODO: Implement backend call or state update for action
    // For now, just close modal
    handleModalClose();
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#e7f1ff" }}>
      {/* Sidebar */}
      <aside style={{
        width: 240,
        background: "#fff",
        borderRight: "1px solid #e5e7eb",
        padding: "2rem 1rem 1rem 1rem",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        minHeight: '100vh'
      }}>
        <div>
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 24 }}>
              <img
                src="/log4.png"
                alt="Clinic Logo"
                style={{
                  width: 96,
                  height: 96,
                  objectFit: 'contain',
                  borderRadius: 12,
                  boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                  marginBottom: 12,
                  background: '#fff'
                }}
              />
              <h3 style={{ textAlign: "center", margin: 0, color: "#0d6efd", fontSize: 18 }}>Doctor Panel</h3>
            </div>
            {/* Push navigation a little further down */}
            <div style={{ height: 24 }} />
            {sidebarLinks.map((link, idx) => (
              <div
                key={link.label}
                onClick={() => { setSelected(idx); navigate(link.href); }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: "12px 16px",
                  marginBottom: 16,
                  borderRadius: 8,
                  background: selected === idx ? "#e7f1ff" : "transparent",
                  color: selected === idx ? "#0d6efd" : "#333",
                  cursor: "pointer",
                  fontWeight: selected === idx ? 600 : 400,
                  transition: "background 0.2s"
                }}
              >
                {link.icon}
                {link.label}
              </div>
            ))}
          </div>
        </div>
        <button
          className="btn btn-outline-danger"
          style={{ marginTop: 32, width: "100%" }}
          onClick={handleLogout}
        >
          <FaSignOutAlt style={{ marginRight: 8 }} /> Log Out
        </button>
      </aside>
      {/* Main Content */}
      <main style={{ flex: 1, minHeight: '100vh' }}>
        <div className="d-flex justify-content-start align-items-center" style={{ padding: '0 16px', overflow: 'visible', position: 'relative', zIndex: 2 }}>
          <NotificationBell />
        </div>
        <div style={{ padding: '0 24px 16px 24px' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            {/* Hero / Greeting */}
            <div style={{
              background: 'linear-gradient(135deg, #e7f1ff 0%, #f9fbff 100%)',
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
                <h4 style={{ margin: 0, color: '#0d6efd', fontWeight: 700 }}>Welcome Back, Doctor</h4>
                <div style={{ color: '#5b6b7b' }}>Here’s a quick overview and shortcuts to get things done.</div>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <button
                  onClick={() => navigate('/doctor-appointments')}
                  className="btn btn-primary"
                  style={{ fontWeight: 600 }}
                >
                  <FaCalendarCheck style={{ marginRight: 8 }} />
                  View Appointments
                </button>
                <button
                  onClick={() => navigate('/doctor-prescriptions')}
                  className="btn btn-outline-primary"
                  style={{ fontWeight: 600 }}
                >
                  <FaFilePrescription style={{ marginRight: 8 }} />
                  Write Prescription
                </button>
              </div>
            </div>

            {/* Stats Cards */}
            <DashboardStats />

            {/* Quick Actions */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16, marginTop: 18 }}>
              <ActionCard
                title="Manage Patients"
                description="View patient profiles and update records."
                cta="Open Patients"
                onClick={() => navigate('/signs-symptoms')}
                icon={<FaUserInjured color="#0d6efd" />}
              />
              <ActionCard
                title="Schedule / Review"
                description="Confirm, reject, or review appointment details."
                cta="Appointments"
                onClick={() => navigate('/doctor-appointments')}
                icon={<FaCalendarCheck color="#0d6efd" />}
              />
              <ActionCard
                title="Write Prescriptions"
                description="Create and send prescriptions to patients."
                cta="Create"
                onClick={() => navigate('/doctor-prescriptions')}
                icon={<FaFilePrescription color="#0d6efd" />}
              />
            </div>
          </div>
        </div>
      </main>
      {/* Modal Confirmation */}
      <Modal show={modal.show} onHide={handleModalClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Action</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {modal.action === 'approve' && 'Are you sure you want to approve this appointment?'}
          {modal.action === 'reject' && 'Are you sure you want to reject this appointment?'}
          {modal.action === 'complete' && 'Mark this appointment as completed?'}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>Cancel</Button>
          <Button variant="primary" onClick={handleModalConfirm}>Yes, Confirm</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default DoctorDashboard;

// Lightweight cards and stats inside the same file to avoid extra imports
function ActionCard({ title, description, cta, onClick, icon }) {
  return (
    <div style={{
      background: '#f9fbff',
      border: '1px solid #e5edf9',
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

function DashboardStats() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({ patients: 0, appointments: 0, unread: 0 });

  useEffect(() => {
    let isMounted = true;
    async function load() {
      try {
        setLoading(true);
        setError(null);
        const [patientsRes, apptsRes, notifRes] = await Promise.all([
          fetch('http://localhost:8000/api/patient-info/', { credentials: 'include' }),
          fetch('http://localhost:8000/api/appointments/doctor/', { credentials: 'include' }),
          fetch('http://localhost:8000/api/notification/', { credentials: 'include' }),
        ]);
        if (!patientsRes.ok || !apptsRes.ok || !notifRes.ok) {
          throw new Error('Failed to load dashboard data');
        }
        const [patientsJson, apptsJson, notifJson] = await Promise.all([
          patientsRes.json(),
          apptsRes.json(),
          notifRes.json(),
        ]);
        if (!isMounted) return;
        setStats({
          patients: Array.isArray(patientsJson) ? patientsJson.length : 0,
          appointments: Array.isArray(apptsJson) ? apptsJson.length : 0,
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
    { label: 'Patients', value: stats.patients, color: '#0d6efd' },
    { label: 'Appointments', value: stats.appointments, color: '#198754' },
    { label: 'Unread Notifications', value: stats.unread, color: '#dc3545' },
  ];

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 14 }}>
      {cards.map(card => (
        <div key={card.label} style={{
          background: '#f9fbff',
          border: '1px solid #e5edf9',
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