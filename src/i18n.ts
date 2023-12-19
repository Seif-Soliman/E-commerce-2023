import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import enTranslation from "./locales/en.json"; // English translations
import arTranslation from "./locales/ar.json"; // Arabic translations

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: enTranslation,
      },
      ar: {
        translation: arTranslation,
      },
    },
    fallbackLng: "en",
    debug: true,
    detection: {
      order: ["navigator"],
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
