"use strict";

// Imports and defs
const mongoose = require("mongoose");
const express = require("express");
const http = require("http");
const router = express();

// Middleware
const { URL, PORT } = require("./utils/constants");
const middleWare = require("./middleware");
const { applyMiddleware } = require("./utils");

applyMiddleware(middleWare, router);

// Routes
const { router: userRouter } = require("./routes/users/userRoutes");
const { router: gameRouter } = require("./routes/games/gameRoutes");
const {
  router: characterRouter
} = require("./routes/characters/characterRoutes");
const { router: filterRouter } = require("./routes/filters/filterRoutes");
const {
  router: gameNoteRouter
} = require("./routes/notes/games/gameNoteRoutes");
const {
  router: playerNoteRouter
} = require("./routes/notes/players/playerNoteRoutes");

router.use("/api/users", userRouter);
router.use("/api/games", gameRouter);
router.use("/api/characters", characterRouter);
router.use("/api/filters", filterRouter);
router.use("/api/notes/game", gameNoteRouter);
router.use("/api/notes/player", playerNoteRouter);

// Setup server
const server = http.createServer(router);

// Connect to MongoDB
mongoose
  .connect(URL, { useNewUrlParser: true })
  .then(() => {
    server.listen(PORT, () => {
      console.log(`server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.log(err);
  });
