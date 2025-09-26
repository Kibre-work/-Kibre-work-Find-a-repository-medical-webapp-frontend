import React, { useState } from 'react';
import { Button, Card, Alert } from 'react-bootstrap';
import { loadStripe } from '@stripe/stripe-js';

// Load your Stripe public key
const stripePromise = loadStripe('your_stripe_public_key_here'); // Replace with real publishable key

const Payment = () => {
  const [message, setMessage] = useState('');

  const handleStripePayment = async () => {
    try {
      const stripe = await stripePromise;

      const res = await fetch('http://localhost:8000/create-stripe-session/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: 2000 }), // Optional: send amount in cents
      });

      const data = await res.json();

      if (data.error) {
        setMessage(data.error);
        return;
      }

      await stripe.redirectToCheckout({
        sessionId: data.id,
      });
    } catch (err) {
      setMessage('Stripe payment failed.');
    }
  };

  const handleChapaPayment = async () => {
    try {
      const res = await fetch('http://localhost:8000/create-chapa-transaction/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: 200, // in ETB
          email: 'test@example.com', // replace or collect from form
          first_name: 'John',
          last_name: 'Doe',
          phone_number: '0911000000',
        }),
      });

      const data = await res.json();

      if (data.error) {
        setMessage(data.error);
        return;
      }

      // Redirect to Chapa payment page
      window.location.href = data.checkout_url;
    } catch (err) {
      setMessage('Chapa payment failed.');
    }
  };

  return (
    <Card className="shadow-sm" style={{ maxWidth: 500, margin: '2rem auto', borderRadius: 16 }}>
      <Card.Body className="text-center">
        <h4 className="mb-3">Choose Payment Method</h4>

        {message && <Alert variant="danger">{message}</Alert>}

        <Button variant="primary" className="mb-3 w-100" onClick={handleStripePayment}>
          Pay with Stripe (Card – USD)
        </Button>

        <Button variant="success" className="w-100" onClick={handleChapaPayment}>
          Pay with Chapa (Ethiopia – ETB)
        </Button>
      </Card.Body>
    </Card>
  );
};

export default Payment;