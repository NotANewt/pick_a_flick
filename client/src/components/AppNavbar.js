import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Container, Modal, Tab } from "react-bootstrap";

import Auth from "../utils/auth";

const AppNavbar = () => {
  // set modal display state
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container fluid>
          <Navbar.Brand as={Link} to="/">
            Pick A Flick
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbar" />
          <Navbar.Collapse id="navbar">
            <Nav className="ml-auto">
              {/* if user is logged in show profile and logout */}
              {Auth.loggedIn() ? (
                <>
                  <Link className="nav-link" to="/Profile">
                    Profile
                  </Link>
                  <Link className="nav-link" to="/Dealbreakers">
                    Search Dealbreakers
                  </Link>
                  <Link className="nav-link" to="/Movies">
                    Search Movies
                  </Link>
                  <Nav.Link onClick={Auth.logout}>Logout</Nav.Link>
                </>
              ) : (
                // otherwise, show login/signup
                <Link className="nav-link" to="/LoginSignup">
                  Login/Sign Up
                </Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default AppNavbar;
