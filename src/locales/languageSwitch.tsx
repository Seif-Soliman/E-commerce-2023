import { useTranslation } from "react-i18next";

const LanguageSwitch = () => {
  const { i18n } = useTranslation();

  const switchLanguage = (lng: string | undefined) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div>
      <button onClick={() => switchLanguage("en")}>English</button>
      <button onClick={() => switchLanguage("ar")}>Arabic</button>
    </div>
  );
};

export default LanguageSwitch;
