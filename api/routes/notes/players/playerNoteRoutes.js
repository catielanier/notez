const express = require("express");
const router = express.Router();
const tokenService = require("../../../utils/tokenService");
const userServices = require("../../users/userServices");
const playerNoteServices = require("./playerNoteServices");

router.route("/").post(async (req, res) => {
  const { note, token, user: id } = req.body;
  try {
    const loggedIn = await tokenService.verifyToken(token);
    if (!loggedIn) {
      res.status(503).statusMessage("You are not logged in.");
    }
    const user = await userServices.getUserById(id);
    if (user.role === "Banned") {
      res
        .status(503)
        .statusMessage("You are banned and cannot use our service.");
    }
    const newNote = await playerNoteServices.createNote(note);
    if (newNote) {
      const noteId = newNote._id;
      const relationship = await playerNoteServices.linkNoteToUser(id, noteId);
      if (relationship) {
        const fullNote = await playerNoteServices.getNoteById(noteId);
        res.status(201).json({
          data: fullNote
        });
      }
    }
  } catch (e) {
    res.status(401);
  }
});

router.route("/").delete(async (req, res) => {
  const { user: userId, token, noteId } = req.body;
  try {
    const loggedIn = await tokenService.verifyToken(token);
    if (!loggedIn) {
      res.status(503).statusMessage("You are not logged in.");
    }
    const user = await userServices.getUserById(userId);
    const relationship = await playerNoteServices.unlinkGameNote(
      userId,
      noteId
    );
    const note = await playerNoteServices.deleteNote(noteId);
    res.status(200).json({
      data: note
    });
  } catch (e) {
    res.status(401);
  }
});

router.route("/:id").put(async (req, res) => {
  const { id: noteId } = req.params;
  const { token, note, filter } = req.body;
  try {
    const loggedIn = await tokenService.verifyToken(token);
    if (!loggedIn) {
      res.status(503).statusMessage("You are not logged in.");
    }
    const results = await playerNoteServices.updateNote(noteId, note, filter);
    if (results) {
      const updatedNote = await playerNoteServices.getNoteById(noteId);
      res.status(201).json({
        data: updatedNote
      });
    }
  } catch (e) {
    res.status(401);
  }
});

exports.router = router;
