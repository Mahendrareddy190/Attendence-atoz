const express = require("express");
const router = express.Router();
// const bcrypt = require("bcrypt");
const bcrypt = require("bcryptjs");
const userSchema = require("../models/user");
const jwt = require("jsonwebtoken");
const {
  userids,
  getss,
  getTokenFromUser,
  verifyUserEmail,
} = require("../controlls/user");
const { check, validationResult } = require("express-validator");
const nodemailer = require("nodemailer");

router.param("token", getTokenFromUser);
router.get("/confirmation/:token", verifyUserEmail);
router.param("userId", userids);

router.get("/getuser/:userId", getss);

//sing in
router.post("/signin", (req, res, next) => {
  let getUser;
  [
    check("email", "Email is required").isEmail(),
    check("password", "password should be atleast 3 char").isLength({ min: 3 }),
  ],
    userSchema
      .findOne({
        email: req.body.email,
      })
      .then((user) => {
        if (!user) {
          return res.status(401).json({
            error: "auth fail",
          });
        }
        getUser = user;

        if (getUser.verify === false) {
          return res.status(400).json({
            error: "plsease, verify your email before login",
          });
        }
        return bcrypt.compare(req.body.password, user.password);
      })
      .then((response) => {
        if (!response) {
          return res.status(401).json({ error: "failed" });
        }
        let jwtToken = jwt.sign(
          {
            email: getUser.email,
            userId: getUser._id,
          },

          "longer-secret-is-better",
          {
            expiresIn: "1h",
          }
        );

        res
          .status(200)
          .json({
            token: jwtToken,
            expiresIn: 3600,
            msg: getUser,
          })
          .catch((err) => {
            return res.status(401).json({
              error: "failed..",
            });
          });
      });
});

//signup
router.post("/signup", (req, res, next) => {
  [
    check("userName", "name should be atleast three characters").isLength({
      min: 3,
    }),
    check("email", "Email is required").isEmail(),
    check("password", "password should be atleast three characters").isLength({
      min: 3,
    }),
  ],
    bcrypt.hash(req.body.password, 10).then((hash) => {
      const user = new userSchema({
        name: req.body.name,
        email: req.body.email,
        password: hash,
      });

      user.save((err, user) => {
        if (err && !res) {
          return err.status(400).json({
            error: "Not able to save user in the DB",
          });
        } else {
          res.json({ message: "successfully saved" });
        }
        const email = req.body.email;
        let transpoter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: "perammahendra60@gmail.com",
            pass: "mahimahi11111",
          },
        });

        const emailToken = jwt.sign(
          {
            _id: user._id,
          },
          process.env.ACTIVATION,
          {
            expiresIn: "20m",
          }
        );

        const url = `api/confirmation/${emailToken}`;

        transpoter.sendMail(
          {
            from: "perammahendra60@gmail.com",
            to: email,
            subject: "Attendence signin confirmation",
            html: `Please, click this link to confirm your email:<a href="${url}">${url}</a>`,
          },
          (err, res) => {
            if (err) {
            }
            res.json({
              name: user.name,
              email: user.email,
              id: user._id,
              message: "Email sent successfully",
            });
          }
        );
      });
    });
});

router.get("/gets", (req, res) => {
  userSchema.find().exec((err, users) => {
    if (err) {
      return res.status(400).json({
        message: "cant get user",
      });
    }
    res.json(users);
  });
});

module.exports = router;
