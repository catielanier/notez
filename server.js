"use strict";
import "dotenv/config"

// Imports and defs
import express from "express";
import http from "http";
import mongoose from "mongoose";

import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = express();

// Middleware
import path from "path";
import middleWare from "./api/middleware/index.js";
import {
	ENVIRONMENT,
	IP,
	PORT,
	SERVER_PORT,
	URL,
} from "./api/utils/constants.js";
import { applyMiddleware } from "./api/utils/index.js";


applyMiddleware(middleWare, router);

// Routes
import { router as inviteRouter } from "./api/routes/invites/inviteRoutes.js";
import { router as gameNoteRouter } from "./api/routes/notes/games/gameNoteRoutes.js";
import { router as playerNoteRouter } from "./api/routes/notes/players/playerNoteRoutes.js";
import { router as userRouter } from "./api/routes/users/userRoutes.js";

router.use("/api/users", userRouter);
router.use("/api/notes/game", gameNoteRouter);
router.use("/api/notes/player", playerNoteRouter);
router.use("/api/invites", inviteRouter);

if (ENVIRONMENT === "prod") {
	router.use("/", express.static(path.join(__dirname, "./dist")));
}

// Setup server
const server = http.createServer(router);

// Connect to MongoDB
mongoose
	.connect(URL, { useNewUrlParser: true })
	.then(() => {
		const port = Number(SERVER_PORT) || Number(PORT) || 3000;
		server.listen(port, IP, () => {
			console.log(`server running on port ${port}`);
		});
	})
	.catch((err) => {
		console.log(err);
	});
