import { Link } from "react-router-dom";
import { getMemoizedNumItems } from "../../store/cart/cartSlice";
import { useAppSelector } from "../../store/hooks";
import styles from "./CartLink.module.css";
import { useEffect } from "react";
import i18n from "../../locales/i18n";
import { useTranslation } from "react-i18next";

export function CartLink() {
  useEffect(() => {
    i18n.changeLanguage("en");
  }, []);

  const { t } = useTranslation();
  const numItems = useAppSelector(getMemoizedNumItems);
  return (
    <Link to="/cart" className={styles.link}>
      <span className={styles.text}>🛒&nbsp;&nbsp;{numItems || t("Cart")}</span>
    </Link>
  );
}
