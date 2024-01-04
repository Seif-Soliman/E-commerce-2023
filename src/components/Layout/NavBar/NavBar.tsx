import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { FaUser, FaSignInAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { CartLink } from "../../../pages/cart/CartLink";
import { useAppSelector } from "../../../store/hooks";
import LanguageSwitch from "../../../locales/languageSwitch";
import { ReactNode, useEffect, useState } from "react";
import i18n from "../../../locales/i18n";
import { useTranslation } from "react-i18next";
import { Button } from "react-bootstrap";
import SignInModal from "../../../pages/authentication/SignInModal";
import SignUpModal from "../../../pages/authentication/SignUpModal";
import Signout from "../../../pages/authentication/Signout";
import style from "./Nav.module.css";

interface AuthenticatedComponentProps {
  children: ReactNode;
}

function NavBar({ children }: AuthenticatedComponentProps) {
  const [showSignIn, setShowSignIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);

  const handleShowSignIn = () => setShowSignIn(true);
  const handleShowSignUp = () => setShowSignUp(true);
  const closeSignInModal = () => setShowSignIn(false);

  const loggedIn = useAppSelector((state) => state.auth.isLoggedIn);

  useEffect(() => {
    const currentLanguage = i18n.language;
    document.body.dir = currentLanguage === "sa" ? "rtl" : "ltr";
  }, []);

  const { t } = useTranslation();

  const renderAuthLinks = () => {
    if (loggedIn) {
      return <Signout />;
    } else {
      return (
        <Button variant="outline-light" onClick={handleShowSignIn}>
          <FaSignInAlt className="me-2" />
          {t("Sign In")}
        </Button>
      );
    }
  };

  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      className={`${style.gradient_bg} ${style.navbar}`}
      variant="dark"
      sticky="top"
    >
      <Container fluid>
        <Navbar.Brand as={Link} to="/" className={style.navbar_brand}>
          <strong className="text-white">Seif Store</strong>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className={i18n.language === "sa" ? "ms-auto" : "me-auto"}>
            <Link to="/products" className={style.nav_link}>
              {t("Products")}
            </Link>
            <Link to="/categories" className={style.nav_link}>
              {t("Category")}
            </Link>
            {loggedIn ? (
              <Link to="/profile" className={style.nav_link}>
                <FaUser className="me-1" />
                {t("Profile")}
              </Link>
            ) : null}
          </Nav>
          <Nav
            className={`${
              i18n.language === "sa" ? "me-auto" : "ms-auto"
            } align-items-center`}
          >
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
      {children}
    </Navbar>
  );
}

export default NavBar;
