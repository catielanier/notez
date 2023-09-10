const bodyParser = require("body-parser");
const cors = require("cors");
const i18next = require("i18next");
const Backend = require("i18next-node-fs-backend");
const i18nextMiddleware = require("i18next-express-middleware");

i18next
	.use(Backend)
	.use(i18nextMiddleware.LanguageDetector)
	.init({
		backend: {
			loadPath: __dirname + "/locales/{{lng}}/{{ns}}.json",
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

exports.handleBodyRequestParsing = (router) => {
	router.use(bodyParser.urlencoded({ extended: true }));
	router.use(bodyParser.json());
	router.use(cors(corsOptions));
};

exports.i18n = (router) => {
	router.use(i18nextMiddleware.handle(i18next));
};
