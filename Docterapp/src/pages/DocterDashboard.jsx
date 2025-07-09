import React, { useState } from "react";
import { FaBell, FaUserInjured, FaVideo, FaFilePrescription, FaCalendarCheck, FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { logout } from "../utils/auth";
import Prescriptions from "./Prescriptions";
import VideoCall from "./VideoCall";
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
    <div style={{ display: "flex", minHeight: "80vh", background: "#f7f9fa" }}>
      {/* Sidebar */}
      <aside style={{
        width: 240,
        background: "#fff",
        borderRight: "1px solid #e5e7eb",
        padding: "2rem 1rem 1rem 1rem",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between"
      }}>
        <div>
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <h3 style={{ textAlign: "center", marginBottom: 32, color: "#0d6efd" }}>Doctor Panel</h3>
            {sidebarLinks.map((link, idx) => (
              <div
                key={link.label}
                onClick={() => { setSelected(idx); navigate(link.href); }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: "12px 16px",
                  marginBottom: 8,
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
      <main style={{ flex: 1, padding: "2.5rem 2rem", minHeight: 600 }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 32 }}>
          <span style={{ fontWeight: 600, fontSize: 18, marginRight: 12 }}>Notifications</span>
          <NotificationBell />
        </div>
        {/* Quick Actions section removed */}
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