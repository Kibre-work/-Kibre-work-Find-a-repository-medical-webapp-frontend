import React, { useState, useEffect } from 'react';
import { Form, Button, Card, Row, Col, Table } from 'react-bootstrap';
import { FaCalendarPlus, FaTrash } from 'react-icons/fa';

const BookPatient = () => {
  // Simulate getting the logged-in patient's name (replace with real user context if available)
  const patientName = window.patientName || 'Your Name';
  const [form, setForm] = useState({ date: '', time: '', reason: '' });
  const [appointments, setAppointments] = useState([]);
  const [showNotif, setShowNotif] = useState(false);
  const [notifMsg, setNotifMsg] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch appointments for the logged-in patient
  useEffect(() => {
    const fetchAppointments = async () => {
      setError(null);
      try {
        const res = await fetch('http://localhost:8000/api/appointments/', {
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': window.getCSRFToken ? window.getCSRFToken() : '',
          },
        });
        if (!res.ok) throw new Error('Failed to fetch appointments');
        const data = await res.json();
        setAppointments(data);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchAppointments();
  }, []);

  // Helper to refresh appointments after booking or deleting
  const refreshAppointments = async () => {
    try {
      const res = await fetch('http://localhost:8000/api/appointments/', {
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': window.getCSRFToken ? window.getCSRFToken() : '',
        },
      });
      if (!res.ok) throw new Error('Failed to fetch appointments');
      const data = await res.json();
      setAppointments(data);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('http://localhost:8000/api/appointments/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': window.getCSRFToken ? window.getCSRFToken() : '',
        },
        credentials: 'include',
        body: JSON.stringify({
          date: form.date,
          time: form.time,
          reason: form.reason,
          doctor: 1 // Replace 1 with your actual doctor user ID
        }),
      });
      if (!res.ok) throw new Error('Failed to send appointment request');
      setNotifMsg('Appointment request sent to your doctor. You will be notified of any updates.');
      setShowNotif(true);
      setForm({ date: '', time: '', reason: '' });
      await refreshAppointments();
    } catch (err) {
      setError(err.message);
      setNotifMsg('Failed to send appointment request. Please try again.');
      setShowNotif(true);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`http://localhost:8000/api/appointments/${id}/delete/`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': window.getCSRFToken ? window.getCSRFToken() : '',
        },
        credentials: 'include',
      });
      if (!res.ok) throw new Error('Failed to delete appointment');
      await refreshAppointments();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: '2rem auto' }}>
      <Card className="mb-4 shadow-sm" style={{ borderRadius: 16 }}>
        <Card.Body>
          <div className="d-flex align-items-center mb-3">
            <FaCalendarPlus size={28} style={{ color: '#0d6efd', marginRight: 10 }} />
            <Card.Title className="mb-0" style={{ fontSize: 22, fontWeight: 600 }}>Book Appointment</Card.Title>
          </div>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6} className="mb-3">
                <Form.Label>Date</Form.Label>
                <Form.Control
                  type="date"
                  name="date"
                  value={form.date}
                  onChange={handleChange}
                  required
                />
              </Col>
              <Col md={6} className="mb-3">
                <Form.Label>Time</Form.Label>
                <Form.Control
                  type="time"
                  name="time"
                  value={form.time}
                  onChange={handleChange}
                  required
                />
              </Col>
            </Row>
            <Form.Group className="mb-4">
              <Form.Label>Reason for Appointment</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                name="reason"
                value={form.reason}
                onChange={handleChange}
                placeholder="Describe your reason for booking"
                required
              />
            </Form.Group>
            <Button type="submit" variant="primary" className="w-100" style={{ fontSize: '1.1rem', fontWeight: 500 }} disabled={loading}>
              {loading ? 'Sending...' : <><FaCalendarPlus className="me-2" />Book Appointment</>}
            </Button>
            {showNotif && <div className="mt-3 alert alert-success">{notifMsg}</div>}
            {error && <div className="mt-3 alert alert-danger">{error}</div>}
          </Form>
        </Card.Body>
      </Card>
      <h5>Your Appointments</h5>
      {loading && <div>Loading...</div>}
      {/* Render appointments table only when not loading */}
      {!loading && (
        <Table bordered hover>
          <thead>
            <tr>
              <th>Patient Name</th>
              <th>Date</th>
              <th>Time</th>
              <th>Reason</th>
              <th>Status</th>
              <th>Action</th>
              <th>Video Call</th>
            </tr>
          </thead>
          <tbody>
            {appointments.length === 0 ? (
              <tr><td colSpan={7} className="text-center">No appointments yet.</td></tr>
            ) : (
              appointments.map(appt => (
                <tr key={appt.id}>
                  <td>{appt.patient_name || '-'}</td>
                  <td>{appt.date}</td>
                  <td>{appt.time}</td>
                  <td>{appt.reason}</td>
                  <td><span className={`badge bg-${appt.status === 'Pending' ? 'warning' : 'success'}`}>{appt.status}</span></td>
                  <td>
                    <Button variant="outline-danger" size="sm" onClick={() => handleDelete(appt.id)} title="Delete Appointment">
                      <FaTrash />
                    </Button>
                  </td>
                  <td>
                    {appt.status === 'Confirmed' && appt.video_call_link ? (
                      <a
                        href={`/vediocall?room=${encodeURIComponent(appt.video_call_link.split('/').pop())}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: "#0d6efd", fontWeight: 600 }}
                      >
                        Join
                      </a>
                    ) : (
                      <span style={{ color: '#888' }}>N/A</span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default BookPatient;
