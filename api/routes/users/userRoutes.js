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
	try {
		const newUser = req.body.data;
		newUser.verification = await addValidation();
		const user = await createUser(newUser);

		const subject = req.t("emails.signup.subject");

		const messageBody = `
			<h3>${req.t("emails.sender")}</h3>
			<h5>${req.t("emails.signup.greeting", {
			username: newUser.username,
		})}</h5>
			<p>${req.t("emails.signup.body", {
			url: `https://checkthenotez.com/verify/${newUser.verification}`,
		})}</p>
			<p>${req.t("emails.closing")}<br />${req.t("emails.team")}</p>		
		`;



		const sender_cn = "笔记Z";
		const sender_tw = "筆記Z";
		const sender_hk = "筆記Z";

		const messageBody_cn = `
			<h3>笔记Z</h3>
			<h5>欢迎使用笔记Z，${newUser.username}！</h5>
			<p>我们很高兴欢迎您。单击<a href="https://checkthenotez.com/verify/${newUser.verification}">此处</a>开始。</p>
			<p>我们的问候，<br />笔记Z团队</p>
		`;
		const messageBody_tw = `
			<h3>筆記Z</h3>
			<h5>歡迎使用筆記Z，${newUser.username}！</h5>
			<p>我們很高興歡迎您。單擊<a href="https://checkthenotez.com/verify/${newUser.verification}">此處</a>開始。</p>
			<p>我們的問候，<br />筆記Z團隊</p>
		`;
		const messageBody_hk = `
			<h3>筆記Z</h3>
			<h5>歡迎使用筆記Z，${newUser.username}！</h5>
			<p>我哋好開心歡迎你。單擊<a href="https://checkthenotez.com/verify/${新用戶驗證}">此處</a>開始。</p>
			<p>我哋嘅打招呼，<br />筆記Z團隊</p>
		`;

		const sender = req.t("emails.sender");

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
						"You have not activated your account yet. Please check your email to do so."
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
					res.status(401).send("User did not update.");
				}
			} else {
				res
					.status(401)
					.send("Invalid password. Please confirm your old password.");
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
				res.status(401).send("User did not update.");
			}
		}
	} else {
		res.status(401).send("You are not logged in.");
	}
});

router.route("/").get(async (req, res) => {
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
			res.status(503).send("You are not authorized to view all users");
		}
	} else {
		res.status(400).send("You are not logged in.");
	}
});

router.route("/role").put(async (req, res) => {
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
			res.status(503).send("You are not authorized to update user roles.");
		}
	} else {
		res.status(401).send("You are not logged in.");
	}
});

router.route("/forgot").post(async (req, res) => {
	const {email} = req.body;
	try {
		const checkUser = await findUser(email);
		if (checkUser) {
			const token = await addValidation();
			const updated = await setForgotToken(checkUser._id, token);

			const subject_ja = "パスワードリセットリンク";
			const subject_ko = "비밀번호 재설정 링크";
			const subject_cn = "密码重置链接";
			const subject_tw = "密码重置链接";
			const subject_hk = "密码重置链接";

			const sender_ja = "ノートZ";
			const sender_ko = "노트Z";
			const sender_cn = "笔记Z";
			const sender_tw = "筆記Z";
			const sender_hk = "筆記Z";

			const messageBody_ja = `
				<h3>ノートZ</h3>
				<h5>こんにちは${checkUser.username}:</h5>
				<p>パスワードを忘れたようです。<a href="https://checkthenotez.com/forgot/${token}">ここを</a>クリックしてリセットしてください。</p>
				<p>よろしく、<br />ノートZチーム</p>
			`;

			const messageBody_ko = `
				<h3>노트Z</h3>
				<h5>안녕하세요 ${checkUser.username}:</h5>
				<p>비밀번호를 잊어 같습니다. <a href="https://checkthenotez.com/forgot/${token}">여기를</a> 클릭하여 재설정하십시오。</p>
				<p>감사합니다,<br />노트Z 팀</p>
			`;

			const messageBody_cn = `
				<h3>笔记Z</h3>
				<h5>你好${checkUser.username}:</h5>
				<p>你好像忘记了密码。 单击<a href="https://checkthenotez.com/forgot/${token}">此处</a>重置。</p>
				<p>我们的问候，<br />笔记Z团队</p>
			`;

			const messageBody_tw = `
				<h3>筆記Z</h3>
				<h5>你好${checkUser.username}:</h5>
				<p>你好像忘記了密碼。 單擊<a href="https://checkthenotez.com/forgot/${token}">此處</a>重置。</p>
				<p>我們的問候，<br />筆記Z團隊</p>
			`;

			const messageBody_hk = `
				<h3>筆記Z</h3>
				<h5>你好${checkUser.username}:</h5>
				<p>你好似唔記得咗密碼。 單擊<a href="https://checkthenotez.com/forgot/${token}">此處</a>重置。</p>
				<p>我哋嘅打招呼，<br />筆記Z團隊</p>
			`;

			const sender = req.t("emails.sender");
			const subject = req.t("emails.forgotPassword.subject");
			const messageBody = `
				<h3>${req.t("emails.sender")}</h3>
				<h5>${req.t("emails.forgotPassword.greeting", {
				username: checkUser.username,
			})}</h5>
				<p>${req.t("emails.signup.body", {
				url: `https://checkthenotez.com/forgot/${token}`,
			})}</p>
				<p>${req.t("emails.closing")}<br />${req.t("emails.team")}</p>
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
		res.status(401).send("No user is associated with this email address.");
	}
});

router.route("/verify").post(async (req, res) => {
	const {key} = req.body;
	const user = await verifyUser(key);
	if (user) {
		res.status(201).json({
			data: user,
		});
	} else {
		res.status(401).send("There was no such token.");
	}
});

router.route("/reset").post(async (req, res) => {
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
		res.status(401).send("Unable to reset password due to invalid token.");
	}
});

router.route('/init').get(async (req, res) => {
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
			res.status(400).send("JWT_VALIDATION_ERROR")
		}
	} catch (e) {
		res.status(400).send("USER_VALIDATION_ERROR");
	}
});

export {router};
