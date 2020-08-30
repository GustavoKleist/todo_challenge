//DEPENDENCES
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
//MODELS
const User = require("../models/userModel");
//SECRET
const env = require("../../env.json");

exports.user_signup = (req, res) => {
  const { email, password } = req.body;
  User.find({ email: email })
    .exec()
    .then((user) => {
      if (user.length >= 1) {
        return res.status(409).json({
          message: "Mail exists",
        });
      } else {
        bcrypt.hash(password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              error: err,
            });
          } else {
            const user = new User({
              _id: new mongoose.Types.ObjectId(),
              email: email,
              password: hash,
            });
            user
              .save()
              .then(() => {
                res.status(201).json({
                  message: "User Created",
                });
              })
              .catch((err) => {
                res.status(500).json({
                  error: err,
                });
              });
          }
        });
      }
    });
};

exports.user_login = (req, res, next) => {
  const { email, password } = req.body;
  User.find({ email })
    .exec()
    .then((user) => {
      if (user.lenght < 1) {
        return res.status(401).json({
          message: "Auth failed",
        });
      }
      bcrypt.compare(password, user[0].password, (err, result) => {
        if (result) {
          const token = jwt.sign(
            { email: user[0].email, userId: user[0]._id },
            env.JWT_SECRET,
            { expiresIn: "1h" }
          );
          return res.status(200).json({
            message: "Auth Successful",
            token: token,
            email: email,
          });
        } else {
          return res.status(401).json({
            message: "Auth failed",
          });
        }
      });
    })
    .catch((err) => res.status(500).json({ error: err }));
};
