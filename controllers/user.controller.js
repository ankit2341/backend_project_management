const bcrypt = require("bcrypt");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const { UserModel } = require("../models/user.model");

const userController = {
  getusers: async (req, res) => {
    try {
      const users = await UserModel.find();
      res.status(200).send(users);
    } catch (err) {
      res.status(404).send({
        Success: "false",
        Message: "Error connecting api",
      });
    }
  },

  register: async (req, res) => {
    const { email, password } = req.body;
    try {
      if (password.length < 8) {
        return res.status(404).send({
          Success: "false",
          Message: "Password must be of 8 characters",
        });
      }
      const users = await UserModel.find({ email });
      if (users.length > 0) {
        res.status(200).send({
          Success: "false",
          Message: "Email already registered",
        });
      } else {
        bcrypt.hash(password, 5, async (err, secured_pass) => {
          if (err) {
            res.status(404).send({
              Success: "false",
              Message: "Registration failed",
            });
          } else {
            const user = new UserModel({
              email,
              password: secured_pass,
            });
            await user.save();
            res.status(200).send({
              Success: "true",
              Message: "Registration success",
            });
          }
        });
      }
    } catch (err) {
      res.status(404).send({
        Success: "false",
        Message: "Error connecting api",
      });
    }
  },

  login: async (req, res) => {
    const { email, password } = req.body;
    try {
      if (password.length < 8) {
        return res.status(404).send({
          Success: "false",
          Message: "Password must be of 8 characters",
        });
      }
      const user = await UserModel.find({ email });
      const hashed_pass = user[0].password;
      if (user.length > 0) {
        bcrypt.compare(password, hashed_pass, (err, result) => {
          if (result) {
            const token = jwt.sign({ course: "backend" }, process.env.secret);
            res.status(200).send({
              Success: "true",
              token: `${token}`,
              Message: "Valid User",
            });
          } else {
            res.status(404).send({
              Success: "false",
              Message: "Invalid User",
            });
          }
        });
      } else {
        res.status(200).send({
          Success: "false",
          Message: "User not registered",
        });
      }
    } catch (err) {
      res.status(404).send({
        Success: "false",
        Message: "Error connecting api",
      });
    }
  },
};

module.exports = {
  userController,
};
