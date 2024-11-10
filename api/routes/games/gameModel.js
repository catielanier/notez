"use strict";
import {model as Character} from "../characters/characterModel";
import {model as Filter} from "../filters/filterModel";
import mongoose from "mongoose";

const {Schema} = mongoose;

const gameSchema = new Schema({
	name: {
		type: String,
		required: true,
		unique: true,
	},
	characters: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: Character,
		},
	],
	filters: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: Filter,
		},
	],
});

export const model = mongoose.model("Game", gameSchema);
