import { Container, Row, Col, Card, ListGroup } from "react-bootstrap";
import { useAppSelector } from "../../store/hooks";
import { useEffect } from "react";
import i18n from "../../i18n";
import { useTranslation } from "react-i18next";
import { Link, Outlet } from "react-router-dom";

const Profile = () => {
  const currentUser = useAppSelector((state) => state.auth.currentUser);

  const userDetails = currentUser?.user;
  const name = userDetails ? userDetails.userName : "";
  const loggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  const userName = loggedIn ? name : null;
  const greetingMessage = userName ? `Hello, ${userName}` : "Please Sign in";

  useEffect(() => {
    i18n.changeLanguage("en");
  }, []);

  const { t } = useTranslation();

  return (
    <section style={{ minHeight: "100vh", backgroundColor: "#eee" }}>
      <Container className="py-5">
        <Row>
          <Col lg="4">
            <Card className="mb-4">
              <Card.Body className="text-center">
                <Card.Img
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                  alt="avatar"
                  className="rounded-circle"
                  style={{ width: "150px" }}
                />
                <p className="text-muted mb-1">{greetingMessage}</p>
              </Card.Body>
            </Card>

            <Card className="mb-4 mb-lg-0">
              <Card.Body className="p-0">
                <ListGroup className="rounded-3">{t("Main Menu")}</ListGroup>
                <ListGroup className="rounded-3">
                  <Link to="/profile/user-information" className="p-3">
                    {t("User Information")}
                  </Link>
                </ListGroup>
                <ListGroup className="rounded-3">
                  <Link to="/profile/order-history" className="p-3">
                    {t("Orders")}
                  </Link>
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>

          <Col lg="8">
            <Outlet />
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Profile;
