import { Link } from "react-router-dom";
import { getMemoizedNumItems } from "../../store/cart/cartSlice";
import { useAppSelector } from "../../store/hooks";
import { useEffect } from "react";
import i18n from "../../locales/i18n";
import { useTranslation } from "react-i18next";
import { Button } from "react-bootstrap";
import style from "./CartLink.module.css";

export function CartLink() {
  useEffect(() => {
    i18n.changeLanguage("en");
  }, []);

  const { t } = useTranslation();
  const numItems = useAppSelector(getMemoizedNumItems);
  return (
    <Button variant="outline-light">
      <Link to="/cart" className={style.button_link}>
        🛒&nbsp;&nbsp;{numItems || t("Cart")}
      </Link>
    </Button>
  );
}
