import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";

function MyNavbar() {
  return (
    <Navbar bg="light" expand="md">
      <Container>
        <Navbar.Brand>
          <img className="logo" src="https://res.cloudinary.com/dnh89xvo5/image/upload/v1673958687/p3_challenge_1/Hackshoes-removebg-preview_v15sdm.png" alt="" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Link to="/" className="nav-link">
              Home
            </Link>
            <Link to="/allProducts" className="nav-link">
              All Product
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MyNavbar;
