const UserModel = require("../models/user.model");

const usernameValidate = async (user) => {
  const username = user.firstName + user.lastName;
  const isUsernameExist = await UserModel.findOne({ username });
  if (!isUsernameExist) {
    return username;
  } else {
    return username + Math.ceil(Math.random() * 1000);
  }
};

module.exports = usernameValidate;
