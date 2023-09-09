"use strict";

// Imports and defs
const mongoose = require("mongoose");
const express = require("express");
const http = require("http");
const router = express();

// Middleware
require("dotenv").config({ path: __dirname + "/.env" });
const {
	URL,
	PORT,
	ENVIRONMENT,
	SERVER_PORT,
} = require("./api/utils/constants");
const middleWare = require("./api/middleware");
const { applyMiddleware } = require("./api/utils");
const path = require("path");

applyMiddleware(middleWare, router);

// Routes
const { router: userRouter } = require("./api/routes/users/userRoutes");
const { router: gameRouter } = require("./api/routes/games/gameRoutes");
const {
	router: characterRouter,
} = require("./api/routes/characters/characterRoutes");
const { router: filterRouter } = require("./api/routes/filters/filterRoutes");
const {
	router: gameNoteRouter,
} = require("./api/routes/notes/games/gameNoteRoutes");
const {
	router: playerNoteRouter,
} = require("./api/routes/notes/players/playerNoteRoutes");
const { router: inviteRouter } = require("./api/routes/invites/inviteRoutes");

router.use("/api/users", userRouter);
router.use("/api/games", gameRouter);
router.use("/api/characters", characterRouter);
router.use("/api/filters", filterRouter);
router.use("/api/notes/game", gameNoteRouter);
router.use("/api/notes/player", playerNoteRouter);
router.use("/api/invites", inviteRouter);

if (ENVIRONMENT === "prod") {
	router.use("/", express.static(path.join(__dirname, "./build")));
}

// Setup server
const server = http.createServer(router);

// Connect to MongoDB
mongoose
	.connect(URL, { useNewUrlParser: true })
	.then(() => {
		server.listen(SERVER_PORT || PORT, () => {
			console.log(`server running on port ${SERVER_PORT || PORT}`);
		});
	})
	.catch((err) => {
		console.log(err);
	});
