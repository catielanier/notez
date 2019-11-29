const express = require("express");
const router = express.Router();
const userService = require("./userServices");
const tokenService = require("../../utils/tokenService");
const nodemailer = require("nodemailer");
const { MAILSERVER } = require("../../utils/constants");

const transport = nodemailer.createTransport(MAILSERVER);

router.route("/signup").post(async (req, res, next) => {
  try {
    const newUser = req.body.data;
    newUser.verification = await userService.addValidation();
    const user = await userService.createUser(newUser);
    const messageBody = `
          <h3>NoteZ</h3>
          <h5>Welcome to NoteZ, ${newUser.username}!</h5>
          <p>We're happy to have you. Please click <a href="http://localhost:3000/verify/${newUser.verification}">here</a> to get underway.</p>
          <p>Regards,<br />The NoteZ Team</p>
        `;
    const mailOptions = {
      from: '"NoteZ" <no-reply@notezapp.com>',
      to: newUser.email,
      subject: "Welcome to NoteZ!",
      html: messageBody
    };
    await transport.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log(`Message sent: ${info.messageId}`);
    });
    res.status(201).json({
      data: [user]
    });
  } catch (e) {
    next(e);
  }
});

router.route("/login").post(async (req, res, next) => {
  try {
    const user = await userService.isUser(req.body.data);
    if (user) {
      if (user.active) {
        const token = await tokenService.issueToken(user);
        res.status(200).json({
          data: {
            token,
            id: user._id
          }
        });
      } else {
        res
          .status(400)
          .statusMessage(
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
  const { id } = req.params;
  try {
    const user = await userService.getUserById(id);
    res.status(200).json({
      data: user
    });
  } catch (e) {
    next(e);
  }
});

router.route("/:id").put(async (req, res) => {
  const { id: user } = req.params;
  const {
    username,
    realName,
    newPassword,
    oldPassword,
    country,
    email,
    token
  } = req.body;
  const loggedIn = await tokenService.verifyToken(token);
  if (loggedIn) {
    if (oldPassword) {
      const validPassword = await userService.verifyOldPassword(
        user,
        oldPassword
      );
      if (validPassword) {
        const passwordChange = await userService.updatePassword(
          user,
          newPassword
        );
        const userUpdate = await userService.updateUser(
          user,
          realName,
          username,
          country,
          email
        );
        if (userUpdate && passwordChange) {
          res.status(201).json({
            data: userUpdate
          });
        } else {
          res.status(401).statusMessage("User did not update.");
        }
      } else {
        res
          .status(401)
          .statusMessage("Invalid password. Please confirm your old password.");
      }
    } else {
      const userUpdate = await userService.updateUser(
        user,
        realName,
        username,
        country,
        email
      );
      if (userUpdate) {
        res.status(201).json({
          data: userUpdate
        });
      } else {
        res.status(401).statusMessage("User did not update.");
      }
    }
  } else {
    res.status(401).statusMessage("You are not logged in.");
  }
});

router.route("/").get(async (req, res) => {
  const { token, user: id } = req.query;
  const loggedIn = await tokenService.verifyToken(token);
  if (loggedIn) {
    const user = await userService.getUserById(id);
    if (user.role === "Admin") {
      const users = await userService.getAllUsers();
      if (users) {
        res.status(200).json({
          data: users
        });
      }
    } else {
      res.status(503).statusMessage("You are not authorized to view all users");
    }
  } else {
    res.status(400).statusMessage("You are not logged in.");
  }
});

router.route("/role").put(async (req, res) => {
  const { token, user: userId, id, role } = req.body;
  const loggedIn = await tokenService.verifyToken(token);
  if (loggedIn) {
    const user = await userService.getUserById(userId);
    if (user.role === "Admin") {
      const updatedUser = await userService.updateRole(id, role);
      if (updatedUser) {
        res.status(201).json({
          data: updatedUser
        });
      }
    } else {
      res
        .status(503)
        .statusMessage("You are not authorized to update user roles.");
    }
  } else {
    res.status(401).statusMessage("You are not logged in.");
  }
});

router.route("/forgot").post(async (req, res) => {
  const { email } = req.body;
  try {
    const checkUser = await userService.findUser(email);
    if (checkUser) {
      const token = await userService.addValidation();
      const updated = await userService.setForgotToken(checkUser._id, token);
      const messageBody = `
          <h3>NoteZ</h3>
          <h5>Hello ${checkUser.username}:</h5>
          <p>It seems you have forgotten your password. Please click <a href="http://localhost:3000/forgot/${token}">here</a> to go in to reset it.</p>
          <p>Regards,<br />The NoteZ Team</p>
        `;
      const mailOptions = {
        from: '"NoteZ" <no-reply@notezapp.com>',
        to: email,
        subject: "Password reset link",
        html: messageBody
      };
      await transport.sendMail(mailOptions, (error, info) => {
        if (error) {
          return console.log(error);
        }
        console.log(`Message sent: ${info.messageId}`);
      });
      res.status(201).json({
        data: updated
      });
    }
  } catch (e) {
    res
      .status(401)
      .statusMessage("No user is associated with this email address.");
  }
});

router.route("/verify").post(async (req, res) => {
  const { key } = req.body;
  const user = await userService.verifyUser(key);
  if (user) {
    res.status(201).json({
      data: user
    });
  } else {
    res.status(401).statusMessage("There was no such token.");
  }
});

router.route("/reset").post(async (req, res) => {
  const { key, password } = req.body;
  try {
    const user = await userService.findUserByResetToken(key);
    if (user) {
      console.log(user._id);
      const updatedUser = await userService.updatePassword(user._id, password);
      if (updatedUser) {
        res.status(201).json({
          data: updatedUser
        });
      }
    }
  } catch (e) {
    res
      .status(401)
      .statusMessage("Unable to reset password due to invalid token.");
  }
});

exports.router = router;
