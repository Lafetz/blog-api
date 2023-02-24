const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.sign_up = [
  body("username", "username can't be empty").trim().notEmpty().escape(),
  body("password", "password can't be empty").trim().notEmpty().escape(),
  body("confirmPassword", "passwords don't match")
    .trim()
    .notEmpty()
    .custom((value, { req }) => value === req.body.password)
    .escape(),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty) {
      res.status(400).json({
        msg: "validation failed",
        errors: errors.array(),
      });
    }
    bcrypt
      .hash(req.body.password, 10)
      .then((hashedPassword) => {
        const user = new User({
          username: req.body.username,
          password: hashedPassword,
        });

        user
          .save()
          .then((user) => {
            res.status(200).json({ msg: "User created!" });
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  },
];
exports.log_in = [
  body("username", "username can't be empty").trim().notEmpty().escape(),
  body("password", "password can't be empty").trim().notEmpty().escape(),
  async (req, res, next) => {
    try {
      const user = await User.find({ username: req.body.username });

      if (user.length === 0) {
        return res.status(401).json({ msg: "user name not found" });
      }
      bcrypt.compare(req.body.password, user[0].password, (err, result) => {
        if (!result) {
          return res.status(401).json({ msg: "Incorrect password " });
        } else {
          const accessToken = jwt.sign(user[0].toJSON(), process.env.TOP_KEY);
          console.log(accessToken);
          res
            .cookie("token", accessToken, {
              maxAge: 86400 * 1000,
              secure: true,
              httpOnly: true,
            })
            .json(accessToken);
        }
      });
    } catch (err) {
      console.log(err);
    }
  },
];
exports.login_Admin = [
  body("username", "username can't be empty").trim().notEmpty().escape(),
  body("password", "password can't be empty").trim().notEmpty().escape(),
  async (req, res, next) => {
    try {
      const user = await User.find({ username: req.body.username });

      if (user.length === 0) {
        return res.status(401).json({ msg: "user name not found" });
      }
      bcrypt.compare(req.body.password, user[0].password, (err, result) => {
        if (!result) {
          return res.status(401).json({ msg: "Incorrect password " });
        } else {
          if (!user[0].admin) {
            return res.sendStatus(401);
          }
          const accessToken = jwt.sign(user[0].toJSON(), process.env.TOP_KEY);
          res
            .cookie("token", accessToken, {
              maxAge: 86400 * 1000,
              secure: true,
              httpOnly: true,
            })
            .json(accessToken);
        }
      });
    } catch (err) {
      console.log(err);
    }
  },
];
exports.userStatus = (req, res, next) => {
  if (req.user) {
    res.status(200).json(req.user);
  } else {
    res.sendStatus(401);
  }
};
exports.log_out = (req, res, next) => {
  res.clearCookie("token").sendStatus(200);
};
