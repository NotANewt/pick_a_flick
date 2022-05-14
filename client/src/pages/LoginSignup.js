import SignupForm from "../components/SignupForm";
import LoginForm from "../components/LoginForm";

import { Container, Row, Col } from "react-bootstrap";

function LoginSignup(props) {
  return (
    <>
      <Container>
        <Row>
          <Col>
            <LoginForm></LoginForm>
          </Col>
          <Col>
            <SignupForm></SignupForm>
          </Col>
        </Row>
      </Container>
    </>
  );
}
export default LoginSignup;
