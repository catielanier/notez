import bodyParser from "body-parser";
import cors from "cors";
import i18next from "i18next";
import Backend from "i18next-node-fs-backend";
import i18nextMiddleware from "i18next-express-middleware";

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

i18next
	.use(Backend)
	.use(i18nextMiddleware.LanguageDetector)
	.init({
		backend: {
			loadPath: `${__dirname}/locales/{{lng}}/{{ns}}.json`,
		},
		fallbackLng: "en",
		preload: ["en", "es", "fr", "ja", "ko", "zh", "zh-CN", "pt", "ru", "it"],
	});

const corsOptions = {
	origin: [
		"https://checkthenotez.com",
		"https://www.checkthenotez.com",
		"http://localhost:3000",
	],
};

export const handleBodyRequestParsing = (router) => {
	router.use(bodyParser.urlencoded({extended: true}));
	router.use(bodyParser.json());
	router.use(cors(corsOptions));
};

export const i18n = (router) => {
	router.use(i18nextMiddleware.handle(i18next));
};
