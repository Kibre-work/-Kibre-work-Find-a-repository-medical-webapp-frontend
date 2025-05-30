import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';

function calculateDueDate(lmpDate) {
  // Add 280 days (40 weeks) to LMP
  const lmp = new Date(lmpDate);
  if (isNaN(lmp)) return '';
  const due = new Date(lmp.getTime() + 280 * 24 * 60 * 60 * 1000);
  return due.toLocaleDateString();
}

const PregnancyCalculator = () => {
  const [lmp, setLmp] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [showResult, setShowResult] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!lmp) return;
    setDueDate(calculateDueDate(lmp));
    setShowResult(true);
  };

  return (
    <section
      id="pregnancy-calculator"
      className="bg-light text-dark"
      style={{
        minHeight: '100vh',
        width: '100vw',
        margin: 0,
        padding: '2rem 0 8rem',
        boxSizing: 'border-box',
        position: 'relative',
        left: '50%',
        right: '50%',
        transform: 'translateX(-50%)',
        backgroundImage: "url('/background image.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundColor: 'rgba(255,255,255,0.85)',
        backdropFilter: 'blur(2px)',
      }}
    >
      <Container style={{ maxWidth: 500 }}>
        <Card className="shadow-lg mt-5 mb-4" style={{ borderRadius: 24 }}>
          <Card.Body>
            <h2 className="text-center mb-4" style={{ color: '#0d6efd', fontWeight: 800 }}>Pregnancy Due Date Calculator</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="lmpDate">
                <Form.Label>First day of your last menstrual period (LMP):</Form.Label>
                <Form.Control
                  type="date"
                  value={lmp}
                  onChange={e => { setLmp(e.target.value); setShowResult(false); }}
                  required
                />
              </Form.Group>
              <div className="d-grid gap-2">
                <Button variant="primary" type="submit" size="lg">
                  Calculate Due Date
                </Button>
              </div>
            </Form>
            {showResult && dueDate && (
              <div className="mt-4 text-center">
                <h4 style={{ color: '#43a047', fontWeight: 700 }}>Estimated Due Date:</h4>
                <div style={{ fontSize: '1.5rem', color: '#0d6efd', fontWeight: 800 }}>{dueDate}</div>
                <p className="mt-3" style={{ color: '#555' }}>
                  This is an estimate based on a 28-day cycle. For more accurate results, consult your healthcare provider.
                </p>
              </div>
            )}
          </Card.Body>
        </Card>
      </Container>
      {/* Mobile responsive styles */}
      <style>{`
        @media (max-width: 575.98px) {
          #pregnancy-calculator {
            min-height: unset !important;
            width: 100vw !important;
            padding: 1.2rem 0.1rem 2.5rem 0.1rem !important;
          }
          .container {
            padding-left: 0 !important;
            padding-right: 0 !important;
            margin: 0 auto !important;
            width: 100vw !important;
            max-width: 100vw !important;
          }
          .card.shadow-lg {
            border-radius: 14px !important;
            margin-top: 1.2rem !important;
            margin-bottom: 1.2rem !important;
          }
          .card-body {
            padding: 1.1rem 0.7rem !important;
          }
          h2.text-center.mb-4 {
            font-size: 1.25rem !important;
            margin-bottom: 0.8rem !important;
          }
          .form-label {
            font-size: 0.98rem !important;
          }
          .form-control[type='date'] {
            font-size: 1rem !important;
            padding: 0.5rem 0.7rem !important;
          }
          .btn-lg {
            font-size: 1.08rem !important;
            padding: 0.7rem 0 !important;
            border-radius: 1.2rem !important;
          }
          .mt-4.text-center {
            margin-top: 1.1rem !important;
          }
          h4[style*='color: #43a047'] {
            font-size: 1.05rem !important;
          }
          div[style*='font-size: 1.5rem'] {
            font-size: 1.15rem !important;
          }
          .mt-3 {
            margin-top: 0.7rem !important;
            font-size: 0.97rem !important;
          }
        }
      `}</style>
    </section>
  );
};

export default PregnancyCalculator;
