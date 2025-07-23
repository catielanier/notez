import express from "express";

const router = express.Router();
import {
	createUser,
	addValidation,
	isUser,
	getUserById,
	updatePassword,
	updateUser,
	verifyOldPassword,
	getAllUsers,
	updateUserTokens,
	updateRole,
	findUser,
	setForgotToken,
	verifyUser,
	findUserByResetToken,
} from "./userServices.js";

import * as tokenService from "../../utils/tokenService.js";
import resend from "../../utils/resend.js";

// signup
router.route("/signup").post(async (req, res, next) => {
	const t = req.t;
	try {
		const newUser = req.body.data;
		newUser.verification = await addValidation();
		const user = await createUser(newUser);

		const subject = t("emails.signup.subject");

		const messageBody = `
			<h3>${t("emails.sender")}</h3>
			<h5>${t("emails.signup.greeting", {
				username: newUser.username,
			})}</h5>
			<p>${t("emails.signup.body", {
				url: `https://checkthenotez.com/verify/${newUser.verification}`,
			})}</p>
			<p>${t("emails.closing")}<br />${t("emails.team")}</p>		
		`;

		const sender = t("emails.sender");

		resend.emails.send({
			from: `${sender} <no-reply@checkthenotez.com>`,
			to: [user.email],
			subject,
			html: messageBody,
		});

		res.status(201).json({
			data: [user],
		});
	} catch (e) {
		next(e);
	}
});

// login
router.route("/login").post(async (req, res, next) => {
	const t = req.t;
	try {
		const user = await isUser(req.body.data);
		if (user) {
			if (user.active) {
				const token = await tokenService.issueToken(user.userId);
				user.validTokens.push(token);
				await updateUserTokens(user.userId, user.validTokens);
				res.status(200).json({
					data: {
						token,
					},
				});
			} else {
				res.status(400).send(t("errors.notActivated"));
			}
		} else {
			next();
		}
	} catch (e) {
		next(e);
	}
});

// get single user
router.route("/:id").get(async (req, res, next) => {
	const { id } = req.params;
	const token = req.headers.Authorization.replace("Bearer ", "");
	try {
		const loggedIn = await tokenService.verifyToken(token);
		if (!loggedIn) {
			res.status(403).send(t("errors.notLoggedIn"));
		}
		const { requestingUserId } = await tokenService.decodeToken(token);
		const requestingUser = await userServices.getUserById(requestingUserId);
		if (requestingUserId !== id || requestingUser.role !== "ADMIN") {
			res.status(503).send(t("errors.viewUser"));
		}
		const user = await getUserById(id);
		res.status(200).json({
			data: user,
		});
	} catch (e) {
		next(e);
	}
});

// update profile
router.route("/:id").put(async (req, res) => {
	const { id: user } = req.params;
	const {
		username,
		realName,
		newPassword,
		oldPassword,
		country,
		email,
		token,
	} = req.body;
	const t = req.t;
	const loggedIn = await tokenService.verifyToken(token);
	if (loggedIn) {
		if (oldPassword) {
			const validPassword = await verifyOldPassword(user, oldPassword);
			if (validPassword) {
				const passwordChange = await updatePassword(user, newPassword);
				const userUpdate = await updateUser(
					user,
					realName,
					username,
					country,
					email,
				);
				if (userUpdate && passwordChange) {
					res.status(201).json({
						data: userUpdate,
					});
				} else {
					res.status(401).send(t("errors.didNotUpdate"));
				}
			} else {
				res.status(401).send(t("errors.invalidOldPassword"));
			}
		} else {
			const userUpdate = await updateUser(
				user,
				realName,
				username,
				country,
				email,
			);
			if (userUpdate) {
				res.status(201).json({
					data: userUpdate,
				});
			} else {
				res.status(401).send(t("errors.didNotUpdate"));
			}
		}
	} else {
		res.status(401).send(t("errors.notLoggedIn"));
	}
});

// get all users
router.route("/").get(async (req, res) => {
	const t = req.t;
	const { token, user: id } = req.query;
	const loggedIn = await tokenService.verifyToken(token);
	if (loggedIn) {
		const user = await getUserById(id);
		if (user.role === "Admin") {
			const users = await getAllUsers();
			if (users) {
				res.status(200).json({
					data: users,
				});
			}
		} else {
			res.status(503).send(t("errors.viewUsers"));
		}
	} else {
		res.status(400).send(t("errors.notLoggedIn"));
	}
});

// update role
router.route("/role").put(async (req, res) => {
	const t = req.t;
	const { token, user: userId, id, role } = req.body;
	const loggedIn = await tokenService.verifyToken(token);
	if (loggedIn) {
		const user = await getUserById(userId);
		if (user.role === "Admin") {
			const updatedUser = await updateRole(id, role);
			if (updatedUser) {
				res.status(201).json({
					data: updatedUser,
				});
			}
		} else {
			res.status(503).send(t("errors.unauthorizedRoleUpdate"));
		}
	} else {
		res.status(401).send(t("errors.notLoggedIn"));
	}
});

// forgot password request
router.route("/forgot").post(async (req, res) => {
	const { email } = req.body;
	const t = req.t;
	try {
		const checkUser = await findUser(email);
		if (checkUser) {
			const token = await addValidation();
			const updated = await setForgotToken(checkUser._id, token);

			const sender = t("emails.sender");
			const subject = t("emails.forgotPassword.subject");
			const messageBody = `
				<h3>${t("emails.sender")}</h3>
				<h5>${t("emails.forgotPassword.greeting", {
					username: checkUser.username,
				})}</h5>
				<p>${t("emails.signup.body", {
					url: `https://checkthenotez.com/forgot/${token}`,
				})}</p>
				<p>${t("emails.closing")}<br />${t("emails.team")}</p>
			`;

			resend.emails.send({
				from: `${sender} <no-reply@checkthenotez.com>`,
				to: [checkUser.email],
				subject,
				html: messageBody,
			});

			res.status(201).json({
				data: updated,
			});
		}
	} catch (e) {
		res.status(401).send(t("errors.noUserFound"));
	}
});

// verify account
router.route("/verify").post(async (req, res) => {
	const t = req.t;
	const { key } = req.body;
	const user = await verifyUser(key);
	if (user) {
		res.status(201).json({
			data: user,
		});
	} else {
		res.status(401).send(t("errors.noToken"));
	}
});

// reset password
router.route("/reset").post(async (req, res) => {
	const t = req.t;
	const { key, password } = req.body;
	try {
		const user = await findUserByResetToken(key);
		if (user) {
			console.log(user._id);
			const updatedUser = await updatePassword(user._id, password);
			if (updatedUser) {
				res.status(201).json({
					data: updatedUser,
				});
			}
		}
	} catch (e) {
		res.status(401).send(t("errors.invalidToken"));
	}
});

// user check
router.route("/init").get(async (req, res) => {
	const t = req.t;
	const token = req.headers.Authorization.replace("Bearer ", "");
	const { userId, issuedAt, expiresAt } = tokenService.decodeToken(token);
	try {
		const { validTokens } = await getUserById(userId);
		if (validTokens && validTokens.include(token)) {
			if (expiresAt < Date.now()) {
				const newToken = tokenService.issueToken(userId);
				validTokens[validTokens.indexOf(token)] = newToken;
				await updateUserTokens(userId, validTokens);
				res.status(200).json({
					isLoggedIn: true,
					token: newToken,
				});
			}
			res.status(200).json({
				isLoggedIn: true,
			});
		} else {
			res.status(400).send("JWT_VALIDATION_ERROR");
		}
	} catch (e) {
		res.status(400).send("USER_VALIDATION_ERROR");
	}
});

export { router };
