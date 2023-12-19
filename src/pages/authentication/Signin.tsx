import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useAppDispatch } from "../../store/hooks";
import { signIn } from "../../store/authenticate/thunks";
import i18n from "../../i18n";
import { useTranslation } from "react-i18next";

const Signin = () => {
  const dispatch = useAppDispatch();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    dispatch(signIn(formData))
      .then(() => {
        setFormData({
          email: "",
          password: "",
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
              <Form.Label>{t("Enter Email address")}</Form.Label>
              <Form.Control
                type="email"
                placeholder={t("Enter email")}
                value={formData.email}
                name="email"
                onChange={(e) => handleChange(e)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>{t("Enter Password")}</Form.Label>
              <Form.Control
                type="password"
                placeholder={t("Enter Password")}
                value={formData.password}
                name="password"
                onChange={(e) => handleChange(e)}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              {t("Sign In")}
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Signin;

// <div>
//   <h1>Login</h1>
//   <form className="login-form" onSubmit={(e) => handleSubmit(e)}>
//     <input
//       type="text"
//       placeholder="Email"
//       value={formData.email}
//       name="email"
//       onChange={(e) => handleChange(e)}
//     ></input>
//     <input
//       type="text"
//       placeholder="Password"
//       value={formData.password}
//       name="password"
//       onChange={(e) => handleChange(e)}
//     ></input>
//     <button className="login-btn" type="submit">
//       Login
//     </button>
//   </form>
// </div>
