import express from "express";

const router = express.Router();
import * as tokenService from "../../../utils/tokenService.js";
import * as userServices from "../../users/userServices.js";
import * as gameNoteServices from "./gameNoteServices.js";
import { decrypt, encrypt } from "../../../utils/crypto.js";
import { ErrorSharp } from "@material-ui/icons";

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
		const gameNotes = (await gameNoteServices.getUserNotes(id)).map(note => {
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
	const {note} = req.body;
	const token = req.headers.Authorization.replace("Bearer ", "");
	try {
		const loggedIn = await tokenService.verifyToken(token);
		if (!loggedIn) {
			res.status(503).send(t('errors.notLoggedIn'));
		}
		const {id} = await tokenService.decodeToken(token);
		const user = await userServices.getUserById(id);
		if (user.role === "Banned") {
			res.status(503).send(t('errors.banned'));
		}
		note.note = encrypt(note.note);
		const newNote = await gameNoteServices.createNote(note);
		if (newNote) {
			res.status(201).json({
				data: {
					fullNote: newNote
				},
			});
		}
	} catch (e) {
		res.status(401).send(e);
	}
});

router.route("/").delete(async (req, res) => {
	const {noteId} = req.body;
	const {t} = req;
	const token = req.headers.Authorization.replace("Bearer ", "");
	try {
		await Promise.all(async () => {
			const loggedIn = await tokenService.verifyToken(token);
			if (!loggedIn) {
				res.status(503).send(t('errors.notLoggedIn'));
			}
			const {userId} = await tokenService.decodeToken(token);
			const note = await gameNoteServices.getNoteById(noteId);
			if (note.author !== userId && !note.sharedWith.includes(userId)) {
				res.status(401).send(t('errors.noOwnership'));
			}
			if (note.author === userId) {
				await gameNoteServices.deleteNote(noteId);
			} else {
				await gameNoteServices.removeShare(noteId, userId);
			}
			res.status(200).send('success');
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
		}
		const results = await gameNoteServices.updateNote(noteId, note, filter);
		if (results) {
			const updatedNote = await gameNoteServices.getNoteById(noteId);
			res.status(201).json({
				data: updatedNote,
			});
		}
	} catch (e) {
		res.status(401).send(e);
	}
});

export {router};
