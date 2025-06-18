"use strict";
import mongoose, { Schema } from "mongoose";

const gameNoteSchema = new Schema({
	game: {
		type: String,
		required: true,
	},
	myCharacter: {
		type: String,
		required: true,
	},
	opponentCharacter: {
		type: String,
		required: this.opponentCharacter === false,
	},
	universal: {
		type: Boolean,
		required: true,
		default: false,
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

export const model = mongoose.model("GameNote", gameNoteSchema);
