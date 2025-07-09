import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(null);
    if (!email.trim() || !/^\S+@\S+\.\S+$/.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    setSubmitting(true);
    try {
      const response = await fetch('http://127.0.0.1:8000/api/register/password-reset/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (response.ok) {
        setSuccess('If this email is registered, a password reset link has been sent.');
        setEmail('');
      } else {
        const data = await response.json();
        setError(data.detail || 'Failed to send reset link.');
      }
    } catch {
      setError('Failed to send reset link. Please try again later.');
    }
    setSubmitting(false);
  };

  return (
    <Container style={{ maxWidth: 400, margin: '2rem auto', background: '#fff', borderRadius: 12, boxShadow: '0 2px 12px rgba(0,0,0,0.10)', padding: 32 }}>
      <h2 className="mb-4 fw-bold" style={{ textAlign: 'center' }}>Forgot Password</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="email" className="mb-3">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Enter your registered email"
            autoComplete="off"
            isInvalid={!!error}
          />
          <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
        </Form.Group>
        <Button type="submit" variant="primary" className="w-100 fw-bold" disabled={submitting}>
          {submitting ? 'Sending...' : 'Send Reset Link'}
        </Button>
        {success && (
          <div style={{ color: '#4caf50', fontWeight: 500, textAlign: 'center', marginTop: 16 }}>{success}</div>
        )}
      </Form>
    </Container>
  );
}

export default ForgotPassword;
