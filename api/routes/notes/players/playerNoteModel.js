"use strict";
import {model as Filter} from "../../filters/filterModel.js";
import {model as Game} from "../../games/gameModel.js";

import mongoose from "mongoose";

const {Schema} = mongoose;
const playerNoteSchema = new Schema({
	game: {
		type: mongoose.Schema.Types.ObjectId,
		ref: Game,
		required: true
	},
	player: {
		type: String,
		required: true
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

export const model = mongoose.model("PlayerNote", playerNoteSchema);
