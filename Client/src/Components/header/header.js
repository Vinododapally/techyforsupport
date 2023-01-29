import React from "react";
import "../../Styles/header.css"
import Img from "./group.jpg";
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {NavDropdown} from 'react-bootstrap';
import ImageShadow from 'react-image-shadow';
function Header() {
    const navigate = useNavigate();
    const logout = () => {
        localStorage.clear();
        navigate('/')
        window.location.reload();
    }

    return (
        <div className="header">
<Navbar collapseOnSelect expand="lg"  bg="primary" variant="dark">
      <Container>
      <ImageShadow  src={Img}  height={30} width= {50}/>&nbsp;
        <Navbar.Brand href="#home">Techy Team</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
          <Nav.Link href="/dashboard">Dashboard</Nav.Link>
            <Nav.Link href="/services">Services</Nav.Link>
            <Nav.Link href="/projects">Projects</Nav.Link>
            <NavDropdown title="Features" id="collasible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
            <Nav.Link eventKey={2} onClick={logout}>
              Logout
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
        </div>
    );

}

export default Header;