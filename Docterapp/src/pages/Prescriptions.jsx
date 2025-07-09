import React, { useState, useEffect } from "react";
import { Button, Form, Card } from "react-bootstrap";
import { fetchWithAuth } from '../utils/auth';

const Prescriptions = () => {
  const [form, setForm] = useState({
    patient: "",
    medication: "",
    dosage: "",
    instructions: "",
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const [patients, setPatients] = useState([]);

  const role = "doctor"; // Replace with real user role logic

  useEffect(() => {
    // Fetch registered patients from backend
    fetchWithAuth('http://localhost:8000/api/patient-info/', { credentials: 'include' })
      .then(res => res.json())
      .then(data => {
        // Ensure each patient has an id, name, and email
        const mapped = data.map((p, idx) => ({
          id: p.id || p.pk || p._id || idx + 1,
          name: p.name || [p.first_name, p.last_name].filter(Boolean).join(' ').trim() || `Patient ${idx + 1}`,
          email: p.user_name
        }));
        setPatients(mapped);
      });
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const selectedPatient = patients.find(p => p.id === parseInt(form.patient, 10));
      // Ensure patient is sent as an integer and include id
      const payload = {
        ...form,
        patient: form.patient ? parseInt(form.patient, 10) : null,
        patient_id: selectedPatient ? selectedPatient.id : undefined,
        patient_email: selectedPatient ? selectedPatient.email : undefined,
      };
      const response = await fetchWithAuth('http://localhost:8000/api/prescriptions/create/', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error('Failed to send prescription');
      setShowSuccess(true);
      setForm({ patient: "", medication: "", dosage: "", instructions: "" });
      setTimeout(() => setShowSuccess(false), 2500);
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="container" style={{ maxWidth: 600, margin: "2rem auto" }}>
      {role === "doctor" && (
        <>
          <h3 className="mb-4">Write Prescription</h3>
          <Card className="mb-4 shadow-sm" style={{ borderRadius: 16 }}>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Patient</Form.Label>
                  <Form.Select
                    name="patient"
                    value={form.patient}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select patient</option>
                    {patients.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Medication</Form.Label>
                  <Form.Control
                    type="text"
                    name="medication"
                    value={form.medication}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Dosage</Form.Label>
                  <Form.Control
                    type="text"
                    name="dosage"
                    value={form.dosage}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Instructions</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={2}
                    name="instructions"
                    value={form.instructions}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Button type="submit" variant="primary">
                  Send Prescription
                </Button>
                {showSuccess && (
                  <div className="mt-3 alert alert-success">
                    Prescription sent successfully!
                  </div>
                )}
              </Form>
            </Card.Body>
          </Card>
        </>
      )}
    </div>
  );
};

export default Prescriptions;
