import { useState, useRef, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';

function BMI() {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [bmi, setBmi] = useState(null);
  const [category, setCategory] = useState('');
  const [error, setError] = useState('');
  const weightRef = useRef(null);

  useEffect(() => {
    weightRef.current?.focus();
  }, []);

  const calculateBMI = (e) => {
    e.preventDefault();
    setError('');
    const w = parseFloat(weight.trim());
    const h = parseFloat(height.trim()) / 100;

    if (!Number.isFinite(w) || !Number.isFinite(h) || w <= 0 || h <= 0) {
      setError('Please enter valid positive numbers for weight and height.');
      setBmi(null);
      setCategory('');
      return;
    }

    const bmiValue = w / (h * h);
    const rounded = bmiValue.toFixed(1);
    setBmi(rounded);

    if (bmiValue < 18.5) setCategory('Underweight');
    else if (bmiValue < 25) setCategory('Normal weight');
    else if (bmiValue < 30) setCategory('Overweight');
    else setCategory('Obesity');
  };

  return (
    <Container className="py-4 px-3" style={{ maxWidth: '420px' }}>
      <Card
        className="mx-auto shadow-sm rounded-4"
        style={{ overflow: 'visible', backgroundColor: '#fff9f9' }}
      >
        <Card.Body>
<Card.Title className="text-center mb-4" style={{ overflow: 'visible' }}>
  <div
    className="d-flex justify-content-center align-items-center flex-column gap-2"
    style={{
      whiteSpace: 'nowrap',
      padding: '12px 16px 16px', // more top and bottom padding
      overflow: 'visible',
      lineHeight: 1.1,
    }}
  >
    <span
      role="img"
      aria-label="calculator"
      style={{
        fontSize: 'clamp(3rem, 8vw, 4rem)',
        lineHeight: '1',
        userSelect: 'none',
        padding: '55px',  // more padding all around
        backgroundColor: '#ffe6e6',
        borderRadius: '50%',
        boxShadow: '0 0 8px rgba(0, 21, 255, 0.43)',
        display: 'inline-block',
        verticalAlign: 'middle',
      }}
    >
      🧮
    </span>
    <h2
      className="fw-bold"
      style={{ margin: 0, fontSize: 'clamp(1.5rem, 5vw, 2.25rem)', lineHeight: 1.1 }}
    >
      BMI Calculator
    </h2>
  </div>
</Card.Title>

          <Form onSubmit={calculateBMI}>
            <Form.Group className="mb-3" controlId="weight">
              <Form.Label>Weight (kg)</Form.Label>
              <Form.Control
                type="number"
                min="1"
                step="any"
                placeholder="Enter your weight"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                ref={weightRef}
                required
                style={{ borderRadius: '0.75rem' }}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="height">
              <Form.Label>Height (cm)</Form.Label>
              <Form.Control
                type="number"
                min="1"
                step="any"
                placeholder="Enter your height"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                required
                style={{ borderRadius: '0.75rem' }}
              />
            </Form.Group>

            <Button
              variant="danger"
              type="submit"
              className="w-100 fw-semibold"
              style={{ borderRadius: '1.5rem', padding: '0.6rem 0', fontSize: '1.1rem' }}
            >
              Calculate BMI
            </Button>
          </Form>

          {error && (
            <Alert variant="danger" className="mt-3 rounded-3 text-center">
              {error}
            </Alert>
          )}

          {bmi && (
            <Alert
              variant="warning"
              className="mt-4 text-center rounded-4"
              style={{ fontWeight: '600', fontSize: '1.1rem' }}
            >
              <div>Your BMI: <strong>{bmi}</strong></div>
              <div className="mb-1">Category: <strong>{category}</strong></div>
              <small style={{ fontWeight: 'normal' }}>
                {bmi < 18.5 && 'BMI less than 18.5: Underweight'}
                {bmi >= 18.5 && bmi < 25 && 'BMI 18.5 - 24.9: Normal weight'}
                {bmi >= 25 && bmi < 30 && 'BMI 25 - 29.9: Overweight'}
                {bmi >= 30 && 'BMI 30 or higher: Obesity'}
              </small>
            </Alert>
          )}

          <Card className="mt-4 rounded-4" style={{ backgroundColor: '#fff0f0' }}>
            <Card.Body>
              <h6 className="fw-semibold">What is BMI?</h6>
              <p>
                Body Mass Index (BMI) is a simple calculation using a person’s height and weight.
              </p>
              <p>
                <strong>BMI Categories:</strong><br />
                • Underweight: BMI less than 18.5<br />
                • Normal weight: BMI 18.5 – 24.9<br />
                • Overweight: BMI 25 – 29.9<br />
                • Obesity: BMI 30 or higher
              </p>
            </Card.Body>
          </Card>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default BMI;