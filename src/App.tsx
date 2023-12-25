import styles from "./App.module.css";
import Footer from "./components/Layout/Footer/Footer";
import NavBar from "./components/Layout/NavBar/NavBar";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <main className="page">
      <NavBar />
      <div className={styles.app}>
        <Outlet />
      </div>
      <Footer />
    </main>
  );
}

export default App;
