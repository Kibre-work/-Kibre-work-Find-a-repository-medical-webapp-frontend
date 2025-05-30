import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';
import '../App.css';

function Navbars() {
  return (
    <Navbar
      expand="md"
      fixed="top"
      className="p-0 m-0 w-100"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1050,
        minHeight: '80px',
        background: 'rgb(8, 99, 255)', // transparent blue
       
        WebkitBackdropFilter: 'blur(6px)',
        borderBottom: '1.5px solid rgba(33,150,243,0.18)'
      }}
    >
      <img
        src="/log4.png"
        alt="Logo"
        className="navbar-logo"
        style={{
          height: '83px',
          width: '120px',
          marginRight: '0',
          opacity: 1, // remove transparency
          background: 'transparent',
          border: 'none',
          boxShadow: 'none',
          display: 'block',
          filter: 'contrast(1.5) brightness(1.25)', // keep contrast and brightness only
        }}
      />
      <Container fluid="xxl" className="p-0 m-0" style={{ minHeight: '80px', paddingLeft: 0 }}>
        <Navbar.Brand
          as={Link}
          to="/"
          className="fw-bold p-0 m-0 me-auto text-white d-flex align-items-center"
          style={{ minHeight: '80px', marginLeft: 0, paddingLeft: 0 }}
        >
         
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="me-2" />
        <Navbar.Collapse id="basic-navbar-nav">
          <div className="d-flex flex-column flex-md-row justify-content-between w-100 align-items-center gap-3 gap-md-0">
            {/* Left links */}
            <Nav className="ms-md-5 gap-3 gap-md-5 flex-column flex-md-row align-items-start align-items-md-center">
              <Nav.Link as={Link} to="/" className="text-white nav-link-custom">Home</Nav.Link>
              <NavDropdown title={<span style={{ color: '#fff' }}>About</span>} id="nav-dropdown" className="nav-link-custom">
                <NavDropdown.Item as={Link} to="/about">AboutDoctor</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/feedback">Feedback</NavDropdown.Item>
              </NavDropdown>
              <Nav.Link as={Link} to="/services" className="text-white nav-link-custom">Services</Nav.Link>
              <Nav.Link as={Link} to="/contact" className="text-white nav-link-custom">Contact</Nav.Link>
            </Nav>

            {/* Right links */}
            <Nav className="gap-5 flex-row align-items-center ms-md-auto mt-3 mt-md-0">
              <Nav.Link as={Link} to="/login" className="text-white nav-link-custom">Login</Nav.Link>
              <Nav.Link as={Link} to="/register" className="text-white nav-link-custom ms-2">Register</Nav.Link>
            </Nav>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navbars;