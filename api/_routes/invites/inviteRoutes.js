const express = require("express");
const router = express.Router();
const userService = require("../users/userServices");
const inviteService = require("./inviteServices");
const middleWare = require("../../_middleware");
const { applyMiddleware } = require("../../_utils");

applyMiddleware(middleWare, router);

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
      res.status(201).json({
        data: finished,
      });
    }
  } catch (e) {
    res.status(401).send(e);
  }
});

router.route("/:id").get(async (req, res) => {
  const { id } = req.query;
  // get invite
  try {
    const invite = await inviteService.getInvite(id);
    res.status(200).json({
      data: {
        ...invite,
      },
    });
  } catch (e) {
    res.status(400).send(e);
  }
});

exports.router = router;
