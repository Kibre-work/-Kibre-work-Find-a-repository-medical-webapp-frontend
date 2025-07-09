import React, { useState } from 'react';
import { Form, Button, Card, Row, Col, Alert } from 'react-bootstrap';

const PatientInfoForm = () => {
  const [form, setForm] = useState({
    name: '',
    age: '',
    phone: '',
    country: '',
    allergies: '',
    injuries: '',
    chronicConditions: '',
    medications: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setFieldErrors({ ...fieldErrors, [e.target.name]: '' });
  };

  const validate = () => {
    const errors = {};
    if (!form.name.trim()) {
      errors.name = 'Name is required.';
    } else if (!/^[A-Za-z ]+$/.test(form.name.trim())) {
      errors.name = 'Name must contain only letters and spaces.';
    }
    if (!form.age || isNaN(form.age) || Number(form.age) <= 0) errors.age = 'Valid age is required.';
    if (!form.phone.trim()) errors.phone = 'Phone number is required.';
    if (!form.country.trim()) errors.country = 'Country is required.';
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(false);
    setError('');
    const errors = validate();
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) return;
    try {
      // Replace with your backend endpoint
      const response = await fetch('http://localhost:8000/api/patient-info/', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });
      console.log('Patient info API status:', response.status); // <-- Log status code
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.detail || 'Failed to send info');
      }
      setSubmitted(true);
      setForm({
        name: '', age: '', phone: '', country: '', allergies: '', injuries: '', chronicConditions: '', medications: ''
      });
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Card className="mb-4 shadow-sm" style={{ maxWidth: 600, margin: '0 auto', borderRadius: 16 }}>
      <Card.Body>
        <Card.Title className="mb-4" style={{ fontSize: 22, fontWeight: 600, color: '#0d6efd' }}>Patient Information</Card.Title>
        {submitted && <Alert variant="success">Your information has been sent to your doctor!</Alert>}
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={6} className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Full Name"
                required
                isInvalid={!!fieldErrors.name}
              />
              <Form.Control.Feedback type="invalid">{fieldErrors.name}</Form.Control.Feedback>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Label>Age</Form.Label>
              <Form.Control
                type="number"
                name="age"
                value={form.age}
                onChange={handleChange}
                placeholder="Age"
                min={0}
                required
                isInvalid={!!fieldErrors.age}
              />
              <Form.Control.Feedback type="invalid">{fieldErrors.age}</Form.Control.Feedback>
            </Col>
          </Row>
          <Row>
            <Col md={6} className="mb-3">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="Phone Number"
                required
                isInvalid={!!fieldErrors.phone}
              />
              <Form.Control.Feedback type="invalid">{fieldErrors.phone}</Form.Control.Feedback>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Label>Country</Form.Label>
              <Form.Control
                type="text"
                name="country"
                value={form.country}
                onChange={handleChange}
                placeholder="Country"
                required
                isInvalid={!!fieldErrors.country}
              />
              <Form.Control.Feedback type="invalid">{fieldErrors.country}</Form.Control.Feedback>
            </Col>
          </Row>
          <Row>
            <Col md={6} className="mb-3">
              <Form.Label>Allergies</Form.Label>
              <Form.Control
                type="text"
                name="allergies"
                value={form.allergies}
                onChange={handleChange}
                placeholder="List any allergies you have"
              />
            </Col>
            <Col md={6} className="mb-3">
              <Form.Label>Injuries</Form.Label>
              <Form.Control
                type="text"
                name="injuries"
                value={form.injuries}
                onChange={handleChange}
                placeholder="List any recent or chronic injuries"
              />
            </Col>
          </Row>
          <Row>
            <Col md={6} className="mb-3">
              <Form.Label>Chronic Conditions</Form.Label>
              <Form.Control
                type="text"
                name="chronicConditions"
                value={form.chronicConditions}
                onChange={handleChange}
                placeholder="E.g. diabetes, hypertension, etc."
              />
            </Col>
            <Col md={6} className="mb-3">
              <Form.Label>Current Medications</Form.Label>
              <Form.Control
                type="text"
                name="medications"
                value={form.medications}
                onChange={handleChange}
                placeholder="List any medications you are taking"
              />
            </Col>
          </Row>
          <Button type="submit" variant="primary" className="w-100" style={{ fontSize: '1.1rem', fontWeight: 500 }}>
            Send to Doctor
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default PatientInfoForm;
