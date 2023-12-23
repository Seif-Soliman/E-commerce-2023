import { Link } from "react-router-dom";
import styles from "./Link.module.css";
import { useEffect } from "react";
import i18n from "../../locales/i18n";
import { useTranslation } from "react-i18next";

export function SigninLink() {
  useEffect(() => {
    i18n.changeLanguage("en");
  }, []);

  const { t } = useTranslation();
  return (
    <Link to="/signin" className={styles.link}>
      <span className={styles.text}>{t("Sign In")}</span>
    </Link>
  );
}
