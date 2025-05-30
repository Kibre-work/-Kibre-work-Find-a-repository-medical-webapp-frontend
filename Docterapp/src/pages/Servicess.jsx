import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { FaStethoscope } from 'react-icons/fa';
import { motion } from 'framer-motion';

const services = [
  'General health check-ups',
  'Diagnosis and treatment of common illnesses',
  'Preventive care and health screenings',
  'Blood pressure and diabetes management',
  'Routine physical exams',
  'Minor injuries and wound care',
  "Women's and men's health",
  'Pediatric care (children\'s health)',
  'Geriatric care (elderly health services)',
  'Vaccinations and immunizations',
  'Cholesterol and heart disease management',
  'Asthma and allergy management',
  'Mental health support',
  'Smoking cessation support',
  'Nutritional advice and weight management',
  'Travel health advice and vaccinations',
  'Sexual health services',
  'Health education and lifestyle counseling',
  'Referrals to specialists',
  'Prescription management and refills',
  'Health and sport with a very very long description to test how the card expands when content is big and make sure it never cuts off or hides text inside the card, regardless of how much text there is. This should wrap properly across multiple lines and expand the card height.',
];

const GPServices = () => {
  return (
      <section
      id="Services"
      className="bg-light text-dark"
      style={{
        minHeight: '100vh',
        width: '100vw',
        margin: 0,
       padding: '2rem 0 16rem',
        boxSizing: 'border-box',
        position: 'relative',
        left: '50%',
        right: '50%',
        transform: 'translateX(-50%)',
        backgroundImage: "url('/background image.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundColor: 'rgba(255,255,255,0.85)', // more opaque overlay for better text visibility
        backdropFilter: 'blur(2px)',
      }}
    >
      <Container fluid style={{ maxWidth: 1200, border: 'none' }}>
        <h2 className="text-center mb-4" style={{ color: '#fff', textShadow: '0 2px 8px rgba(0,0,0,0.5)', marginBottom: '2.5rem' }}>General Medical Services</h2>
        <div style={{ height: '6rem' }} />
        <Row
          className="g-4 justify-content-center"
          style={{
            // Make sure Row can grow vertically
            minHeight: 'auto',
            border: 'none',
          }}
        >
          {services.map((service, idx) => (
            <Col
              key={idx}
              xs={12}
              sm={6}
              md={4}
              lg={3}
              className="d-flex"
              style={{ minHeight: 'auto' }}
            >
              <Card
                as={motion.div}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.96 }}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.07, type: 'spring' }}
                className="shadow-sm w-100 d-flex flex-column"
                style={{
                  cursor: 'pointer',
                  transition: 'transform 0.3s ease',
                  minHeight: 'auto',
                }}
                onMouseEnter={undefined}
                onMouseLeave={undefined}
              >
                <Card.Body
                  className="d-flex flex-column align-items-center"
                  style={{
                    padding: '1.5rem',
                    flexGrow: 1,
                    wordBreak: 'break-word',
                    overflowWrap: 'break-word',
                    whiteSpace: 'normal',
                    minHeight: 'auto',
                  }}
                >
                  <FaStethoscope className="mb-3" size={28} />
                  <Card.Text style={{ width: '100%' }}>{service}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default GPServices;