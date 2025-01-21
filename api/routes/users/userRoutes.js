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
	findUserByResetToken
} from "./userServices.js";

import * as tokenService from "../../utils/tokenService.js";
import axios from "axios";
import {MJ_APIKEY_PRIVATE, MJ_APIKEY_PUBLIC} from "../../utils/constants.js";

const auth = Buffer.from(`${MJ_APIKEY_PUBLIC}:${MJ_APIKEY_PRIVATE}`).toString('base64');


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

		try {
			const response = await axios.post(
				'https://api.mailjet.com/v3/send',
				{
					FromEmail: 'no-reply@checkthenotez.com',
					FromName: sender,
					Subject: subject,
					'Html-part': messageBody,
					Recipients: [
						{
							Email: user.email,
						},
					],
				},
				{
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Basic ${auth}`
					}
				}
			)
			console.log(response.data);
		} catch (e) {
			console.error(e);
		}
		res.status(201).json({
			data: [user],
		});
	} catch (e) {
		next(e);
	}
});

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
						token
					},
				});
			} else {
				res
					.status(400)
					.send(
						t('errors.notActivated')
					);
			}
		} else {
			next();
		}
	} catch (e) {
		next(e);
	}
});

router.route("/:id").get(async (req, res, next) => {
	const {id} = req.params;
	try {
		const user = await getUserById(id);
		res.status(200).json({
			data: user,
		});
	} catch (e) {
		next(e);
	}
});

router.route("/:id").put(async (req, res) => {
	const {id: user} = req.params;
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
			const validPassword = await verifyOldPassword(
				user,
				oldPassword
			);
			if (validPassword) {
				const passwordChange = await updatePassword(
					user,
					newPassword
				);
				const userUpdate = await updateUser(
					user,
					realName,
					username,
					country,
					email
				);
				if (userUpdate && passwordChange) {
					res.status(201).json({
						data: userUpdate,
					});
				} else {
					res.status(401).send(t('errors.didNotUpdate'));
				}
			} else {
				res
					.status(401)
					.send(t('errors.invalidOldPassword'));
			}
		} else {
			const userUpdate = await updateUser(
				user,
				realName,
				username,
				country,
				email
			);
			if (userUpdate) {
				res.status(201).json({
					data: userUpdate,
				});
			} else {
				res.status(401).send(t('errors.didNotUpdate'));
			}
		}
	} else {
		res.status(401).send(t('errors.notLoggedIn'));
	}
});

router.route("/").get(async (req, res) => {
	const t = req.t;
	const {token, user: id} = req.query;
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
			res.status(503).send(t('errors.viewUsers'));
		}
	} else {
		res.status(400).send(t('errors.notLoggedIn'));
	}
});

router.route("/role").put(async (req, res) => {
	const t = req.t;
	const {token, user: userId, id, role} = req.body;
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

router.route("/forgot").post(async (req, res) => {
	const {email} = req.body;
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

			try {
				const response = await axios.post(
					'https://api.mailjet.com/v3/send',
					{
						FromEmail: 'no-reply@checkthenotez.com',
						FromName: sender,
						Subject: subject,
						'Html-part': messageBody,
						Recipients: [
							{
								Email: checkUser.email,
							},
						],
					},
					{
						headers: {
							'Content-Type': 'application/json',
							Authorization: `Basic ${auth}`
						}
					}
				)
				console.log(response.data);
			} catch (e) {
				console.error(e);
			}
			res.status(201).json({
				data: updated,
			});
		}
	} catch (e) {
		res.status(401).send(t("errors.noUserFound"));
	}
});

router.route("/verify").post(async (req, res) => {
	const t = req.t;
	const {key} = req.body;
	const user = await verifyUser(key);
	if (user) {
		res.status(201).json({
			data: user,
		});
	} else {
		res.status(401).send(t("errors.noToken"));
	}
});

router.route("/reset").post(async (req, res) => {
	const t = req.t;
	const {key, password} = req.body;
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

router.route('/init').get(async (req, res) => {
	const t = req.t;
	const token = req.headers.Authorization.replace('Bearer ', '');
	const {userId, issuedAt, expiresAt} = tokenService.decodeToken(token);
	try {
		const {validTokens} = await getUserById(userId);
		if (validTokens && validTokens.include(token)) {
			if (expiresAt < Date.now()) {
				const newToken = tokenService.issueToken(userId);
				validTokens[validTokens.indexOf(token)] = newToken;
				await updateUserTokens(userId, validTokens)
				res.status(200).json({
					isLoggedIn: true,
					token: newToken
				})
			}
			res.status(200).json({
				isLoggedIn: true
			})
		} else {
			res.status(400).send('JWT_VALIDATION_ERROR')
		}
	} catch (e) {
		res.status(400).send('USER_VALIDATION_ERROR');
	}
});

export {router};
