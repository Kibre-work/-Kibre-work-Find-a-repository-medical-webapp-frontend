import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, InputGroup } from 'react-bootstrap';
import { FaEnvelope, FaLock, FaSignInAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    if (!form.email.trim()) newErrors.email = 'Email is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) newErrors.email = 'Please enter a valid email address.';
    if (!form.password) newErrors.password = 'Password is required.';
    else if (form.password.length < 6) newErrors.password = 'Password must be at least 6 characters.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess(null);
    setError('');
    if (validate()) {
      setSubmitting(true);
      try {
        const response = await fetch('http://localhost:8000/api/register/login/', {
          method: 'POST',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        });
        const data = await response.json();
        if (response.ok) {
          setSuccess('Login successful!');
          setForm({ email: '', password: '' });
          if (data.email) {
            sessionStorage.setItem('email', data.email);
          }
          if (data.role === 'doctor') {
            navigate('/dashboard');
          } else {
            navigate('/patient-dashboard');
          }
        } else {
          setError(data.detail || 'Login failed.');
        }
      } catch {
        setError('Login failed. Please try again later.');
      }
      setSubmitting(false);
    }
  };

  return (
    <Container style={{ maxWidth: 420, margin: '2.5rem auto', background: '#fff', borderRadius: 16, boxShadow: '0 4px 24px rgba(0,0,0,0.10)', padding: 36 }}>
      <div className="text-center mb-4">
        <FaSignInAlt size={38} style={{ color: '#0d6efd' }} />
        <h2 className="fw-bold mt-2" style={{ letterSpacing: 1 }}>Sign In</h2>
        <div className="text-muted" style={{ fontSize: '1.1rem' }}>Access your secure health portal</div>
      </div>
      <Form onSubmit={handleSubmit} autoComplete="off">
        <Form.Group controlId="email" className="mb-3">
          <Form.Label>Email address</Form.Label>
          <InputGroup>
            <InputGroup.Text><FaEnvelope /></InputGroup.Text>
            <Form.Control
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              isInvalid={!!errors.email}
              placeholder="Enter your email"
              autoComplete="username"
            />
            <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
        <Form.Group controlId="password" className="mb-3">
          <Form.Label>Password</Form.Label>
          <InputGroup>
            <InputGroup.Text><FaLock /></InputGroup.Text>
            <Form.Control
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={form.password}
              onChange={handleChange}
              isInvalid={!!errors.password}
              placeholder="Enter your password"
              autoComplete="current-password"
            />
            <Button
              variant="outline-secondary"
              onClick={() => setShowPassword((prev) => !prev)}
              tabIndex={-1}
              style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
            >
              {showPassword ? 'Hide' : 'Show'}
            </Button>
            <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
        <Row className="mb-3">
          <Col xs="6">
            <Form.Check type="checkbox" label="Remember me" disabled />
          </Col>
          <Col xs="6" className="text-end">
            <a href="/forgot-password" style={{ fontSize: '0.95rem' }}>Forgot password?</a>
          </Col>
        </Row>
        <Button type="submit" variant="primary" className="w-100 fw-bold" disabled={submitting} style={{ fontSize: '1.1rem', boxShadow: '0 2px 8px rgba(13,110,253,0.10)' }}>
          {submitting ? 'Signing in...' : <><FaSignInAlt className="me-2" />Sign In</>}
        </Button>
        {success && (
          <div style={{ color: '#4caf50', fontWeight: 500, textAlign: 'center', marginTop: 16 }}>{success}</div>
        )}
        {error && (
          <div style={{ color: 'red', fontWeight: 500, textAlign: 'center', marginTop: 16 }}>{error}</div>
        )}
        <div style={{ marginTop: 18, textAlign: 'center', fontSize: '1rem' }}>
          Don't have an account? <a href="/register">Register</a>
        </div>
      </Form>
    </Container>
  );
}

export default Login;
