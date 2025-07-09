import React, { useState, useRef, useEffect } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import axios from 'axios'; // <-- Add this line
import ReCAPTCHA from 'react-google-recaptcha';

function ContactMe() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(null);
  const recaptchaRef = useRef();

  // Regex for proper name (letters, spaces, at least two words)
  const nameRegex = /^[A-Z][a-zA-Z]+(\s[A-Z][a-zA-Z]+)+$/;
  // Simple email regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  // Message: only allow letters, numbers, punctuation, spaces, and at least 10 chars
  const messageRegex = /^[A-Za-z0-9 .,!?"'\-\n]{10,}$/;

  const validate = () => {
    const newErrors = {};
    if (!nameRegex.test(form.name.trim())) {
      newErrors.name = 'Please enter your full name (first and last, capitalized).';
    }
    if (!emailRegex.test(form.email.trim())) {
      newErrors.email = 'Please enter a valid email address.';
    }
    if (!messageRegex.test(form.message.trim())) {
      newErrors.message = 'Please enter a formal message (at least 10 characters, no emojis or slang).';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess(null);
    setErrors({});
    setSubmitting(true);
    let recaptchaToken = null;
    try {
      recaptchaToken = await recaptchaRef.current.executeAsync();
      recaptchaRef.current.reset();
      if (!recaptchaToken) {
        setErrors({ recaptcha: 'reCAPTCHA verification failed. Please try again.' });
        setSubmitting(false);
        return;
      }
      if (validate()) {
        await axios.post('http://127.0.0.1:8000/api/contact/', { ...form, recaptchaToken }, {
          headers: { 'Content-Type': 'application/json' }
        });
        setSuccess('Message sent successfully!');
        setForm({ name: '', email: '', message: '' });
      }
    } catch {
      setSuccess('Failed to send message. Please try again later.');
    }
    setSubmitting(false);
  };

  return (
    <section
      className="bg-white"
      id="Contacts"
      style={{
        backgroundImage: "url('/contactme.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '150vh',
      }}
    >
      <Container fluid style={{
        background: 'rgba(0,0,0,0.55)',
        borderRadius: 0,
        boxShadow: 'none',
        padding: 0,
        width: '100vw',
        minHeight: '160vh',
        height: '100%',
        margin: 0,
        color: '#fff',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1,
      }}>
        <Row className="mb-4 justify-content-center align-items-center">
          <Col xs={12}></Col>
        </Row>
        <Row className="mb-4">
          {/* Contact Info */}
          <Col md={5}></Col>
          {/* Contact Form */}
          <Col md={7}>
            <h2 className="mb-4 fw-bold" style={{ color: '#fff', textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}>Contact Me</h2>
            <Form style={{ background: 'rgba(255,255,255,0.10)', borderRadius: 12, padding: 16, boxShadow: '0 2px 12px rgba(0,0,0,0.10)', maxWidth: 540, margin: '0 auto' }} onSubmit={handleSubmit}>
              <Form.Group controlId="name" className="mb-3">
                <Form.Label style={{ color: '#fff', fontWeight: 500, fontSize: '1rem' }}>Full Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  required
                  value={form.name}
                  onChange={handleChange}
                  style={{ background: 'rgba(255,255,255,0.15)', color: '#fff', border: '1px solid #fff', fontSize: '1.12rem', padding: '0.7rem 1.3rem', height: '2.7rem', maxWidth: 500, margin: '0 auto' }}
                  isInvalid={!!errors.name}
                  size="sm"
                  disabled={submitting}
                />
                <Form.Control.Feedback type="invalid" style={{ fontSize: '1.08rem' }}>{errors.name}</Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="email" className="mb-3">
                <Form.Label style={{ color: '#fff', fontWeight: 500, fontSize: '1rem' }}>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  style={{ background: 'rgba(255,255,255,0.15)', color: '#fff', border: '1px solid #fff', fontSize: '1.12rem', padding: '0.7rem 1.3rem', height: '2.7rem', maxWidth: 500, margin: '0 auto' }}
                  isInvalid={!!errors.email}
                  size="sm"
                  disabled={submitting}
                />
                <Form.Control.Feedback type="invalid" style={{ fontSize: '1.08rem' }}>{errors.email}</Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="message" className="mb-3">
                <Form.Label style={{ color: '#fff', fontWeight: 500, fontSize: '1rem' }}>Your Message</Form.Label>
                <Form.Control
                  as="textarea"
                  name="message"
                  rows={3}
                  placeholder="Write your message..."
                  required
                  value={form.message}
                  onChange={handleChange}
                  style={{ background: 'rgba(255,255,255,0.15)', color: '#fff', border: '1px solid #fff', fontSize: '1.12rem', padding: '0.7rem 1.3rem', minHeight: '3.3rem', maxHeight: '8rem', maxWidth: 500, margin: '0 auto' }}
                  isInvalid={!!errors.message}
                  size="sm"
                  disabled={submitting}
                />
                <Form.Control.Feedback type="invalid" style={{ fontSize: '1.08rem' }}>{errors.message}</Form.Control.Feedback>
              </Form.Group>
              <div style={{ margin: '1rem 0', display: 'flex', justifyContent: 'center' }}>
                <ReCAPTCHA
                  ref={recaptchaRef}
                  sitekey="6Lfi0GErAAAAACzYobuzWa03GieSTSVezj0uYh1i"
                  size="invisible"
                />
              </div>
              {errors.recaptcha && (
                <div style={{ color: '#ff5252', fontSize: '1.08rem', textAlign: 'center', marginBottom: 8 }}>{errors.recaptcha}</div>
              )}
              <Button
                type="submit"
                variant="light"
                className="w-100 fw-bold"
                style={{ color: '#0d6efd', background: '#fff', border: 'none', transition: 'background 0.2s, color 0.2s', fontSize: '1.12rem', padding: '0.7rem 1.3rem', height: '2.8rem', maxWidth: 500, margin: '0 auto' }}
                onMouseOver={e => { e.target.style.background = '#0d6efd'; e.target.style.color = '#fff'; }}
                onMouseOut={e => { e.target.style.background = '#fff'; e.target.style.color = '#0d6efd'; }}
                size="sm"
                disabled={submitting}
              >
                {submitting ? 'Sending...' : 'Send Message'}
              </Button>
              {/* Success/Error Message */}
              {success && (
                <div style={{
                  marginTop: '1.2rem',
                  color: success.includes('success') ? '#4caf50' : '#ff5252',
                  fontSize: '1.08rem',
                  textAlign: 'center',
                  fontWeight: 500,
                  letterSpacing: '0.01em',
                  minHeight: 32
                }}>
                  {success}
                </div>
              )}
              {/* Animated validation instruction */}
              <div style={{
                marginTop: '1.2rem',
                color: '#fff',
                fontSize: '1.04rem',
                textAlign: 'center',
                animation: 'fadeInUp 1.2s',
                fontWeight: 400,
                letterSpacing: '0.01em',
                minHeight: 32
              }}>
                <span style={{ display: 'inline-block', animation: 'bounce 1.2s infinite alternate', fontSize: '1.5rem', verticalAlign: 'middle' }}>⬆️</span>
                <br />
                Please fill in all fields correctly: <br />
                <span style={{ color: '#ffd700' }}>Name</span> (First and Last, capitalized), <span style={{ color: '#ffd700' }}>Email</span> (valid format), <span style={{ color: '#ffd700' }}>Message</span> (at least 10 formal characters, no emojis/slang)
                <style>{`
                  @keyframes fadeInUp {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                  }
                  @keyframes bounce {
                    0% { transform: translateY(0); }
                    100% { transform: translateY(-8px); }
                  }
                `}</style>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default ContactMe;