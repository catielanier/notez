"use strict";
import mongoose, {Schema} from "mongoose";
import {model as Character} from "../../characters/characterModel.js";
import {model as Filter} from "../../filters/filterModel.js";
import {model as Game} from "../../games/gameModel.js";

const gameNoteSchema = new Schema({
	game: {
		type: mongoose.Schema.Types.ObjectId,
		ref: Game,
		required: true
	},
	myCharacter: {
		type: mongoose.Schema.Types.ObjectId,
		ref: Character,
		required: true
	},
	opponentCharacter: {
		type: mongoose.Schema.Types.ObjectId,
		ref: Character
	},
	universal: {
		type: Boolean,
		required: true,
		default: false
	},
	filter: {
		type: mongoose.Schema.Types.ObjectId,
		ref: Filter,
		required: true
	},
	note: {
		type: String,
		required: true
	},
	noteDate: {
		type: Date,
		default: Date.now()
	}
});

export const model = mongoose.model("GameNote", gameNoteSchema);
