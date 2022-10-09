const express = require("express");
const userController = require("../controllers/users.controller");
const userRoute = express.Router();

userRoute.post("/register", userController.register);
userRoute.put("/activate/", userController.activateAccount);

module.exports = userRoute;
