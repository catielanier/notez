import express from "express";
import * as tokenService from "../../../utils/tokenService.js";
import * as userServices from "../../users/userServices.js";
import * as playerNoteServices from "./playerNoteServices.js";
import { encrypt } from "../../../utils/crypto.js";

const router = express.Router();

router.route("/user").get(async (req, res) => {
	const {t} = req;
	const token = req.headers.Authorization.replace("Bearer ", "");
	try {
		const isLoggedIn = await tokenService.verifyToken(token);
		if (!isLoggedIn) {
			res.status(503).send(t('errors.notLoggedIn'));
		}
		const {id} = await tokenService.decodeToken(token);
		const user = await userServices.getUserById(id);
		if (user.role === "Banned") {
			res.status(503).send(t('errors.banned'));
		}
		const gameNotes = (await playerNoteServices.getUserNotes(id)).map(note => {
			note.note = decrypt(note.note);
			return note;
		});
		res.status(200).json({
			gameNotes
		})
	} catch (e) {
		res.status(400).send(e);
	}
});

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
		note.note = encrypt(note.note);
		const newNote = await playerNoteServices.createNote(note);
		if (newNote) {
			res.status(201).json({
				data:  {
					fullNote: newNote
				},
			});
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
