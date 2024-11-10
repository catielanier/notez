"use strict";

import mongoose, {Schema} from "mongoose";

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

export const model = mongoose.model("Character", characterSchema);
