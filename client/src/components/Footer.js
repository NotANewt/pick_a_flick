import { Card, Container, Button, ButtonGroup, Row, Col, Stack, Form, Badge, ListGroup } from "react-bootstrap";

function Footer() {
  return (
    <>
      <footer className="text-center text-lg-start bg-dark">
        <ul className="d-flex justify-content-center py-2">
          <li>
            <a href="https://github.com/NotANewt" target="_blank" className="btn btn-primary btn-md btn-floating mx-2 btn-social">
              <i className="fab fa-github"></i>
            </a>
          </li>

          <li>
            <a href="https://www.linkedin.com/in/meegan-anderson-753634112/" target="_blank" className="btn btn-primary btn-md btn-floating mx-2 btn-social">
              <i className="fab fa-linkedin"></i>
            </a>
          </li>
        </ul>

        <div className="text-center text-white pb-2 text-copyright">&copy; 2022 Made with 💙 and the MERN stack by Meegan </div>
      </footer>
    </>
  );
}

export default Footer;
