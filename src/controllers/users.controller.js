const userServices = require("../services/users.services");
var jwt = require('jsonwebtoken');

module.exports.addUser = async (req, res, next) => {
  try {
    const newUser = await userServices.addUser(req);
    var accessToken = jwt.sign({ email : newUser.email , _id : newUser._id }, process.env.TOKEN_SECRET);
    res.send({ success: true, message:  "user registered" , accessToken });
  } catch (error) {
    if(error.keyPattern){
      console.log(error);
      error.keyPattern.email && next(new Error(` " ${error.keyValue.email} " is already registered`));
      error.keyPattern.username && next(new Error(` username :" ${error.keyValue.username} " is already registered`));
      
    }
    next(error);
  }
};
