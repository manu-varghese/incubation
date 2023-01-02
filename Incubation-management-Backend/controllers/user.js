const User = require("../models/user");
const asyncHandler = require("express-async-handler");
const { generateToken } = require("../utils/generateToken");
const Application = require("../models/application");
require("dotenv").config();
const bcrypt = require("bcrypt");
const { Types } = require("mongoose");
const multer = require('multer')


const authUser = asyncHandler(async (req, res) => {
  try {
    const { email, password, name } = req.body;
    const user = {
      email,
      password,

      name,
    };
    const alreadyUser = await User.findOne({ email: email });
    if (!alreadyUser) {
      await User(user)
        .save()
        .then((response) => {
          res.status(200).json("done");
        });
    } else {
      res.json("Email already present");
    }
  } catch (error) {
    res.status(error.status).json(error.message);
  }
});

const authorizeUser = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      res.json("User not found");
    } else if (user.isBlocked === true) {
      res.json("You are blocked");
    } else {
      if ((await bcrypt.compare(password, user.password)) != true) {
        res.json("Please check your password");
      } else {
        let id = user._id;
        let tokenGenereted = await generateToken(id);
        res.cookie("jwt", tokenGenereted).json({
          id: user._id,
          name: user.name,
          email: user.email,
          token: tokenGenereted,
        });
      }
    }
  } catch (error) {
    res.send(error.status).json(error.message);
  }
});

const addApplication = asyncHandler(async (req, res) => {
  try {
    let info = await Application(req.body).save();
    // console.log(data);
    res.json({id:info.userId,status:true});
  } catch (error) {
    res.send(error.status).json(error.message);
  }
});

const fetchUser = asyncHandler(async (req, res) => {
  try {
    const userData = await User.find();
    res.json(userData);
  } catch (error) {
    res.send(error.status).json(error.message);
  }
});

const didApply = asyncHandler(async (req, res) => {
  try {
    let id = req.params.id;
    let info = await Application.findOne({ userId: Types.ObjectId(id) });
    if (info) res.json(info);
    else {
      console.log("i have application");
      res.json({ status: false });
    }
  } catch (error) {
    res.status(error.status).json(error.message);
  }
});

const uploadLogo = asyncHandler(async (req, res) => {
  try {
    // multer configaration
    const upload = multer({
      storage: multer.diskStorage({
        destination: "./public/uploads/",
        filename: function (req, file, cb) {
          cb(null, req.imageName);
        },
      }),
    }).single("image");

    req.imageName = `${req.params.id}.jpg`;
    upload(req, res, (err) => {
      console.log(err +"++++++++++++++++");
    });
    //
    res.json("done");
    console.log("Image route end");
  } catch (error) {
    res.status(error.status).json(error.message);
  }
});

module.exports = {
  authUser,
  authorizeUser,
  addApplication,
  fetchUser,
  didApply,
  uploadLogo,
};
