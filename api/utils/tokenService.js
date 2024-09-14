const jwt = require("jsonwebtoken");
const { SECRET } = require("./constants");

exports.issueToken = async (userId) => {
	const payload = {
		userId,
		issuedAt: Date.now(),
		expiresAt: Date.now() + 30 * 24 * 60 * 1000,
	};
	return jwt.sign(payload, SECRET);
};

exports.verifyToken = async (token) => {
	return jwt.verify(token, SECRET);
};

exports.decodeToken = async (token) => {
	return jwt.decode(token, SECRET);
};
