import React from "react";
import { FaShoppingCart } from "react-icons/fa";
import { Container, Nav, Navbar } from "react-bootstrap";
import logo from "../assets/logo.png";
import { LinkContainer } from "react-router-bootstrap";
import СartHeaderComponent from "./СartHeaderComponent";
const Header = () => {
  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="md" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand href="/">
              <img src={logo} alt="logo" /> My-Shop
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navnar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <СartHeaderComponent />
              <LinkContainer to="/login">
                <Nav.Link href="/login">
                  <FaShoppingCart /> Login
                </Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
