const express = require("express");
const userController = require("../controllers/users.controller");
const UserModel = require("../models/user.model");
const userRoute = express.Router();

userRoute.post("/", userController.addUser);

module.exports = userRoute;
