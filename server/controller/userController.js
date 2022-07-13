const User = require("../models/User");
const jwt = require("jsonwebtoken");
const CryptoJS = require("crypto-js");

const userController = {
  getAllUser: async (req, res) => {
    const query = req.query.new;
    if (req.user.isAdmin) {
      try {
        const users = query ? await User.find().limit(10) : await User.find();
        res.status(200).json(users);
      } catch (error) {
        res.status(500).json(error);
      }
    } else {
      res.status(403).json("You are not allowed to see all users");
    }
  },
  getUser: async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      const { password, ...info } = user._doc;
      res.status(200).json(info);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  updateUser: async (req, res) => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      if (req.body.password) {
        req.body.password = Crypto.AES.encrypt(
          req.body.password,
          process.env.SECRET_KEY
        ).toString();
      }
      try {
        const updatedUser = await User.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updatedUser);
      } catch (error) {
        res.status(500).json(error);
      }
    } else {
      res.status(403).json("You can update only your account");
    }
  },
  deleteUser: async (req, res) => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("Delete Successfully");
      } catch (error) {
        res.status(500).json(error);
      }
    } else {
      res.status(403).json("You can delete only your account");
    }
  },
};

module.exports = userController;
