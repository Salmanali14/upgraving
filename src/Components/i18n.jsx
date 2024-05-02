// i18n.js

import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import english from "./Language/english.json";
import japanese from "./Language/japanese.json";
import france from "./Language/france.json";
import esanpol from "./Language/esanpol.json";
import german from "./Language/german.json";
import urdu from "./Language/urdu.json";
import thai from "./Language/thai.json";
import italian from "./Language/italian.json";
import arabic from "./Language/arabic.json";

const languageLocalStorage = localStorage.getItem("lng") || "english";

i18next
  .use(initReactI18next)
  .init({
    resources: {
      english: {
        translation: english,
      },
      japanese: {
        translation: japanese,
      },
      france: {
        translation: france,
      },
      esanpol: {
        translation: esanpol,
      },
      german: {
        translation: german,
      },
      urdu: {
        translation: urdu,
      },
      arabic: {
        translation: arabic,
      },
      italian: {
        translation: italian,
      },
      thai: {
        translation: thai,
      },
    },
    lng: languageLocalStorage,
    fallbackLng: "english", // fallback language if the detected language file is missing
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18next;
