const usernameValidate = require("../helpers/makeUsernameUnique");
const UserModel = require("../models/user.model");

module.exports.addUser = async (req) => {
  const user = new UserModel(req.body);
  const username = await usernameValidate(user);
  user.username = username;
  const savedUserData = await user.save();
  return savedUserData;
};

module.exports.checkVerification = async (id) => {
  const user = await UserModel.findById(id)
  return user.verified
}
module.exports.verifyAccount = async (id) => {
  const user = await UserModel.findByIdAndUpdate(id , {$set : {verified : true}})
  return user
}
