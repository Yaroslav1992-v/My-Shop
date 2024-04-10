import React from "react";
import { FaShoppingCart } from "react-icons/fa";
import { Container, Nav, NavDropdown, Navbar } from "react-bootstrap";
import logo from "../assets/logo.png";
import { LinkContainer } from "react-router-bootstrap";
import СartHeaderComponent from "./СartHeaderComponent";
import { useSelector } from "react-redux";
import { getUserInfo, logout } from "../store/slices/authSlice";
import { useAppDispatch } from "../store/store";
import { useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../store/slices/usersApiSlice";

const Header = () => {
  const userInfo = useSelector(getUserInfo());
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [logoutCall] = useLogoutMutation();
  const handleLogout = async () => {
    try {
      await logoutCall("s").unwrap();
      dispatch(logout());
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
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
              {userInfo ? (
                <NavDropdown title={userInfo.name} id="username">
                  <LinkContainer to={"profile"}>
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={handleLogout}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link href="/login">
                    <FaShoppingCart /> Login
                  </Nav.Link>
                </LinkContainer>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
