"use strict";
import mongoose, { Schema } from "mongoose";

const playerNoteSchema = new Schema({
	author: {
		type: Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
	sharedWith: [
		{
			type: Schema.Types.ObjectId,
			ref: "User",
			index: true,
		},
	],
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
