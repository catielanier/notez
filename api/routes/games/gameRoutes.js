import express from "express";
import * as userServices from "../users/userServices.js";
import * as tokenService from "../../utils/tokenService.js";
import * as gameServices from "./gameServices.js";

const router = express.Router();

router.route("/new").post(async (req, res) => {
	// Grab the token, user id, and game from frontend.
	const {token, user: id, game} = req.body;
	try {
		// Check if the login is valid
		const loggedIn = await tokenService.verifyToken(token);
		if (!loggedIn) {
			res.status(503).send("You are not logged in.");
		}
		// Query the user and check for admin privileges.
		const user = await userServices.getUserById(id);
		if (user.role !== "Admin") {
			res.status(503).send("Only admins can create games.");
		}
		// Create new game.
		const newGame = await gameServices.createGame(game);
		res.status(201).json({
			data: newGame,
		});
	} catch (e) {
		res.status(401).send(e);
	}
});

router.route("/").get(async (_, res) => {
	try {
		const games = await gameServices.getAllGames();
		if (games) {
			res.status(200).json({
				data: games,
			});
		}
	} catch (e) {
		res.status(201).send(e);
	}
});

router.route("/:id").get(async (req, res) => {
});

router.route("/:id").put(async (req, res) => {
});

router.route("/:id/character").put(async (req, res) => {
	// Grab the token, user id, and game from frontend.
	const {token, user: id, characters, game} = req.body;
	try {
		// Check if the login is valid
		const loggedIn = await tokenService.verifyToken(token);
		if (!loggedIn) {
			res.status(503).send("You are not logged in.");
		}
		// Query the user and check for admin privileges.
		const user = await userServices.getUserById(id);
		if (user.role !== "Admin") {
			res.status(503).send("Only admins can link characters to games.");
		}
		// Take the game and characters to update the character array on the document
		const update = await gameServices.linkCharacters(game, characters);
		if (update) {
			res.status(201).json({
				data: update,
			});
		}
	} catch (e) {
		res.status(401).send(e);
	}
});

router.route("/:id/filter").put(async (req, res) => {
	// Grab the token, user id, and game from frontend.
	const {token, user: id, filters, game} = req.body;
	try {
		// Check if the login is valid
		const loggedIn = await tokenService.verifyToken(token);
		if (!loggedIn) {
			res.status(503).send("You are not logged in.");
		}
		// Query the user and check for admin privileges.
		const user = await userServices.getUserById(id);
		if (user.role !== "Admin") {
			res.status(503).send("Only admins can link filters to games.");
		}
		// Take the game and characters to update the character array on the document
		const update = await gameServices.linkFilters(game, filters);
		if (update) {
			res.status(201).json({
				data: update,
			});
		}
	} catch (e) {
		res.status(401).send(e);
	}
});

router.route("/").put(async (req, res) => {
	const {user: id, token, game, name} = req.body.data;

	const loggedIn = await tokenService.verifyToken(token);
	if (!loggedIn) {
		res.status(503).send("You are not logged in.");
	}
	// Query the user and check for admin privileges.
	const user = await userServices.getUserById(id);
	if (user.role !== "Admin") {
		res.status(503).send("Only admins can create characters.");
	}

	const result = await gameServices.updateGame(game, name);

	res.status(201).json({
		data: result,
	});
});

export {router};
