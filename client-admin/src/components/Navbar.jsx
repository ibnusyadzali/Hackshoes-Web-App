import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from "react-router-dom";
import {useNavigate} from "react-router-dom"
import {useDispatch} from "react-redux"
import { logoutAction } from '../stores/actionCreator';

function MyNavbar() {
const moveTo = useNavigate()
const dispatcher = useDispatch()
const Logout = (event) => {
    event.preventDefault()
    dispatcher(logoutAction())
    moveTo('/')
  }
  return (
    <Navbar bg="light" expand="md">
      <Container>
        <Navbar.Brand><img className="logo" src="https://res.cloudinary.com/dnh89xvo5/image/upload/v1673958687/p3_challenge_1/Hackshoes-removebg-preview_v15sdm.png" alt="" /></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ms-auto">
          {localStorage.getItem('access_token')&& <Link to={"/products"} className="nav-link">Products</Link>}
          {localStorage.getItem('access_token')&& <Link to={"/categories"} className="nav-link">Categories</Link>}
          {localStorage.getItem('access_token')&& <Link onClick={Logout} className="nav-link">Log out</Link>}
          {localStorage.getItem('access_token')&& <Link to={"/register"} className="nav-link">Sign Up</Link>}
        </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MyNavbar;