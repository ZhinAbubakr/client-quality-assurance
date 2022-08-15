import i18n from "i18next";
import { initReactI18next } from "react-i18next";
// import LanguageDetector from 'i18next-browser-languagedetector'
import eng from "./Translation/eng.json";
import krd from "./Translation/krd.json";

const resources = {
  eng: {
    translation: eng,
  },
  krd: {
    translation: krd,
  },
};
i18n.use(initReactI18next).init({
  resources,
  fallbackLng: "eng",
  lng: "eng",
  debug: false,
  interpolation: {
    escapeValue: false,
  },
});
export default i18n;
