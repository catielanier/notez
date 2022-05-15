const { model: User } = require("./userModel");
const bcrypt = require("bcryptjs");
const { promisify } = require("util");
const { randomBytes } = require("crypto");
const tokenService = require("../../utils/tokenService");

exports.createUser = async (userData) => {
	try {
		const user = new User(userData);
		return await user.save();
	} catch (e) {
		throw e;
	}
};

exports.addValidation = async () => {
	const randomBytesPromisified = promisify(randomBytes);
	return (await randomBytesPromisified(20)).toString("hex");
};

exports.isUser = async ({ email, password }) => {
	try {
		const [user] = await User.find({ email });
		if (user) {
			const match = await user.comparePassword(password);
			if (match) {
				return user;
			}
		}
	} catch (e) {
		throw e;
	}
};

exports.getUserById = async (id, populateNotes = true) => {
	try {
		let user;
		switch (populateNotes) {
			case false:
				user = await User.findById(id);
				break;
			default:
				user = await User.findById(id)
					.populate({ path: "gameNotes", populate: { path: "filter" } })
					.populate({ path: "playerNotes", populate: { path: "filter" } });
				break;
		}
		if (user) {
			return user;
		}
	} catch (e) {
		throw e;
	}
};

exports.checkUserRoles = async (token, roles) => {
	const decodedJwt = await tokenService.decodeToken(token);
	const {
		payload: {
			user: { id, role },
		},
	} = decodedJwt;
	const currentUser = await exports.getUserById(id, false);
	if (currentUser.role !== role) {
		throw new Error("you have modified your token. gtab");
	}
	if (currentUser.role === "Banned") {
		throw new Error("you are banned");
	}
	if (!roles.includes(currentUser.role)) {
		throw new Error("you do not have permission to access this information");
	} else {
		return true;
	}
};

exports.verifyOldPassword = async (id, password) => {
	try {
		const user = await User.findById({ _id: id });
		if (user) {
			const match = await user.comparePassword(password);
			if (match) {
				return user;
			}
		}
	} catch (e) {
		throw e;
	}
};

exports.updatePassword = async (id, password) => {
	try {
		const hash = await bcrypt.hash(password, 10);
		return await User.findByIdAndUpdate(
			{ _id: id },
			{
				$set: {
					password: hash,
					forgotPassword: "",
				},
			}
		);
	} catch (e) {
		throw e;
	}
};

exports.updateUser = async (id, realName, username, country, email) => {
	try {
		return await User.findByIdAndUpdate(
			{ _id: id },
			{ $set: { realName, username, country, email } }
		);
	} catch (e) {
		throw e;
	}
};

exports.getAllUsers = async () => {
	try {
		return await User.find({});
	} catch (e) {
		throw e;
	}
};

exports.updateRole = async (id, role) => {
	try {
		return await User.findByIdAndUpdate({ _id: id }, { $set: { role } });
	} catch (e) {
		throw e;
	}
};

exports.findUser = async (email) => {
	try {
		return await User.findOne({ email });
	} catch (e) {
		throw e;
	}
};

exports.setForgotToken = async (id, token) => {
	try {
		console.log("running update");
		console.log(token);
		return await User.findByIdAndUpdate(
			{ _id: id },
			{
				$set: {
					forgotPassword: token,
				},
			}
		);
	} catch (e) {
		throw e;
	}
};

exports.verifyUser = async (key) => {
	try {
		return await User.findOneAndUpdate(
			{ verification: key },
			{ $set: { verification: "", active: true } }
		);
	} catch (e) {
		throw e;
	}
};

exports.findUserByResetToken = async (key) => {
	try {
		return await User.findOne({ forgotPassword: key });
	} catch (e) {
		throw e;
	}
};
