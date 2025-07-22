"use strict";
import UserModel from '../../users/userModel'
import mongoose, { Schema } from "mongoose";

const gameNoteSchema = new Schema({
	author: {
		type: Schema.Types.ObjectId,
		ref: UserModel,
		required: true
	},
	sharedWith: [
		{
			type: Schema.Types.ObjectId,
			ref: UserModel,
			index: true
		}
	],
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
		required: function() {
			return this.universal === false;
		},
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
