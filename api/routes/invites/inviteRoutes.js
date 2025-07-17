import express from 'express';
import * as userService from '../users/userServices.js';
import * as inviteService from './inviteServices.js';
import {MJ_APIKEY_PRIVATE, MJ_APIKEY_PUBLIC} from '../../utils/constants.js';
import axios from "axios";

const router = express.Router();

const auth = Buffer.from(`${MJ_APIKEY_PUBLIC}:${MJ_APIKEY_PRIVATE}`).toString('base64');

router.route('/').post(async (req, res) => {
	const {email} = req.body.data;
	const t = req.t;
	try {
		const user = await userService.findUser(email);
		if (user) {
			res.status(401).send(t('errors.alreadySignedUp'));
		} else {
			const newInvite = {
				email,
			};
			const finished = await inviteService.createInvite(newInvite);
			// write email for sending invites
			const messageBody = `
								<h3>${t("emails.sender")}</h3>
								<h5>${t("emails.invite.greeting")}</h5>
								<p>${t("emails.invite.body1")}</p>
								<p>${t("emails.invite.body1", {
									url: `https://checkthenotez.com/invite/${finished._id}`,
								})}</p>
								<p>${t("emails.closing")}<br />${t("emails.team")}</p>
						`;

			resend.emails.send({
				from: `${t("email.sender")} <no-reply@checkthenotez.com>`,
				to: [newInvite.email],
				subject,
				html: messageBody,
			});
			res.status(201).json({
				data: finished,
			});
		}
	} catch (e) {
		res.status(401).send(e);
	}
});

router.route('/:id').get(async (req, res) => {
	const {id} = req.params;
	// get invite
	try {
		const invite = await inviteService.getInvite(id);
		res.status(200).json({
			data: invite,
		});
	} catch (e) {
		res.status(400).send(e);
	}
});

router.route('/signup').post(async (req, res) => {
	const {data: newUser} = req.body;
	const {token} = newUser;
	delete newUser.token;
	newUser.premium = true;
	newUser.active = true;
	try {
		const invite = await inviteService.getInvite(token);
		if (invite) {
			const user = await userService.createUser(newUser);
			if (user) {
				const finished = await inviteService.deleteInvite(token);
				if (finished) {
					res.status(201).json({
						data: user,
					});
				}
			}
		}
	} catch (e) {
		res.status(401).send(e);
	}
});

export {router};
