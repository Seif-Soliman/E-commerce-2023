import { Link } from "react-router-dom";
import styles from "./Link.module.css";
import { useEffect } from "react";
import i18n from "../../i18n";
import { useTranslation } from "react-i18next";

export function SignupLink() {
  useEffect(() => {
    i18n.changeLanguage("en");
  }, []);

  const { t } = useTranslation();
  return (
    <Link to="/signup" className={styles.link}>
      <span className={styles.text}>{t("Sign Up")}</span>
    </Link>
  );
}
