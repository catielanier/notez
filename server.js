"use strict";

// Imports and defs
import mongoose from 'mongoose';
import express from 'express';
import http from 'http';

const router = express();

// Middleware
import dotenv from 'dotenv';

dotenv.config({path: `${__dirname}/.env`});
import {URL, PORT, ENVIRONMENT, SERVER_PORT, IP} from "./api/utils/constants.js";
import middleWare from "./api/middleware";
import {applyMiddleware} from "./api/utils";
import path from "path";

applyMiddleware(middleWare, router);

// Routes
import {router as userRouter} from './api/routes/users/userRoutes.js';
import {router as gameRouter} from "./api/routes/games/gameRoutes.js";
import {router as characterRouter} from "./api/routes/characters/characterRoutes.js";
import {router as filterRouter} from "./api/routes/filters/filterRoutes.js";
import {router as gameNoteRouter} from "./api/routes/notes/games/gameNoteRoutes.js";
import {router as playerNoteRouter} from "./api/routes/notes/players/playerNoteRoutes.js";
import {router as inviteRouter} from "./api/routes/invites/inviteRoutes.js";

router.use("/api/users", userRouter);
router.use("/api/games", gameRouter);
router.use("/api/characters", characterRouter);
router.use("/api/filters", filterRouter);
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
	.connect(URL, {useNewUrlParser: true})
	.then(() => {
		server.listen(`http://${IP}:${SERVER_PORT || PORT}`, () => {
			console.log(`server running on port ${SERVER_PORT || PORT}`);
		});
	})
	.catch((err) => {
		console.log(err);
	});
