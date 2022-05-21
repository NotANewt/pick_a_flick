import { Link } from "react-router-dom";
import { Container, Col, Row, Form, Button, Card } from "react-bootstrap";

import Auth from "../utils/auth";

function Home(props) {
  return (
    <>
      <Container>
        <h1>Welcome to Pick A Flick!</h1>
        {Auth.loggedIn() ? (
          <Card>
            <Card.Body>
              <div className="d-grid gap-2">
                <Button variant="outline-primary" href="/Profile">
                  Check out your Profile
                </Button>
                <Button variant="outline-primary" href="/Dealbreakers">
                  Search for Dealbreakers to add them to your Profile
                </Button>
                <Button variant="outline-primary" href="/Movies">
                  Search for Movies to add them to your Profile
                </Button>
              </div>
            </Card.Body>
          </Card>
        ) : (
          <Card>
            <Card.Body>
              <Card.Text>Log in or sign up to get started.</Card.Text>
              <Button variant="outline-primary" href="/LoginSignup">
                Login or Signup
              </Button>
            </Card.Body>
          </Card>
        )}
      </Container>
    </>
  );
}
export default Home;
