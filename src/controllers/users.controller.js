const userServices = require("../services/users.services");

module.exports.addUser = async (req, res, next) => {
  try {
    const result = await userServices.addUser(req);
    res.send({ success: true, message:  result});
  } catch (error) {
    if(error.keyPattern){
      console.log(error);
      error.keyPattern.email && next(new Error(` " ${error.keyValue.email} " is already registered`));
      error.keyPattern.username && next(new Error(` username :" ${error.keyValue.username} " is already registered`));
      
    }
    next(error);
  }
};
