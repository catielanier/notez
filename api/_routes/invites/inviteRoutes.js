const express = require("express");
const router = express.Router();
const userService = require("../users/userServices");
const inviteService = require("./inviteServices");

router.route("/").post(async (req, res) => {
  const { email } = req.body.data;
  try {
    Promise.all(async () => {
      // check the user database for an existing user with the email address.
      const user = await userService.findUser(email);
      // if they exist, throw error
      if (user) {
        res
          .status(401)
          .send({ e: { message: "A user with this email already exists." } });
      }
      // if it doesn't exist, save invite to invite collection.
      const newInvite = {
        email,
      };
      const finished = await inviteService.createInvite(newInvite);
      // send email invite using id as link.

      res.status(201);
    });
  } catch (e) {
    res.status(401).send(e);
  }
});
