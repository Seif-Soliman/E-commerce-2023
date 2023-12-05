import styles from "./App.module.css";
import NavBar from "./components/Layout/NavBar/NavBar";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <main className="page">
      <NavBar />
      <div className={styles.app}>
        <Outlet />
      </div>
      {/* <h1>Seif Clothes Store</h1> */}
    </main>
  );
}

export default App;
