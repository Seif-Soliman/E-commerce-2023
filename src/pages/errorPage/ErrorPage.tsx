import Lottie from "lottie-react";
import error from "../../assets/404ErrorPageAnimation.json";
import { Container, Row, Col } from "react-bootstrap";

const ErrorPage = () => {
  return (
    <Container fluid className="h-100">
      <Row className="h-100 justify-content-center align-items-center">
        <Col xl={12} md={6}>
          <Lottie loop={true} autoPlay={true} animationData={error} />
        </Col>
      </Row>
    </Container>
  );
};

export default ErrorPage;