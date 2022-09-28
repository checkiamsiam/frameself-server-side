const express = require("express");
const UserModel = require("../models/user.model");
const userRoute = express.Router();

userRoute.post("/", async (req, res) => {
  try {
    const user = new UserModel(req.body);
    await user.save();
    res.send("success");
  } catch (error) {
    res.send(error.message);
  }
});

module.exports = userRoute;
