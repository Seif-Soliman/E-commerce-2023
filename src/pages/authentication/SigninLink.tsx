import { Link } from "react-router-dom";
import styles from "./Link.module.css";

export function SigninLink() {
  return (
    <Link to="/signin" className={styles.link}>
      <span className={styles.text}>Sign In</span>
    </Link>
  );
}
