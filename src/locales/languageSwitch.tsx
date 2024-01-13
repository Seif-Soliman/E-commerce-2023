import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import Flags from "react-flags-select";

const LanguageSwitch = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  useEffect(() => {
    const currentLanguage = i18n.language;
    if (currentLanguage === "sa") {
      document.body.dir = "rtl";
    } else {
      document.body.dir = "ltr";
    }
  }, [i18n.language]);

  return (
    <Flags
      countries={["US", "SA"]}
      customLabels={{ US: "English", SA: "العربية" }}
      onSelect={(code) => changeLanguage(code.toLowerCase())}
      selected={i18n.language.toUpperCase()}
      className="flag-select"
      placeholder="Select Language"
    />
  );
};

export default LanguageSwitch;
