import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import '../App.css';

function Navbars() {
  return (
    <Navbar
      expand="lg"
      fixed="top"
      className="p-0 m-0 w-100 transparent-blue-navbar"
      style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1050 }}
    >
      <Container fluid="xxl" className="p-0 m-0">
        <Navbar.Brand
          as={Link}
          to="/"
          className="fw-bold p-0 m-0 me-auto text-white"
        >
          <span>Dr.Marishet</span><br />
          <span>Agumasie</span>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <div className="d-flex justify-content-between w-100 align-items-center">
            {/* Left links */}
            <Nav className="ms-5 gap-5">
              <Nav.Link as={Link} to="/" className="text-white nav-link-custom">Home</Nav.Link>
              <Nav.Link as={Link} to="/about" className="text-white nav-link-custom">About</Nav.Link>
              <Nav.Link as={Link} to="/services" className="text-white nav-link-custom">Services</Nav.Link>
              <Nav.Link as={Link} to="/contact" className="text-white nav-link-custom">Contact</Nav.Link>
            </Nav>

            {/* Right links */}
            <Nav className="gap-5">
              <Nav.Link as={Link} to="/login" className="text-white nav-link-custom">Login</Nav.Link>
              <Nav.Link as={Link} to="/testimonials" className="text-white nav-link-custom">Register</Nav.Link>
            </Nav>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navbars;