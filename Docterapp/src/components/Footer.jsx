import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaEnvelope } from 'react-icons/fa';

function Footer() {
  return (
    <footer
      className="bg-primary text-light py-4 m-0"
      style={{
        boxSizing: 'border-box',
        position: 'relative',
        width: '100vw',
        maxWidth: '100vw',
        left: 0,
        overflowX: 'hidden',
        borderTop: '1px solid black',
        zIndex: 999,
      }}
    >
      <div className="container-fluid p-0 m-0"> {/* NO padding/margin */}
        <Row className="text-center text-md-start g-0"> {/* g-0 removes gutters (no spacing) */}
          {/* Brand Info */}
          <Col md={4} className="mb-4 px-3">
            <h5 className="fw-bold">Dr. Marishet Agumasie</h5>
            <p>Committed to advancing public health and medical service delivery.</p>
          </Col>

          {/* Quick Links */}
          <Col md={4} className="mb-4 px-3">
            <h6 className="fw-bold">Quick Links</h6>
            <ul className="list-unstyled">
              <li><a href="/#home" className="text-light text-decoration-none">Home</a></li>
              <li><a href="/#About" className="text-light text-decoration-none">About</a></li>
              <li><a href="/#Services" className="text-light text-decoration-none">Services</a></li>
              <li><a href="/#Contacts" className="text-light text-decoration-none">Contact</a></li>
            </ul>
          </Col>

          {/* Contact & Social */}
          <Col md={4} className="mb-4 px-3">
            <h6 className="fw-bold">Contact</h6>
            <p>Email: marishettamene542@gmail.com</p>
            <p>Phone: +251 969 455 215</p>
            <div className="d-flex gap-3 mt-3 justify-content-center justify-content-md-start">
              <a href="mailto:marishettamene542@gmail.com" className="text-light fs-5" aria-label="Email"><FaEnvelope /></a>
              <a href="https://facebook.com" className="text-light fs-5" target="_blank" rel="noreferrer" aria-label="Facebook"><FaFacebookF /></a>
              <a href="https://twitter.com" className="text-light fs-5" target="_blank" rel="noreferrer" aria-label="Twitter"><FaTwitter /></a>
              <a href="https://linkedin.com" className="text-light fs-5" target="_blank" rel="noreferrer" aria-label="LinkedIn"><FaLinkedinIn /></a>
            </div>
          </Col>
        </Row>

        <hr className="border-light mx-0" />

        <Row className="mx-0 g-0">
          <Col className="text-center px-0">
            <small>&copy; {new Date().getFullYear()} Dr. Marishet Agumasie. All rights reserved.</small>
          </Col>
        </Row>
      </div>
    </footer>
  );
}

export default Footer;