import { useEffect } from "react";
import { signOut } from "../../store/authenticate/thunks";
import { useAppDispatch } from "../../store/hooks";
import i18n from "../../locales/i18n";
import { useTranslation } from "react-i18next";
import { Button } from "react-bootstrap";

const Signout = () => {
  const dispatch = useAppDispatch();

  const handleSignout = () => {
    dispatch(signOut());
  };

  useEffect(() => {
    const currentLanguage = i18n.language;
    if (currentLanguage === "sa") {
      document.body.dir = "rtl";
    } else {
      document.body.dir = "ltr";
    }
  }, []);

  const { t } = useTranslation();

  return (
    <div>
      <Button onClick={handleSignout} variant="secondary">
        {t("Sign Out")}
      </Button>
    </div>
  );
};

export default Signout;
