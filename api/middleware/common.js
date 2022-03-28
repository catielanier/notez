const bodyParser = require("body-parser");
const cors = require("cors");
const i18n = require("i18next");

i18n.init((t) => {});

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
	router.use(i18n.handle);
};
