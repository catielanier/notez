import express from "express";
import * as userServices from "../users/userServices.js";
import * as tokenService from "../../utils/tokenService.js";
import * as filterServices from "./filterServices.js";

const router = express.Router();

router.route("/new").post(async (req, res) => {
	const {t} = req;
	// Grab the token, user id, and game from frontend.
	const {token, user: id, filter} = req.body;
	try {
		// Check if the login is valid
		const loggedIn = await tokenService.verifyToken(token);
		if (!loggedIn) {
			res.status(503).send(t('errors.notLoggedIn'));
		}
		// Query the user and check for admin privileges.
		const user = await userServices.getUserById(id);
		if (user.role !== "Admin") {
			res.status(503).send(t('errors.filters.create'));
		}
		// Create new filter.
		const newFilter = await filterServices.createFilter(filter);
		res.status(201).json({
			data: newFilter,
		});
	} catch (e) {
		res.status(401).send(e);
	}
});

router.route("/game").get(async (_, res) => {
	try {
		const filters = await filterServices.getAllGameFilters();
		if (filters) {
			res.status(200).json({
				data: filters,
			});
		}
	} catch (e) {
		res.status(400).send(e);
	}
});

router.route("/player").get(async (_, res) => {
	try {
		const filters = await filterServices.getAllPlayerFilters();
		if (filters) {
			res.status(200).json({
				data: filters,
			});
		}
	} catch (e) {
		res.status(400).send(e);
	}
});

router.route("/").get(async (_, res) => {
	try {
		const filters = await filterServices.getAllFilters();
		if (filters) {
			res.status(200).json({
				data: filters,
			});
		}
	} catch (e) {
		res.status(400).send(e);
	}
});

router.route("/").put(async (req, res) => {
	const {
		user: id,
		token,
		name_ja,
		name_ko,
		name,
		name_cn,
		name_tw,
		name_hk,
		filter,
	} = req.body.data;
	const {t} = req;

	const loggedIn = await tokenService.verifyToken(token);
	if (!loggedIn) {
		res.status(503).send(t('errors.notLoggedIn'));
	}
	// Query the user and check for admin privileges.
	const user = await userServices.getUserById(id);
	if (user.role !== "Admin") {
		res.status(503).send(t('errors.filters.update'));
	}

	const result = await filterServices.updateFilter(
		filter,
		name,
		name_ja,
		name_ko,
		name_cn,
		name_tw,
		name_hk
	);

	res.status(201).json({
		data: result,
	});
});

export {router};
