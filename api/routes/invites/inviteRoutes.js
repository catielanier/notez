import express from 'express';
import * as userService from '../users/userServices.js';
import * as inviteService from './inviteServices.js';
import {MJ_APIKEY_PRIVATE, MJ_APIKEY_PUBLIC} from '../../utils/constants.js';
import axios from "axios";

const router = express.Router();

const auth = Buffer.from(`${MJ_APIKEY_PUBLIC}:${MJ_APIKEY_PRIVATE}`).toString('base64');

router.route('/').post(async (req, res) => {
	const {email} = req.body.data;
	try {
		const user = await userService.findUser(email);
		if (user) {
			res.status(401).send('A user with this email already exists.');
		} else {
			const newInvite = {
				email,
			};
			const finished = await inviteService.createInvite(newInvite);
			// write email for sending invites
			const messageBody = `
								<h3>NoteZ</h3>
								<h5>Hello!</h5>
								<p>You've been invited to our service! Come join everyone in taking notes to help improve your game!</p>
								<p>Please click <a href="https://checkthenotez.com/invite/${finished._id}">here</a> to get started.</p>
								<p>Regards,<br />The NoteZ Team</p>
						`;
			try {
				const response = await axios.post(
					'https://api.mailjet.com/v3/send',
					{
						FromEmail: 'no-reply@checkthenotez.com',
						FromName: req.t('email.sender'),
						Subject: "You've been invited to NoteZ",
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
