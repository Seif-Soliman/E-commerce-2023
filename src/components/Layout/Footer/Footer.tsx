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
    <footer className="bg-light text-center text-lg-start text-muted mt-auto">
      <section
        className={`${style.section_style} d-flex justify-content-center justify-content-lg-between p-2 border-bottom`}
      >
        <div className="me-5 d-none d-lg-block">
          <span>
            <h5>{t("Get connected with us on social networks")}</h5>
          </span>
        </div>

        <div>
          <Button href="/" variant="outline-light" className="me-4 text-reset">
            <FaFacebookF />
          </Button>
          <Button href="/" variant="outline-light" className="me-4 text-reset">
            <FaTwitter />
          </Button>
          <Button href="/" variant="outline-light" className="me-4 text-reset">
            <FaGoogle />
          </Button>
          <Button href="/" variant="outline-light" className="me-4 text-reset">
            <FaInstagram />
          </Button>
          <Button href="/" variant="outline-light" className="me-4 text-reset">
            <FaLinkedin />
          </Button>
          <Button href="/" variant="outline-light" className="me-4 text-reset">
            <FaGithub />
          </Button>
        </div>
      </section>

      <section>
        <Container className="text-center text-md-start mt-5">
          <Row className="mt-3">
            <Col md="3" lg="4" xl="3" className="mb-4">
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
        &copy; Copyright {new Date().getFullYear()}
      </div>
    </footer>
  );
};
export default Footer;
