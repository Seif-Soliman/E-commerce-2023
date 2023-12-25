import { Container, Row, Col, Button } from "react-bootstrap";
import {
  FaFacebookF,
  FaTwitter,
  FaGoogle,
  FaInstagram,
  FaLinkedin,
  FaGithub,
  FaGem,
} from "react-icons/fa";

export default function App() {
  const footerStyle = {
    borderTop: "5px solid",
    background: "linear-gradient(to right, #ff8a00, #e52e71)",
    borderColor: "transparent",
  };

  return (
    <footer className="bg-light text-center text-lg-start text-muted">
      <section
        style={footerStyle}
        className="d-flex justify-content-center justify-content-lg-between p-2 border-bottom"
      >
        <div className="me-5 d-none d-lg-block">
          <span>
            <h5>Get connected with us on social networks</h5>
          </span>
        </div>

        <div>
          <Button href="/" variant="outline-light" className="me-4 text-reset">
            <FaFacebookF />
          </Button>
          <Button href="/" variant="outline-light" className="me-4 text-reset">
            <FaTwitter color="secondary" />
          </Button>
          <Button href="/" variant="outline-light" className="me-4 text-reset">
            <FaGoogle color="secondary" />
          </Button>
          <Button href="/" variant="outline-light" className="me-4 text-reset">
            <FaInstagram color="secondary" />
          </Button>
          <Button href="/" variant="outline-light" className="me-4 text-reset">
            <FaLinkedin color="secondary" />
          </Button>
          <Button href="/" variant="outline-light" className="me-4 text-reset">
            <FaGithub color="secondary" />
          </Button>
        </div>
      </section>

      <section>
        <Container className="text-center text-md-start mt-5">
          <Row className="mt-3">
            <Col md="3" lg="4" xl="3" className="mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">
                <FaGem className="me-3" color="secondary" />
                Seif Store
              </h6>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Lorem
                ipsum dolor sit amet, consectetur adipisicing elit.
              </p>
            </Col>
          </Row>
        </Container>
      </section>

      <div
        className="text-center p-4"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
      >
        &copy; {new Date().getFullYear()} Copyright:
      </div>
    </footer>
  );
}
