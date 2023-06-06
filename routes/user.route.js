const express = require("express");
require("dotenv").config();
const { userController } = require("../controllers/user.controller");

const userRouter = express.Router();

userRouter.get("/", userController.getusers);

userRouter.post("/register", userController.register);

userRouter.post("/login", userController.login);

module.exports = {
  userRouter,
};
