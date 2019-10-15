const express = require("express");
const router = express.Router();
const tokenService = require("../../../utils/tokenService");
const userServices = require("../../users/userServices");
const gameNoteServices = require("./gameNoteServices");

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
    const newNote = await gameNoteServices.createNote(note);
    if (newNote) {
      const noteId = newNote._id;
      const relationship = await gameNoteServices.linkNoteToUser(id, noteId);
      if (relationship) {
        res.status(201).json({
          data: newNote
        });
      }
    }
  } catch (e) {
    res.status(401);
  }
});

router.route("/:id").delete(async (req, res) => {
  const { id: noteId } = req.params;
  const { user: userId, token } = req.body;
  try {
    const loggedIn = await tokenService.verifyToken(token);
    if (!loggedIn) {
      res.status(503).statusMessage("You are not logged in.");
    }
    const user = await userServices.getUserById(userId);
    const index = user.gameNotes.findIndex(note => note._id === noteId);
    if (index === -1) {
      res.status(404).statusMessage("That note does not exist.");
    }
    const relationship = await gameNoteServices.unlinkGameNote(userId, noteId);
    const note = await gameNoteServices.deleteNote(noteId);
    res.status(200).json({
      data: note
    });
  } catch (e) {
    res.status(401);
  }
});

exports.router = router;
