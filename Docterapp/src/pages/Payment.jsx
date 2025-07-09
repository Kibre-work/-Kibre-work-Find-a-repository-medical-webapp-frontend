import React, { useState } from 'react';
import { Card, Form, Button, Row, Col, Alert } from 'react-bootstrap';
import { FaCreditCard, FaMoneyCheckAlt } from 'react-icons/fa';

const Payment = () => {
  const [form, setForm] = useState({
    name: '',
    cardNumber: '',
    expiry: '',
    cvc: '',
    amount: '',
  });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccess(false);
    setError('');
    // TODO: Connect to backend/payment gateway
    if (form.cardNumber.length < 12 || form.cvc.length < 3 || !form.amount) {
      setError('Please enter valid payment details.');
      return;
    }
    setSuccess(true);
    setForm({ name: '', cardNumber: '', expiry: '', cvc: '', amount: '' });
  };

  return (
    <Card className="mb-4 shadow-sm" style={{ maxWidth: 480, margin: '2rem auto', borderRadius: 16 }}>
      <Card.Body>
        <div className="d-flex align-items-center mb-3">
          <FaMoneyCheckAlt size={28} style={{ color: '#0d6efd', marginRight: 10 }} />
          <Card.Title className="mb-0" style={{ fontSize: 22, fontWeight: 600 }}>Make a Payment</Card.Title>
        </div>
        {success && <Alert variant="success">Payment successful!</Alert>}
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Name on Card</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Full Name"
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Card Number</Form.Label>
            <Form.Control
              type="text"
              name="cardNumber"
              value={form.cardNumber}
              onChange={handleChange}
              placeholder="1234 5678 9012 3456"
              required
              maxLength={19}
            />
          </Form.Group>
          <Row>
            <Col md={6} className="mb-3">
              <Form.Label>Expiry Date</Form.Label>
              <Form.Control
                type="text"
                name="expiry"
                value={form.expiry}
                onChange={handleChange}
                placeholder="MM/YY"
                required
                maxLength={5}
              />
            </Col>
            <Col md={6} className="mb-3">
              <Form.Label>CVC</Form.Label>
              <Form.Control
                type="password"
                name="cvc"
                value={form.cvc}
                onChange={handleChange}
                placeholder="CVC"
                required
                maxLength={4}
              />
            </Col>
          </Row>
          <Form.Group className="mb-4">
            <Form.Label>Amount</Form.Label>
            <Form.Control
              type="number"
              name="amount"
              value={form.amount}
              onChange={handleChange}
              placeholder="Amount"
              min={1}
              required
            />
          </Form.Group>
          <Button type="submit" variant="primary" className="w-100" style={{ fontSize: '1.1rem', fontWeight: 500 }}>
            <FaCreditCard className="me-2" />Pay Now
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default Payment;
