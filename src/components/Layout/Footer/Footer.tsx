import { Container, Row, Col, Button } from "react-bootstrap";
import {
  FaFacebookF,
  FaTwitter,
  FaGoogle,
  FaInstagram,
  FaLinkedin,
  FaGem,
} from "react-icons/fa";
import style from "./Footer.module.css";
import { useEffect } from "react";
import i18n from "../../../locales/i18n";
import { useTranslation } from "react-i18next";

const Footer = () => {
  useEffect(() => {
    const currentLanguage = i18n.language;
    if (currentLanguage === "sa") {
      document.body.dir = "rtl";
    } else {
      document.body.dir = "ltr";
    }
  }, []);

  const { t } = useTranslation();

  return (
    <footer className="bg-light text-center text-lg-start text-muted mt-auto mb-0">
      <section
        className={`${style.section_style} d-flex justify-content-center justify-content-lg-between p-2 border-bottom`}
      ></section>

      <section>
        <Container className="text-center text-md-start mt-5">
          <Row className="mt-3">
            <Col
              md="6"
              className="mb-4 d-flex flex-column justify-content-start"
            >
              <h6 className="text-uppercase fw-bold mb-4">
                <FaGem className="me-3" color="secondary" />
                Seif Store
              </h6>
              <p className={style.footer_text}>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Lorem
                ipsum dolor sit amet, consectetur adipisicing elit.
              </p>
            </Col>
            <Col
              md="6"
              className="mb-4 d-flex flex-column justify-content-start align-items-end"
            >
              <span>
                <h5>{t("Get connected with us on social networks")}</h5>
              </span>
              <div className="d-flex flex-row">
                <Button
                  href="/"
                  variant="outline-light"
                  className="mb-2 text-reset"
                >
                  <FaFacebookF />
                </Button>
                <Button
                  href="/"
                  variant="outline-light"
                  className="mb-2 text-reset"
                >
                  <FaTwitter />
                </Button>
                <Button
                  href="/"
                  variant="outline-light"
                  className="mb-2 text-reset"
                >
                  <FaGoogle />
                </Button>
                <Button
                  href="/"
                  variant="outline-light"
                  className="mb-2 text-reset"
                >
                  <FaInstagram />
                </Button>
                <Button
                  href="/"
                  variant="outline-light"
                  className="mb-2 text-reset"
                >
                  <FaLinkedin />
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <div
        className="text-center p-4"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
      >
        &copy; Copyright {new Date().getFullYear()}
      </div>
    </footer>
  );
};
export default Footer;
