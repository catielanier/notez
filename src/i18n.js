import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
	.use(Backend)
	.use(LanguageDetector)
	.use(initReactI18next)
	.init({
		fallbackLng: "en",
		// turn off debug in prod
		debug: import.meta.env.VITE_REACT_APP_NOTEZ_ENV !== "production",
		interpolation: {
			escapeValue: false,
		},
	});

export default i18n;
