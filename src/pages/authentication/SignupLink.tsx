import { Link } from "react-router-dom";
import styles from "./Link.module.css";

export function SignupLink() {
  return (
    <Link to="/signup" className={styles.link}>
      <span className={styles.text}>Sign Up</span>
    </Link>
  );
}
