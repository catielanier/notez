"use strict";

import mongoose from "mongoose";

const {Schema} = mongoose;

const inviteSchema = new Schema({
	email: {
		type: String,
		unique: true,
		required: true,
	},
});

export const model = mongoose.model("Invite", inviteSchema);
