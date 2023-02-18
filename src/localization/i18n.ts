import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translationEN from "./en.json";
import translationUK from "./uk.json";

const currentLanguage: null | string = localStorage.getItem("language");

i18n
  .use(initReactI18next)
  .init({
    fallbackLng: currentLanguage ?? "en",
    debug: true,
    resources: {
      en: {
        translation: translationEN,
      },
      uk: {
        translation: translationUK,
      },
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
