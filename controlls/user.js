const userSchema = require("../models/user");
const jwt = require("jsonwebtoken");
exports.userids = (req, res, next, Id) => {
  userSchema.findById(Id).exec((err, use) => {
    if (err || !use) {
      return res.status(400).json({ message: "cant save in to database" });
    }
    req.userSchema = use;
    next();
  });
};
exports.getss = (req, res) => {
  return res.json(req.userSchema);
};

exports.verifyUserEmail = (req, res) => {
  console.log(req.proflie._id);
  userSchema
    .where("_id", req.proflie._id).updateOne({ $set: { verify: true } }, (err, user) => {
      if (err) {
        return res.status(400).json({
          error: "user need to confirm his email",
        });
      }
      return res.status(200).json({
        message: "email conformation done",
      });
    });
};

exports.getTokenFromUser = (req, res, next, token) => {
  userSchema
    .findById(
      jwt.verify(token, process.env.ACTIVATION, (err, info) => {
        if (err) {
          return res.status(400).json({
            error: "invalid token",
          });
        }
        return info._id;
      })
    )
    .exec((err, user) => {
      if (err || !user) {
        return res.status(400).json({
          error: "plsease ,signup first!",
        });
      }
      req.proflie = user;
      next();
    });
};
