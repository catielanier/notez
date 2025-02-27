import express from "express";
import * as tokenService from "../../../utils/tokenService.js";
import * as userServices from "../../users/userServices.js";
import * as playerNoteServices from "./playerNoteServices.js";

const router = express.Router();

router.route("/").post(async (req, res) => {
	const {t} = req;
	const {note, token, user: id} = req.body;
	try {
		const loggedIn = await tokenService.verifyToken(token);
		if (!loggedIn) {
			res.status(503).send(t('errors.notLoggedIn'));
			return;
		}
		const user = await userServices.getUserById(id);
		if (user.role === "Banned") {
			res.status(503).send(t('errors.banned'));
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
	const {t} = req;
	try {
		await Promise.all([
			(async () => {
				const loggedIn = await tokenService.verifyToken(token);
				if (!loggedIn) {
					res.status(503).send(t('errors.notLoggedIn'));
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
	const {t} = req;
	const {token, note, filter} = req.body;
	try {
		const loggedIn = await tokenService.verifyToken(token);
		if (!loggedIn) {
			res.status(503).send(t('errors.notLoggedIn'));
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
