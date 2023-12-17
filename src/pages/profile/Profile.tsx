import React from "react";
import {
  Container,
  Row,
  Col,
  //   Breadcrumb,
  Card,
  Button,
  ListGroup,
  //   ProgressBar,
} from "react-bootstrap";

interface ProfilePageProps {}

const Profile: React.FC<ProfilePageProps> = () => {
  return (
    <section style={{ minHeight: "100vh", backgroundColor: "#eee" }}>
      <Container className="py-5">
        {/* <Row>
          <Col>
            <Breadcrumb className="bg-light rounded-3 p-3 mb-4">
              <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
              <Breadcrumb.Item href="#">User</Breadcrumb.Item>
              <Breadcrumb.Item active>User Profile</Breadcrumb.Item>
            </Breadcrumb>
          </Col>
        </Row> */}

        <Row>
          <Col lg="4">
            <Card className="mb-4">
              <Card.Body className="text-center">
                <Card.Img
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                  alt="avatar"
                  className="rounded-circle"
                  style={{ width: "150px" }}
                  //   fluid
                />
                <p className="text-muted mb-1">Full Stack Developer</p>
                <p className="text-muted mb-4">Bay Area, San Francisco, CA</p>
                <div className="d-flex justify-content-center mb-2">
                  <Button>Follow</Button>
                  <Button variant="outline" className="ms-1">
                    Message
                  </Button>
                </div>
              </Card.Body>
            </Card>

            <Card className="mb-4 mb-lg-0">
              <Card.Body className="p-0">
                <ListGroup
                  // flush
                  className="rounded-3"
                >
                  ListGroupItems here
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>

          <Col lg="8">
            <Card className="mb-4">
              <Card.Body>Profile information rows here</Card.Body>
            </Card>

            <Row>
              <Col md="6">
                <Card className="mb-4 mb-md-0">
                  <Card.Body>
                    Project Status cards and progress bars here
                  </Card.Body>
                </Card>
              </Col>

              <Col md="6">
                <Card className="mb-4 mb-md-0">
                  <Card.Body>
                    Project Status cards and progress bars here
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Profile;
