const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/user");

const config = process.env;

const verifyToken = (req, res, next) => {
  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(token, config.ACCESS_TOKEN_SECRET, async (err, decodedToken) => {
      if (err) {
        res.json({ status: false });
        // next();
      } else {
        const user = await User.findById(decodedToken.id);
        console.log(user);
        if (user) {
          console.log("im njan user true");
          res.json({ status: true, user: user.email ,token:token});
        } else {
          res.json({ status: false });
        }
        // next();
      }
    });
  } else {
    res.json({ status: false });
    // next();
  }
};

const verify = (req, res, next) => {
  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(token, config.ACCESS_TOKEN_SECRET, async (err, decodedToken) => {
      if (err) {
        res.json({ status: false });
        next();
      } else {
        const user = await User.findById(decodedToken.id);
        console.log(user);
        if (user) {
          console.log("im njan user true");
          res.json({ status: true, user: user.email });
          // next();
        } else {
          res.json({ status: false });
        }
        next();
      }
    });
  } else {
    res.json({ status: false });
    next();
  }
};

module.exports = { verifyToken ,verify};
