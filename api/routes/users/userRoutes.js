const express = require("express");
const router = express.Router();
const userService = require("./userServices");
const tokenService = require("../../utils/tokenService");
const nodemailer = require("nodemailer");
const { MAILSERVER } = require("../../utils/constants");
const middleWare = require("../../middleware");
const { applyMiddleware } = require("../../utils");

applyMiddleware(middleWare, router);

const transport = nodemailer.createTransport(MAILSERVER);

router.route("/signup").post(async (req, res, next) => {
  try {
    const newUser = req.body.data;
    const { language } = req.params;
    newUser.verification = await userService.addValidation();
    const user = await userService.createUser(newUser);
    const messageBody_en = `
      <h3>NoteZ</h3>
      <h5>Welcome to NoteZ, ${newUser.username}!</h5>
      <p>We're happy to have you. Please click <a href="http://localhost:3000/verify/${newUser.verification}">here</a> to get underway.</p>
      <p>Regards,<br />The NoteZ Team</p>
    `;
    const mailOptions_en = {
      from: '"NoteZ" <no-reply@notezapp.com>',
      to: newUser.email,
      subject: "Welcome to NoteZ!",
      html: messageBody_en
    };
    const messageBody_ja = `
      <h3>ノートZ</h3>
      <h5>ノートZへようこそ、${newUser.username}！</h5>
      <p>喜んでお迎えします。 <a href="http://localhost:3000/verify/${newUser.verification}">ここを</a>クリックして開始してください。</p>
      <p>よろしく、<br />ノートZチーム</p>
    `;
    const mailOptions_ja = {
      from: '"ノートZ" <no-reply@notezapp.com>',
      to: newUser.email,
      subject: "ノートZへようこそ！",
      html: messageBody_ja
    };
    const messageBody_ko = `
      <h3>노트Z</h3>
      <h5>노트Z 오신 것을 환영합니다, ${newUser.username}!</h5>
      <p>기꺼이 맞이합니다. <a href="http://localhost:3000/verify/${newUser.verification}">여기를</a> 클릭하여 시작하십시오.</p>
      <p>감사합니다,<br />노트Z 팀</p>
    `;
    const mailOptions_ko = {
      from: '"노트Z" <no-reply@notezapp.com>',
      to: newUser.email,
      subject: "노트Z 오신 것을 환영합니다!",
      html: messageBody_ko
    };
    const messageBody_cn = `
      <h3>笔记Z</h3>
      <h5>欢迎使用笔记Z，${newUser.username}！</h5>
      <p>我们很高兴欢迎您。单击<a href="http://localhost:3000/verify/${newUser.verification}">此处</a>开始。</p>
      <p>我们的问候，<br />笔记Z团队</p>
    `;
    const mailOptions_cn = {
      from: '"笔记Z" <no-reply@notezapp.com>',
      to: newUser.email,
      subject: "欢迎使用笔记Z！",
      html: messageBody_cn
    };
    const messageBody_tw = `
      <h3>筆記Z</h3>
      <h5>歡迎使用筆記Z，${newUser.username}！</h5>
      <p>我們很高興歡迎您。單擊<a href="http://localhost:3000/verify/${newUser.verification}">此處</a>開始。</p>
      <p>我們的問候，<br />筆記Z團隊</p>
    `;
    const mailOptions_tw = {
      from: '"笔记Z" <no-reply@notezapp.com>',
      to: newUser.email,
      subject: "欢迎使用笔记Z！",
      html: messageBody_tw
    };
    const messageBody_hk = `
      <h3>筆記Z</h3>
      <h5>歡迎使用筆記Z，${newUser.username}！</h5>
      <p>我哋好開心歡迎你。單擊<a href="http://localhost:3000/verify/${newUser.verification}">此處</a>開始。</p>
      <p>我哋嘅打招呼，<br />筆記Z團隊</p>
    `;
    const mailOptions_hk = {
      from: '"笔记Z" <no-reply@notezapp.com>',
      to: newUser.email,
      subject: "欢迎使用笔记Z！",
      html: messageBody_hk
    };
    let mailOptions = {};
    if (language === "ja") {
      mailOptions = mailOptions_ja;
    } else if (language === "ko") {
      mailOptions = mailOptions_ko;
    } else if (language === "zh-CN") {
      mailOptions = mailOptions_cn;
    } else if (language === "zh-TW") {
      mailOptions = mailOptions_tw;
    } else if (language === "zh-HK") {
      mailOptions = mailOptions_hk;
    } else {
      mailOptions = mailOptions_en;
    }
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
          res.status(401).send("User did not update.");
        }
      } else {
        res
          .status(401)
          .send("Invalid password. Please confirm your old password.");
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
        res.status(401).send("User did not update.");
      }
    }
  } else {
    res.status(401).send("You are not logged in.");
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
      res.status(503).send("You are not authorized to view all users");
    }
  } else {
    res.status(400).send("You are not logged in.");
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
      res.status(503).send("You are not authorized to update user roles.");
    }
  } else {
    res.status(401).send("You are not logged in.");
  }
});

