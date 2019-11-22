const express = require("express");
const router = express.Router();
const userService = require("./userServices");
const tokenService = require("../../utils/tokenService");

router.route("/signup").post(async (req, res, next) => {
  try {
    const user = await userService.createUser(req.body.data);
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
      const token = await tokenService.issueToken(user);
      res.status(200).json({
        data: {
          token,
          id: user._id
        }
      });
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
    if (user.role === admin) {
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

exports.router = router;
