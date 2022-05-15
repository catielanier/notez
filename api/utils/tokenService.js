const jwt = require("jsonwebtoken");
const { SECRET } = require("./constants");

exports.issueToken = async (userData) => {
	const { _id: id, role } = userData;

	const payload = {
		user: {
			id,
			role,
		},
	};
	return jwt.sign(payload, SECRET);
};

exports.verifyToken = async (token) => {
	return jwt.verify(token, SECRET);
};

exports.decodeToken = async (token) => {
	return jwt.decode(token);
};
