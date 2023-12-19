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
import { useEffect } from "react";
import i18n from "../../../i18n";
import { useTranslation } from "react-i18next";

function NavBar() {
  const name = useAppSelector((state) => state.auth.currentUser?.user);
  const loggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  const userName = loggedIn ? name.userName : null;
  const greetingMessage = userName ? `Hello, ${userName}` : "Please Sign in";

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
    <Navbar bg="dark" data-bs-theme="dark" sticky="top">
      <Container>
        <Navbar.Brand href="#home">Seif Store</Navbar.Brand>
        <Nav className="d-flex justify-content-between align-items-center  w-100">
          <div>
            <Link to="/" className="p-3">
              {t("Home")}
            </Link>
            <Link to="/products" className="p-3">
              {t("Products")}
            </Link>
            <Link to="/categories" className="p-3">
              {t("Category")}
            </Link>
            <Link to="/profile" className="p-3">
              {t("Profile")}
            </Link>
          </div>
          <div className="ms-right p-3" style={{ color: "white" }}>
            {greetingMessage}
          </div>
          <div className="ms-right p-3 d-flex">
            <SignupLink />
            <SigninLink />
            <Signout />
          </div>
          <div className="ms-right p-3">
            <CartLink />
          </div>
          <LanguageSwitch />
        </Nav>
      </Container>
    </Navbar>
  );
}

export default NavBar;
