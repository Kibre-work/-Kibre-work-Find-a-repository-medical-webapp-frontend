import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, InputGroup } from 'react-bootstrap';
import { FaUser, FaEnvelope, FaLock, FaImage } from 'react-icons/fa';

function Register() {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    terms: false,
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!form.firstName.trim()) newErrors.firstName = 'First name is required.';
    else if (!/^[A-Za-z]+$/.test(form.firstName.trim())) newErrors.firstName = 'First name must contain only letters.';
    if (!form.lastName.trim()) newErrors.lastName = 'Last name is required.';
    else if (!/^[A-Za-z]+$/.test(form.lastName.trim())) newErrors.lastName = 'Last name must contain only letters.';
    if (!form.email.trim() || !/^\S+@\S+\.\S+$/.test(form.email)) newErrors.email = 'Valid email is required.';
    if (!form.password || form.password.length < 6) newErrors.password = 'Password must be at least 6 characters.';
    else if (!/^(?=.*[0-9])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).+$/.test(form.password)) newErrors.password = 'Password must include at least one number and one special character.';
    if (form.password !== form.confirmPassword) newErrors.confirmPassword = 'Passwords do not match.';
    if (!form.terms) newErrors.terms = 'You must accept the terms and conditions.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };

  const handlePhotoChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setPhoto(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess(null);
    if (validate()) {
      setSubmitting(true);
      const formData = new FormData();
      formData.append('first_name', form.firstName);
      formData.append('last_name', form.lastName);
      formData.append('email', form.email);
      formData.append('password', form.password);
      formData.append('confirm_password', form.confirmPassword);
      if (photo) {
        formData.append('photo', photo);
      }
      try {
        const response = await fetch('http://127.0.0.1:8000/api/register/register/', {
          method: 'POST',
          body: formData,
        });
        if (response.ok) {
          setSuccess('Registration successful!');
          setForm({
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: '',
            terms: false,
          });
          setPhoto(null);
        } else {
          const data = await response.json();
          setSuccess(data.detail || 'Registration failed.');
        }
      } catch (err) {
        setSuccess('Registration failed. Please try again later.');
      }
      setSubmitting(false);
    }
  };

  return (
    <Container style={{ maxWidth: 520, margin: '2rem auto', background: '#fff', borderRadius: 16, boxShadow: '0 2px 16px rgba(0,0,0,0.10)', padding: 32 }}>
      <h2 className="mb-4 fw-bold" style={{ textAlign: 'center', letterSpacing: 1 }}>Create Your Account</h2>
      <Form onSubmit={handleSubmit} autoComplete="off">
        <Row>
          <Col>
            <Form.Group controlId="firstName" className="mb-3">
              <Form.Label>First Name</Form.Label>
              <InputGroup>
                <InputGroup.Text><FaUser /></InputGroup.Text>
                <Form.Control
                  type="text"
                  name="firstName"
                  value={form.firstName}
                  onChange={handleChange}
                  isInvalid={!!errors.firstName}
                  placeholder="Enter first name"
                  autoComplete="off"
                />
                <Form.Control.Feedback type="invalid">{errors.firstName}</Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="lastName" className="mb-3">
              <Form.Label>Last Name</Form.Label>
              <InputGroup>
                <InputGroup.Text><FaUser /></InputGroup.Text>
                <Form.Control
                  type="text"
                  name="lastName"
                  value={form.lastName}
                  onChange={handleChange}
                  isInvalid={!!errors.lastName}
                  placeholder="Enter last name"
                  autoComplete="off"
                />
                <Form.Control.Feedback type="invalid">{errors.lastName}</Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
          </Col>
        </Row>
        <Form.Group controlId="email" className="mb-3">
          <Form.Label>Email</Form.Label>
          <InputGroup>
            <InputGroup.Text><FaEnvelope /></InputGroup.Text>
            <Form.Control
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              isInvalid={!!errors.email}
              placeholder="Enter email"
              autoComplete="off"
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
              placeholder="Enter password"
              autoComplete="new-password"
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
        <Form.Group controlId="confirmPassword" className="mb-3">
          <Form.Label>Confirm Password</Form.Label>
          <InputGroup>
            <InputGroup.Text><FaLock /></InputGroup.Text>
            <Form.Control
              type={showConfirmPassword ? 'text' : 'password'}
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              isInvalid={!!errors.confirmPassword}
              placeholder="Confirm password"
              autoComplete="new-password"
            />
            <Button
              variant="outline-secondary"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              tabIndex={-1}
              style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
            >
              {showConfirmPassword ? 'Hide' : 'Show'}
            </Button>
            <Form.Control.Feedback type="invalid">{errors.confirmPassword}</Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
        <Form.Group controlId="photo" className="mb-3">
          <Form.Label>Profile Photo</Form.Label>
          <InputGroup>
            <InputGroup.Text><FaImage /></InputGroup.Text>
            <Form.Control
              type="file"
              name="photo"
              accept="image/*"
              onChange={handlePhotoChange}
              disabled={submitting}
            />
          </InputGroup>
          {photo && (
            <div style={{ marginTop: 8, textAlign: 'center' }}>
              <img
                src={URL.createObjectURL(photo)}
                alt="Preview"
                style={{ maxWidth: 120, maxHeight: 120, borderRadius: '50%', border: '1px solid #ccc' }}
              />
            </div>
          )}
        </Form.Group>
        <Form.Group controlId="terms" className="mb-3">
          <Form.Check
            type="checkbox"
            name="terms"
            checked={form.terms}
            onChange={handleChange}
            isInvalid={!!errors.terms}
            label={<span>I agree and consent to the <a href="/terms" target="_blank" rel="noopener noreferrer">terms and conditions</a></span>}
            feedback={errors.terms}
            feedbackType="invalid"
          />
        </Form.Group>
        <Button type="submit" variant="primary" className="w-100 fw-bold" disabled={submitting} style={{ fontSize: '1.1rem' }}>
          {submitting ? 'Registering...' : 'Register'}
        </Button>
        {success && (
          <div style={{ color: '#4caf50', fontWeight: 500, textAlign: 'center', marginTop: 16 }}>{success}</div>
        )}
        <div style={{ marginTop: 18, textAlign: 'center', fontSize: '1rem' }}>
          Already have an account? <a href="/login">Login</a>
        </div>
      </Form>
    </Container>
  );
}

export default Register;
