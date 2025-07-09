import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Button, Container } from 'react-bootstrap';

function PasswordResetConfirm() {
  const { uid, token } = useParams();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(null);
    if (!password || password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    setSubmitting(true);
    try {
      const response = await fetch('http://127.0.0.1:8000/api/register/password-reset-confirm/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ uid, token, password }),
      });
      if (response.ok) {
        setSuccess('Password reset successful! You can now log in.');
        setTimeout(() => navigate('/login'), 2000);
      } else {
        const data = await response.json();
        setError(data.detail || 'Password reset failed.');
      }
    } catch {
      setError('Password reset failed. Please try again later.');
    }
    setSubmitting(false);
  };

  return (
    <Container style={{ maxWidth: 400, margin: '2rem auto', background: '#fff', borderRadius: 12, boxShadow: '0 2px 12px rgba(0,0,0,0.10)', padding: 32 }}>
      <h2 className="mb-4 fw-bold" style={{ textAlign: 'center' }}>Reset Password</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="password" className="mb-3">
          <Form.Label>New Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Enter new password"
            autoComplete="new-password"
            isInvalid={!!error}
          />
        </Form.Group>
        <Form.Group controlId="confirmPassword" className="mb-3">
          <Form.Label>Confirm New Password</Form.Label>
          <Form.Control
            type="password"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            placeholder="Confirm new password"
            autoComplete="new-password"
            isInvalid={!!error}
          />
          <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
        </Form.Group>
        <Button type="submit" variant="primary" className="w-100 fw-bold" disabled={submitting}>
          {submitting ? 'Resetting...' : 'Reset Password'}
        </Button>
        {success && (
          <div style={{ color: '#4caf50', fontWeight: 500, textAlign: 'center', marginTop: 16 }}>{success}</div>
        )}
      </Form>
    </Container>
  );
}

export default PasswordResetConfirm;
