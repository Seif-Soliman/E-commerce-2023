import { useEffect } from "react";
import { signOut } from "../../store/authenticate/thunks";
import { useAppDispatch } from "../../store/hooks";
import styles from "./Link.module.css";
import i18n from "../../i18n";
import { useTranslation } from "react-i18next";

const Signout = () => {
  const dispatch = useAppDispatch();

  const handleSignout = () => {
    dispatch(signOut());
  };

  useEffect(() => {
    const currentLanguage = i18n.language;
    if (currentLanguage === "ar") {
      document.body.dir = "rtl";
    } else {
      document.body.dir = "ltr";
    }
  }, []);

  const { t } = useTranslation();

  return (
    <div className={styles.link}>
      <span className={styles.text}>
        <button onClick={handleSignout} className={styles.button}>
          {t("Sign Out")}
        </button>
      </span>
    </div>
  );
};

export default Signout;
