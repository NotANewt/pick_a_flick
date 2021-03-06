import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";

import Auth from "../utils/auth";

const AppNavbar = () => {
  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/">
            Pick A Flick
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbar" />
          <Navbar.Collapse id="navbar">
            {/* if user is logged in show profile, dealbreakers, movies, and logout */}
            {Auth.loggedIn() ? (
              <>
                <Nav className="me-auto">
                  <Link className="nav-link" to="/Profile">
                    Profile
                  </Link>
                  <Link className="nav-link" to="/Dealbreakers">
                    Dealbreakers
                  </Link>
                  <Link className="nav-link" to="/Movies">
                    Movies
                  </Link>
                </Nav>
                <Nav>
                  <Nav.Link onClick={Auth.logout}>Logout</Nav.Link>
                </Nav>
              </>
            ) : (
              // otherwise, show login/signup
              <>
                <Nav className="me-auto"></Nav>
                <Nav>
                  <Link className="nav-link" to="/LoginSignup">
                    Login/Sign Up
                  </Link>
                </Nav>
              </>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default AppNavbar;
