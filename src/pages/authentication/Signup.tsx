import { useState, FormEvent, ChangeEvent, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useAppDispatch } from "../../store/hooks";
import { signUp } from "../../store/authenticate/thunks";
import i18n from "../../i18n";
import { useTranslation } from "react-i18next";

function Signup() {
  const dispatch = useAppDispatch();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    userName: "",
    mobile: "",
  });

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    dispatch(signUp(formData))
      .then(() => {
        setFormData({
          email: "",
          password: "",
          userName: "",
          mobile: "",
        });
      })
      .catch((error) => console.error(error));
  }

  function handleChange(e: ChangeEvent) {
    const target = e.target as HTMLInputElement;
    setFormData({ ...formData, [target.name]: target.value });
  }

  useEffect(() => {
    const currentLanguage = i18n.language;
    if (currentLanguage === "ar") {
      document.body.dir = "rtl";
    } else {
      document.body.dir = "ltr";
    }
  }, []);

  const { t } = useTranslation();

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
          <Form onSubmit={(e) => handleSubmit(e)}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>{t("Email address")}</Form.Label>
              <Form.Control
                type="email"
                placeholder={t("Enter email")}
                value={formData.email}
                name="email"
                onChange={(e) => handleChange(e)}
              />
              <Form.Text className="text-muted">
                {t("We'll never share your email with anyone else.")}
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>{t("Password")}</Form.Label>
              <Form.Control
                type="password"
                placeholder={t("Enter Password")}
                value={formData.password}
                name="password"
                onChange={(e) => handleChange(e)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>{t("Name")}</Form.Label>
              <Form.Control
                type="text"
                placeholder={t("Enter name")}
                value={formData.userName}
                name="userName"
                onChange={(e) => handleChange(e)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicMobile">
              <Form.Label>{t("Mobile")}</Form.Label>
              <Form.Control
                type="text"
                placeholder={t("Enter mobile")}
                value={formData.mobile}
                name="mobile"
                onChange={(e) => handleChange(e)}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              {t("Sign Up")}
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default Signup;
