// src/utils/httpClient.js
import axios from "axios";
import { getToken } from "../services/tokenService";
import i18n from "../i18n";

const api = axios.create({
	baseURL: process.env.REACT_APP_API_URL,
});

api.interceptors.request.use((config) => {
	const token = getToken();
	if (token) config.headers.Authorization = `Bearer ${token}`;
	config.headers["Accept-Language"] = i18n.language;
	return config;
});

api.interceptors.response.use(
	(response) => response,
	(err) => {
		// err.response.data is already your translated string from `res.status(...).send(t(...))`
		const message = err.response?.data ?? err.message;
		// reject WITH the string, not an Error object
		return Promise.reject(message);
	},
);

export default api;
