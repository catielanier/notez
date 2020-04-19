const express = require("express");
const router = express.Router();
const userService = require("../users/userServices");
const inviteService = require("./inviteServices");
const middleWare = require("../../_middleware");
const { applyMiddleware } = require("../../_utils");
const nodemailer = require("nodemailer");
const { MAILSERVER } = require("../../_utils/constants");

applyMiddleware(middleWare, router);

const transport = nodemailer.createTransport(MAILSERVER);

router.route("/").post(async (req, res) => {
  const { email } = req.body.data;
  try {
    const user = await userService.findUser(email);
    if (user) {
      res.status(401).send("A user with this email already exists.");
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
        <p>Please click <a href="http://localhost:3000/invite/${finished._id}">here</a> to get started.</p>
        <p>Regards,<br />The NoteZ Team</p>
      `;
      const mailOptions = {
        from: '"NoteZ" <admin@checkthenotez.com>',
        to: email,
        subject: "You've been invited to NoteZ!",
        html: messageBody,
      };
      await transport.sendMail(mailOptions, (error, info) => {
        if (error) {
          return console.log(error);
        }
        console.log(`Message sent: ${info.messageId}`);
      });
      res.status(201).json({
        data: finished,
      });
    }
  } catch (e) {
    res.status(401).send(e);
  }
});

router.route("/:id").get(async (req, res) => {
  const { id } = req.params;
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

router.route("/signup").post(async (req, res) => {
  const { data: newUser } = req.body;
  const { token } = newUser;
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

exports.router = router;
