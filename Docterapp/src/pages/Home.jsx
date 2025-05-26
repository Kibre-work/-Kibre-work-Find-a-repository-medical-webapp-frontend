import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import { FaWhatsapp } from 'react-icons/fa';

function Home() {
  return (
    <section
      id="home"
      className="bg-light text-dark"
      style={{
        minHeight: '100vh',
        width: '100vw',
        margin: 0,
        padding: 0,
        overflow: 'hidden',
        marginTop: 0, // adjust if your navbar is fixed
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
      <Container fluid className="h-100 p-0 m-0" style={{ width: '100vw', maxWidth: '100vw' }}>
        <Row className="h-100 align-items-center">
          {/* Text content */}
          <Col md={6} className="text-center text-md-start px-5" style={{ paddingTop: '3.5rem', paddingBottom: '2.5rem' }}>
            <h1 className="display-5 fw-bold" style={{ color: '#fff', textShadow: '0 2px 8px rgba(0,0,0,0.7)', paddingBottom: '1.2rem' }}>YourDoctor—Now Online</h1>
            <p className="lead mt-3" style={{ color: '#fff', textShadow: '0 2px 8px rgba(0,0,0,0.7)', paddingBottom: '1.2rem', paddingLeft: '0.5rem', paddingRight: '0.5rem', textAlign: 'justify' }}>
              Dr. Marishet Agumasie offers trusted, high-quality healthcare through secure and convenient telemedicine services—making it easier than ever to access expert medical care from the comfort of your home.
              <br /><br />
              With years of experience and a deep commitment to compassionate care, Dr. Marishet provides personalized consultations for individuals and families. Whether you need a routine check-up, medical advice, or follow-up care, he is here to support your well-being—wherever you are.
              <br /><br />
              Book your virtual appointment today and take the first step toward better health.
            </p>
            <div className="d-flex gap-3 mt-3">
              <Button
                href="https://wa.me/251969455215"
                target="_blank"
                rel="noopener noreferrer"
                className="d-flex align-items-center justify-content-center"
                style={{
                  backgroundColor: '#0d6efd',
                  color: 'white',
                  border: 'none',
                  fontSize: '1.05rem',
                  padding: '12px 34px',
                  height: '48px',
                  borderRadius: '26px',
                  lineHeight: 1,
                  minWidth: '155px',
                  maxWidth: 'fit-content',
                  width: 'auto',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
                }}
              >
                <FaWhatsapp style={{ fontSize: '1.25rem', marginRight: '12px' }} />
                Call as
              </Button>
              <Button
                onClick={() => alert('Please register first before booking an appointment.')}
                className="d-flex align-items-center justify-content-center"
                style={{
                  backgroundColor: '#0d6efd',
                  color: 'white',
                  border: 'none',
                  fontSize: '1.05rem',
                  padding: '12px 34px',
                  height: '48px',
                  borderRadius: '26px',
                  lineHeight: 1,
                  minWidth: '155px',
                  maxWidth: 'fit-content',
                  width: 'auto',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
                }}
              >
                Book Appointment
              </Button>
            </div>
          </Col>
          {/* Image content */}
          <Col md={6} className="text-center mt-4 mt-md-0 px-5">
            <Image
              src="/doctor.png"
              alt="Dr. Marishet"
              fluid
              rounded
              className="shadow"
              style={{ opacity: 0.3 }}
            />
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default Home;