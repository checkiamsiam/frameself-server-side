const UserModel = require("../models/user.model");

const usernameValidate = async (user) => {
  const username = user.firstName + user.lastName;
  const isUsernameExist = await UserModel.find({ username: { $regex: new RegExp(username, "i") } }).count();
  if (!isUsernameExist) {
    return username;
  } else {
    return username + isUsernameExist + Math.ceil(Math.random());
  }
};

module.exports = usernameValidate;