import { Link } from "react-router-dom";
import { getMemoizedNumItems } from "../../store/cart/cartSlice";
import { useAppSelector } from "../../store/hooks";
import styles from "./CartLink.module.css";

export function CartLink() {
  const numItems = useAppSelector(getMemoizedNumItems);
  return (
    <Link to="/cart" className={styles.link}>
      <span className={styles.text}>🛒&nbsp;&nbsp;{numItems || "Cart"}</span>
    </Link>
  );
}
