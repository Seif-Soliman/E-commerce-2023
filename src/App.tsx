import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Products } from "./pages/product/Products";
import styles from "./App.module.css";
import { Cart } from "./pages/cart/Cart";
import { FilteredProducts } from "./pages/filterProduct/FilteredProducts";
import Category from "./pages/category/Category";
import NavBar from "./components/Layout/NavBar/NavBar";

function App() {
  return (
    <Router>
      <div className={styles.app}>
        <NavBar />
      </div>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/products">
          <Products />
        </Route>
        <Route path="/categories">
          <Category />
        </Route>
        <Route path="/cart">
          <Cart />
        </Route>
        <Route path="/filteredproducts">
          <FilteredProducts />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;

function Home() {
  return (
    <main className="page">
      <h1>Seif Clothes Store</h1>
    </main>
  );
}
