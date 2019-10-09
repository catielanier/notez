const express = require("express");
const router = express.Router();
const userServices = require("../users/userServices");
const tokenService = require("../../utils/tokenService");
const characterServices = require("./characterServices");

router.route("/new").post(async (req, res) => {
  // Grab the token, user id, and game from frontend.
  const { token, user: id, character } = req.body;
  try {
    // Check if the login is valid
    const loggedIn = await tokenService.verifyToken(token);
    if (!loggedIn) {
      res.status(503).statusMessage("You are not logged in.");
    }
    // Query the user and check for admin privileges.
    const user = await userServices.getUserById(id);
    if (user.role !== "Admin") {
      res.status(503).statusMessage("Only admins can create characters.");
    }
    // Create new game.
    const newCharacter = await characterServices.createCharacter(character);
    res.status(201).json({
      data: newCharacter
    });
  } catch (e) {
    res.status(401).statusMessage(e);
  }
});

exports.router = router;
