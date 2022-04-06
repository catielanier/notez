"use strict";

const mongoose = require("mongoose");
const { Schema } = mongoose;
const characterSchema = new Schema({
	name: {
		type: String,
		required: true,
		unique: true,
	},
	company: {
		type: String,
		required: true,
	},
});

exports.model = mongoose.model("Character", characterSchema);
