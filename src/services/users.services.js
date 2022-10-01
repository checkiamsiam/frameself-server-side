const usernameValidate = require("../helpers/makeUsernameUnique");
const UserModel = require("../models/user.model");

module.exports.addUser = async (req) => {
  const user = new UserModel(req.body);
  const username = await usernameValidate(user);
  user.username = username;
  await user.save();
  return "user registered";
};