"use strict";
const { model: Character } = require("../characters/characterModel");
const { model: Filter } = require("../filters/filterModel");

const mongoose = require("mongoose");
const { Schema } = mongoose;
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

exports.model = mongoose.model("Game", gameSchema);
