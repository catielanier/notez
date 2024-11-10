import jwt from "jsonwebtoken";
import {SECRET} from "./constants";

export const issueToken = async (userId) => {
	const payload = {
		userId,
		issuedAt: Date.now(),
		expiresAt: Date.now() + 30 * 24 * 60 * 1000,
	};
	return jwt.sign(payload, SECRET);
};

export const verifyToken = async (token) => {
	return jwt.verify(token, SECRET);
};

export const decodeToken = async (token) => {
	return jwt.decode(token, SECRET);
};