router.route("/forgot").post(async (req, res) => {
  const { email, language } = req.body;
  try {
    const checkUser = await userService.findUser(email);
    if (checkUser) {
      const token = await userService.addValidation();
      const updated = await userService.setForgotToken(checkUser._id, token);
      const messageBody_en = `
        <h3>NoteZ</h3>
        <h5>Hello ${checkUser.username}:</h5>
        <p>It seems you have forgotten your password. Please click <a href="http://localhost:3000/forgot/${token}">here</a> to go in to reset it.</p>
        <p>Regards,<br />The NoteZ Team</p>
      `;
      const mailOptions_en = {
        from: '"NoteZ" <no-reply@notezapp.com>',
        to: email,
        subject: "Password reset link",
        html: messageBody_en
      };
      const messageBody_ja = `
        <h3>ノートZ</h3>
        <h5>こんにちは${checkUser.username}:</h5>
        <p>パスワードを忘れたようです。<a href="http://localhost:3000/forgot/${token}">ここを</a>クリックしてリセットしてください。</p>
        <p>よろしく、<br />ノートZチーム</p>
      `;
      const mailOptions_ja = {
        from: '"ノートZ" <no-reply@notezapp.com>',
        to: email,
        subject: "パスワードリセットリンク",
        html: messageBody_ja
      };
      const messageBody_ko = `
        <h3>노트Z</h3>
        <h5>안녕하세요 ${checkUser.username}:</h5>
        <p>비밀번호를 잊어 같습니다. <a href="http://localhost:3000/forgot/${token}">여기를</a> 클릭하여 재설정하십시오.</p>
        <p>감사합니다,<br />노트Z 팀</p>
      `;
      const mailOptions_ko = {
        from: '"노트Z" <no-reply@notezapp.com>',
        to: email,
        subject: "암호 재설정 링크",
        html: messageBody_ko
      };
      const messageBody_cn = `
        <h3>笔记Z</h3>
        <h5>你好${checkUser.username}:</h5>
        <p>你好像忘记了密码。 单击<a href="http://localhost:3000/forgot/${token}">此处</a>重置。</p>
        <p>我们的问候，<br />笔记Z团队</p>
      `;
      const mailOptions_cn = {
        from: '"笔记Z" <no-reply@notezapp.com>',
        to: email,
        subject: "密码重置链接",
        html: messageBody_cn
      };
      const messageBody_tw = `
        <h3>筆記Z</h3>
        <h5>你好${checkUser.username}:</h5>
        <p>你好像忘記了密碼。 單擊<a href="http://localhost:3000/forgot/${token}">此處</a>重置。</p>
        <p>我們的問候，<br />筆記Z團隊</p>
      `;
      const mailOptions_tw = {
        from: '"筆記Z" <no-reply@notezapp.com>',
        to: email,
        subject: "密码重置链接",
        html: messageBody_tw
      };
      const messageBody_hk = `
        <h3>筆記Z</h3>
        <h5>你好${checkUser.username}:</h5>
        <p>你好似唔記得咗密碼。 單擊<a href="http://localhost:3000/forgot/${token}">此處</a>重置。</p>
        <p>我哋嘅打招呼，<br />筆記Z團隊</p>
      `;
      const mailOptions_hk = {
        from: '"筆記Z" <no-reply@notezapp.com>',
        to: email,
        subject: "密码重置链接",
        html: messageBody_hk
      };
      let mailOptions = {};
      if (language === "ja") {
        mailOptions = mailOptions_ja;
      } else if (language === "ko") {
        mailOptions = mailOptions_ko;
      } else if (language === "zh-CN") {
        mailOptions = mailOptions_cn;
      } else if (language === "zh-TW") {
        mailOptions = mailOptions_tw;
      } else if (language === "zh-HK") {
        mailOptions = mailOptions_hk;
      } else {
        mailOptions = mailOptions_en;
      }
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
    res.status(401).send("No user is associated with this email address.");
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
    res.status(401).send("There was no such token.");
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
    res.status(401).send("Unable to reset password due to invalid token.");
  }
});

exports.router = router;
