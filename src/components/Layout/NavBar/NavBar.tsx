import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import { CartLink } from "../../../pages/cart/CartLink";
import { SignupLink } from "../../../pages/authentication/SignupLink";
import { SigninLink } from "../../../pages/authentication/SigninLink";
import Signout from "../../../pages/authentication/Signout";
import { useAppSelector } from "../../../store/hooks";
import LanguageSwitch from "../../../locales/languageSwitch";
import React, { useEffect } from "react";
import i18n from "../../../locales/i18n";
import { useTranslation } from "react-i18next";

function NavBar() {
  const name = useAppSelector((state) => state.auth.currentUser?.user);
  const loggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  const userName = loggedIn ? name.userName : null;
  const greetingMessage = userName ? `Hello, ${userName}` : "Please Sign in";

  const renderAuthLinks = () => {
    if (loggedIn) {
      return <Signout />;
    } else {
      return (
        <React.Fragment>
          <SignupLink />
          <SigninLink />
        </React.Fragment>
      );
    }
  };

  useEffect(() => {
    const currentLanguage = i18n.language;
    document.body.dir = currentLanguage === "sa" ? "rtl" : "ltr";
  }, []);

  const { t } = useTranslation();

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" sticky="top">
      <Container fluid>
        <Navbar.Brand as={Link} to="/">
          Seif Store
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Link to="/" className="nav-link">
              {t("Home")}
            </Link>
            <Link to="/products" className="nav-link">
              {t("Products")}
            </Link>
            <Link to="/categories" className="nav-link">
              {t("Category")}
            </Link>
            <Link to="/profile" className="nav-link">
              {t("Profile")}
            </Link>
          </Nav>
          <Nav className="ms-auto align-items-center">
            <div className="text-white p-3">{greetingMessage}</div>
            <div className="p-3">{renderAuthLinks()}</div>
            <div className="p-3">
              <CartLink />
            </div>
            <LanguageSwitch />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
