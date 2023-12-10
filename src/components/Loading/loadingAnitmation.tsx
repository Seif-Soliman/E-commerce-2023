import Lottie from "lottie-react";
import loading from "../../assets/LoadingAnimation.json";
import { Container, Row, Col } from "react-bootstrap";

const LoadingAnimation = () => {
  return (
    <Container fluid className="h-100">
      <Row className="h-100 justify-content-center align-items-center">
        <Col xl={12} md={6}>
          <Lottie loop={true} autoPlay={true} animationData={loading} />
        </Col>
      </Row>
    </Container>
  );
};

export default LoadingAnimation;
