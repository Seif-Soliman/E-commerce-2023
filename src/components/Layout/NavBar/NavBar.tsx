import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { FaUser, FaSignInAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { CartLink } from "../../../pages/cart/CartLink";
import { useAppSelector } from "../../../store/hooks";
import LanguageSwitch from "../../../locales/languageSwitch";
import { useEffect, useState } from "react";
import i18n from "../../../locales/i18n";
import { useTranslation } from "react-i18next";
import { Button } from "react-bootstrap";
import SignInModal from "../../../pages/authentication/SignInModal";
import SignUpModal from "../../../pages/authentication/SignUpModal";
import Signout from "../../../pages/authentication/Signout";
import style from "./Nav.module.css";

function NavBar() {
  const [showSignIn, setShowSignIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);

  const handleShowSignIn = () => setShowSignIn(true);
  const handleShowSignUp = () => setShowSignUp(true);
  const closeSignInModal = () => setShowSignIn(false);

  const name = useAppSelector((state) => state.auth.currentUser?.user);
  const loggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  const userName = loggedIn ? name.userName : null;
  const greetingMessage = userName ? `Hello, ${userName}` : "Please Sign in";

  const renderAuthLinks = () => {
    if (loggedIn) {
      return <Signout />;
    } else {
      return (
        <Button variant="outline-light" onClick={handleShowSignIn}>
          <FaSignInAlt className="me-2" />
          Sign In
        </Button>
      );
    }
  };

  useEffect(() => {
    const currentLanguage = i18n.language;
    document.body.dir = currentLanguage === "sa" ? "rtl" : "ltr";
  }, []);

  const { t } = useTranslation();

  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      className={style.gradient_bg}
      variant="dark"
      sticky="top"
    >
      <Container fluid>
        <Navbar.Brand as={Link} to="/" className={style.navbar_brand}>
          <strong className="text-white">Seif Store</strong>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Link to="/products" className={style.nav_link}>
              {t("Products")}
            </Link>
            <Link to="/categories" className={style.nav_link}>
              {t("Category")}
            </Link>
            <Link to="/profile" className={style.nav_link}>
              <FaUser className="me-1" />
              {t("Profile")}
            </Link>
          </Nav>
          <Nav className="ms-auto align-items-center">
            <div className="text-white p-2">{greetingMessage}</div>
            <div className="p-2">{renderAuthLinks()}</div>
            <div className="p-2">
              <CartLink />
            </div>
            <LanguageSwitch />
          </Nav>
        </Navbar.Collapse>
      </Container>
      <SignInModal
        show={showSignIn}
        onHide={() => setShowSignIn(false)}
        showSignUp={handleShowSignUp}
        closeOtherModal={closeSignInModal}
      />
      <SignUpModal show={showSignUp} onHide={() => setShowSignUp(false)} />
    </Navbar>
  );
}

export default NavBar;
