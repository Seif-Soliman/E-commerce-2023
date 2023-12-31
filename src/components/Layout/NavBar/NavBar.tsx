import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import { CartLink } from "../../../pages/cart/CartLink";

function NavBar() {
  return (
    <Navbar bg="dark" data-bs-theme="dark" sticky="top">
      <Container>
        <Navbar.Brand href="#home">Seif Store</Navbar.Brand>
        <Nav className="me-auto">
          <Link to="/" className="p-3">
            Home
          </Link>
          <Link to="/products" className="p-3">
            Products
          </Link>
          <Link to="/categories" className="p-3">
            Category
          </Link>
          <div className="ms-right p-3">
            <CartLink />
          </div>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default NavBar;
