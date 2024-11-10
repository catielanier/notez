"use strict";

import {model as GameNote} from "../notes/games/gameNoteModel.js";
import {model as PlayerNote} from "../notes/players/playerNoteModel.js";

import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const { Schema } = mongoose;
const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  active: {
    type: Boolean,
    required: true,
    default: false,
  },
  username: {
    type: String,
    unique: true,
    required: true,
  },
  role: {
    type: String,
    required: true,
    default: "User",
    enum: ["Admin", "User", "Banned"],
  },
  joinDate: {
    type: Date,
    required: true,
    default: Date.now(),
  },
  country: {
    type: String,
  },
  realName: {
    type: String,
  },
  verification: {
    type: String,
  },
  forgotPassword: {
    type: String,
  },
  premium: {
    type: Boolean,
    default: false,
    required: true,
  },
  gameNotes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: GameNote,
    },
  ],
  playerNotes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: PlayerNote,
    },
  ],
	validTokens: [
		{
			type: String
		}
	]
});

userSchema.pre("save", async function (next) {
  const user = this;

  if (user.isModified("password") || user.isNew) {
    try {
			user.password = await bcrypt.hash(user.password, 10);
      return next();
    } catch (e) {
      return next(e);
    }
  } else {
    return next();
  }
});

userSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.password);
};

export const model = mongoose.model("User", userSchema);
