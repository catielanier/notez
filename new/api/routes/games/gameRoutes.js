const express = require("express");
const router = express.Router();
const userServices = require("../users/userServices");
const tokenService = require("../../utils/tokenService");
const gameServices = require("./gameServices");

router.route("/new").post(async (req, res) => {
  // Grab the token, user id, and game from frontend.
  const { token, user: id, game } = req.body;
  try {
    // Check if the login is valid
    const loggedIn = await tokenService.verifyToken(token);
    if (!loggedIn) {
      res.status(503).statusMessage("You are not logged in.");
    }
    // Query the user and check for admin privileges.
    const user = await userServices.getUserById(id);
    if (user.role !== "Admin") {
      res.status(503).statusMessage("Only admins can create games.");
    }
    // Create new game.
    const newGame = await gameServices.createGame(game);
    res.status(201).json({
      data: newGame
    });
  } catch (e) {
    res.status(401).statusMessage(e);
  }
});

router.route("/").get(async (_, res) => {
  try {
    const games = await gameServices.getAllGames();
    if (games) {
      res.status(200).json({
        data: games
      });
    }
  } catch (e) {
    res.status(201).statusMessage(e);
  }
});

exports.router = router;
