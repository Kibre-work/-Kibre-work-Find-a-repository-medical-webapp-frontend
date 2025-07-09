import React, { useState, useEffect, useRef, useCallback, useContext } from "react";
import { Modal, Button } from "react-bootstrap";
import { UserContext } from "../contexts/UserContext";

const DoctorAppointments = () => {
    const { user, loading: userLoading } = useContext(UserContext);
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [modal, setModal] = useState({ show: false, action: '', apptId: null });
    const [selected, setSelected] = useState(null);
    const pollingRef = useRef();

    // Debug logs
    console.log('user:', user, 'userLoading:', userLoading);
    console.log('appointments:', appointments, 'error:', error);

    // Helper to get CSRF token from cookies
    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }

    // Fetch appointments
    const fetchAppointments = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch("http://localhost:8000/api/appointments/doctor/", {
                method: "GET",
                credentials: "include",
                headers: { "X-CSRFToken": getCookie('csrftoken') },
            });
            if (!response.ok) throw new Error('Failed to fetch appointments');
            const data = await response.json();
            setAppointments(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (user && user.role === "doctor") {
            fetchAppointments();
            pollingRef.current = setInterval(() => {
                fetchAppointments();
            }, 5000); // Poll every 5 seconds
            return () => clearInterval(pollingRef.current);
        }
    }, [fetchAppointments, user]);

    // PATCH action
    const handleAction = async (action, apptId) => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch(`http://localhost:8000/api/appointments/${apptId}/`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': getCookie('csrftoken'),
                },
                credentials: 'include',
                body: JSON.stringify({ status: action === 'confirm' ? 'Confirmed' : 'Rejected' })
            });
            if (!res.ok) throw new Error('Failed to update appointment');
            await fetchAppointments(); // Refresh the list after update
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
            setModal({ show: false, action: '', apptId: null });
        }
    };

    if (userLoading) return <div>Loading user info...</div>;
    if (!user) return <div>Please log in to view appointments.</div>;
    if (user.role !== "doctor") return <div>Access denied. Doctors only.</div>;

    return (
        <div className="container" style={{ maxWidth: 900, margin: "2rem auto", minHeight: 600 }}>
            <h2 className="mb-4">Doctor Appointment Requests</h2>
            {loading && <div>Loading appointments...</div>}
            <div style={{ background: "#fff", borderRadius: 12, boxShadow: "0 2px 8px rgba(0,0,0,0.04)", padding: 24, marginTop: 24 }}>
                {!loading && error && (
                    <div className="text-danger">{error}</div>
                )}
                {!loading && !error && appointments.length === 0 && (
                    <div>No appointments found.</div>
                )}
                {!loading && !error && appointments.length > 0 && (
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th>Patient</th>
                                <th>Date</th>
                                <th>Time</th>
                                <th>Reason</th>
                                <th>Status</th>
                                <th>Video Call</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {appointments.map((appt) => (
                                <tr key={appt.id} style={{ cursor: 'pointer' }} onClick={() => setSelected(appt)}>
                                    <td>{appt.patient_name || appt.patient || '-'}</td>
                                    <td>{appt.date || '-'}</td>
                                    <td>{appt.time || '-'}</td>
                                    <td>{appt.reason || '-'}</td>
                                    <td>
                                        <span className={`badge bg-${appt.status === "Confirmed" ? "success" : appt.status === "Rejected" ? "danger" : "warning"}`}>{appt.status}</span>
                                    </td>
                                    <td>
                                        {appt.status === 'Confirmed' && appt.video_call_link ? (
                                            <a
                                                href={`/vediocall?room=${encodeURIComponent(appt.video_call_link.split('/').pop())}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                style={{ color: '#0d6efd', fontWeight: 600 }}
                                                onClick={e => e.stopPropagation()}
                                            >
                                                Join Video Call
                                            </a>
                                        ) : (
                                            <span className="text-muted" style={{ fontSize: 13 }}>
                                                No Link
                                            </span>
                                        )}
                                    </td>
                                    <td>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                                            {appt.status === 'Pending' && (
                                                <>
                                                    <Button size="sm" variant="success" onClick={e => { e.stopPropagation(); setModal({ show: true, action: 'confirm', apptId: appt.id }); }}>Confirm</Button>
                                                    <Button size="sm" variant="danger" onClick={e => { e.stopPropagation(); setModal({ show: true, action: 'reject', apptId: appt.id }); }}>Reject</Button>
                                                </>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
            {/* Detail Modal */}
            <Modal show={!!selected} onHide={() => setSelected(null)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Appointment Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selected && (
                        <>
                            <p><strong>Patient Name:</strong> {selected.patient_name || selected.patient || '-'}</p>
                            <p><strong>Date:</strong> {selected.date || '-'}</p>
                            <p><strong>Time:</strong> {selected.time || '-'}</p>
                            <p><strong>Status:</strong> <span className={`badge bg-${selected.status === "Confirmed" ? "success" : selected.status === "Rejected" ? "danger" : "warning"}`}>{selected.status}</span></p>
                        </>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setSelected(null)}>Close</Button>
                </Modal.Footer>
            </Modal>
            {/* Action Modal */}
            <Modal show={modal.show} onHide={() => setModal({ show: false, action: '', apptId: null })} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Action</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {modal.action === 'confirm' && 'Are you sure you want to confirm this appointment?'}
                    {modal.action === 'reject' && 'Are you sure you want to reject this appointment?'}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setModal({ show: false, action: '', apptId: null })}>Cancel</Button>
                    <Button variant="primary" onClick={() => handleAction(modal.action, modal.apptId)}>Yes, Confirm</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default DoctorAppointments;
