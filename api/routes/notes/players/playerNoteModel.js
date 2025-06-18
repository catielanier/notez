"use strict";

import mongoose from "mongoose";

const { Schema } = mongoose;
const playerNoteSchema = new Schema({
	game: {
		type: String,
		required: true,
	},
	player: {
		type: String,
		required: true,
	},
	filter: {
		type: String,
		required: true,
	},
	note: {
		type: String,
		required: true,
	},
	noteDate: {
		type: Date,
		default: Date.now(),
	},
});

export const model = mongoose.model("PlayerNote", playerNoteSchema);
