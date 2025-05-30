import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import '../App.css';

function AboutDocter() {
  return (
       <section
      id="About"
      className="bg-light text-dark"
      style={{
        minHeight: '100vh',
        width: '100vw',
        margin: 0,
        paddingTop: '5px',
        boxSizing: 'border-box',
        position: 'relative',
        left: '50%',
        right: '50%',
        transform: 'translateX(-50%)',
        backgroundImage: "url('/aboutimage.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundColor: 'rgba(255,255,255,0.3)', // more transparent overlay for better background visibility
        backdropFilter: 'blur(2px)',
      }}
    >
 <Container
  style={{
    background: 'rgba(255,255,255,0.5)',
    borderRadius: '25px',
    boxShadow: '0 4px 24px rgba(0,0,0,0.10)',
    padding: '4rem 2.5rem',
    width: '90%', // percent-based but not full width
    maxWidth: '1000px',
    margin: '0 auto',
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    boxSizing: 'border-box',
  }}
>
     

        <div style={{ position: 'relative', zIndex: 1 }}>
          <Row className="justify-content-center text-center mb-4">
            <Col md={8}>
              <h2 className="fw-bold mb-3" style={{ color: '#111' }}>
                About Dr. Marishet Agumasie
              </h2>
              <p className="lead" style={{ color: '#222', fontWeight: 500, fontFamily: 'Lora, Georgia, serif', fontSize: '1.18rem', textAlign: 'justify', lineHeight: 1.7, letterSpacing: '0.01em', margin: '0 auto', maxWidth: 700 }}>
  Dr. Marishet Agumasie is a highly qualified healthcare professional with a Doctor of Medicine. Backed by a strong track record in both clinical practice and medical education, he is dedicated to delivering personalized, compassionate care. His approach reflects a strong commitment to accessible, expert, and patient-centered healthcare for individuals and families.
              </p>
            </Col>
          </Row>

          <Row className="text-center" style={{ marginTop: '2.5rem' }}>
  <Col md={4} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
    <h5 style={{ color: '#111', fontFamily: 'Montserrat, Arial, sans-serif', fontWeight: 700, letterSpacing: '0.5px' }}>Experience</h5>
    <p style={{ color: '#333', fontWeight: 500, fontFamily: 'Lora, Georgia, serif', fontSize: '1.13rem', textAlign: 'center', maxWidth: 260, lineHeight: 1.6 }}>
      Over 10 years of clinical and academic experience in healthcare.
    </p>
  </Col>
  <Col md={4} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
    <h5 style={{ color: '#111', fontFamily: 'Montserrat, Arial, sans-serif', fontWeight: 700, letterSpacing: '0.5px' }}>Education</h5>
    <p style={{ color: '#333', fontWeight: 500, fontFamily: 'Lora, Georgia, serif', fontSize: '1.13rem', textAlign: 'center', maxWidth: 260, lineHeight: 1.6 }}>
      Ph.D. in Medicine and numerous international certifications.
    </p>
  </Col>
  <Col md={4} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
    <h5 style={{ color: '#111', fontFamily: 'Montserrat, Arial, sans-serif', fontWeight: 700, letterSpacing: '0.5px' }}>Philosophy</h5>
    <p style={{ color: '#333', fontWeight: 500, fontFamily: 'Lora, Georgia, serif', fontSize: '1.13rem', textAlign: 'center', maxWidth: 260, lineHeight: 1.6 }}>
      Guided by empathy, personalized care, and the latest clinical research to achieve the best patient outcomes.
    </p>
  </Col>
</Row>
        </div>
      </Container>
    </section>
  );
}

export default AboutDocter;