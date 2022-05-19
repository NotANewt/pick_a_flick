import { Link } from "react-router-dom";
import { Container, Col, Row, Form, Button, Card } from "react-bootstrap";

function Home(props) {
  return (
    <>
      <Container>
        <h1>Welcome to Pick A Flick!</h1>
        <Card>
          <Card.Body>
            <Card.Text>Log in or sign up to get started.</Card.Text>
            <Link as={Link} to="/LoginSignup">
              Login or Signup
            </Link>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
}
export default Home;
