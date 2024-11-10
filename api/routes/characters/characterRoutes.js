import express from "express";

const router = express.Router();
import * as userServices from "../users/userServices";
import * as tokenService from "../../utils/tokenService";
import * as characterServices from "./characterServices";

router.route("/new").post(async (req, res) => {
	// Grab the token, user id, and game from frontend.
	const {token, user: id, character} = req.body;
	try {
		// Check if the login is valid
		const loggedIn = await tokenService.verifyToken(token);
		if (!loggedIn) {
			res.status(503).send("You are not logged in.");
		}
		// Query the user and check for admin privileges.
		const user = await userServices.getUserById(id);
		if (user.role !== "Admin") {
			res.status(503).send("Only admins can create characters.");
		}
		// Create new game.
		const newCharacter = await characterServices.createCharacter(character);
		res.status(201).json({
			data: newCharacter,
		});
	} catch (e) {
		res.status(401).send(e);
	}
});

router.route("/").get(async (_, res) => {
	try {
		const characters = await characterServices.getAllCharacters();
		if (characters) {
			res.status(200).json({
				data: characters,
			});
		}
	} catch (e) {
		res.status(201).send(e);
	}
});

router.route("/").put(async (req, res) => {
	const {user: id, token, name, company, character} = req.body.data;

	const loggedIn = await tokenService.verifyToken(token);
	if (!loggedIn) {
		res.status(503).send("You are not logged in.");
	}
	// Query the user and check for admin privileges.
	const user = await userServices.getUserById(id);
	if (user.role !== "Admin") {
		res.status(503).send("Only admins can create characters.");
	}

	const result = await characterServices.updateCharacter(
		character,
		name,
		company
	);

	res.status(201).json({
		data: result,
	});
});

export {router};
