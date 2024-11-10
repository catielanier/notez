import express from "express";
import * as tokenService from "../../../utils/tokenService";
import * as userServices from "../../users/userServices";
import * as playerNoteServices from "./playerNoteServices";

const router = express.Router();

router.route("/").post(async (req, res) => {
	const {note, token, user: id} = req.body;
	try {
		const loggedIn = await tokenService.verifyToken(token);
		if (!loggedIn) {
			res.status(503).send("You are not logged in.");
			return;
		}
		const user = await userServices.getUserById(id);
		if (user.role === "Banned") {
			res.status(503).send("You are banned and cannot use our service.");
			return;
		}
		const newNote = await playerNoteServices.createNote(note);
		if (newNote) {
			const noteId = newNote._id;
			const relationship = await playerNoteServices.linkNoteToUser(id, noteId);
			if (relationship) {
				const fullNote = await playerNoteServices.getNoteById(noteId);
				res.status(201).json({
					data: fullNote,
				});
			}
		}
	} catch (e) {
		res.status(401).send(e);
	}
});

router.route("/").delete(async (req, res) => {
	const {user: userId, token, noteId} = req.body;
	try {
		await Promise.all([
			(async () => {
				const loggedIn = await tokenService.verifyToken(token);
				if (!loggedIn) {
					res.status(503).send("You are not logged in.");
					return;
				}
				await userServices.getUserById(userId);
				await playerNoteServices.unlinkPlayerNote(userId, noteId);
			})()
		]);
		const note = await playerNoteServices.deleteNote(noteId);
		res.status(200).json({
			data: note,
		});
	} catch (e) {
		res.status(401).send(e);
	}
});

router.route("/:id").put(async (req, res) => {
	const {id: noteId} = req.params;
	const {token, note, filter} = req.body;
	try {
		const loggedIn = await tokenService.verifyToken(token);
		if (!loggedIn) {
			res.status(503).send("You are not logged in.");
			return;
		}
		const results = await playerNoteServices.updateNote(noteId, note, filter);
		if (results) {
			const updatedNote = await playerNoteServices.getNoteById(noteId);
			res.status(201).json({
				data: updatedNote,
			});
		}
	} catch (e) {
		res.status(401).send(e);
	}
});

export {router};
