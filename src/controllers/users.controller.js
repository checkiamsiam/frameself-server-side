const userServices = require("../services/users.services");
const { sendVerificationEmail } = require("../utils/mailer");
const jwt = require("jsonwebtoken");
const generateToken = require("../utils/tokenGenerator");

module.exports.register = async (req, res, next) => {
  try {
    const newUser = await userServices.addUser(req);
    const emailVerificationToken = generateToken({ email: newUser.email, _id: newUser._id }, "20m");
    await sendVerificationEmail(newUser.email, newUser.firstName, emailVerificationToken);
    const accessToken = generateToken({ email: newUser.email, _id: newUser._id }, "7d");
    res.send({
      success: true,
      message: "registration successful | please activate email",
      accessToken,
      _id: newUser._id,
      username: newUser.username,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      profilePhoto: newUser.lastName,
      verified: newUser.verified,
    });
  } catch (error) {
    if (error.keyPattern) {
      error.keyPattern.email && next(new Error(` " ${error.keyValue.email} " is already registered`));
      error.keyPattern.username && next(new Error(` username :" ${error.keyValue.username} " is already registered`));
    }
    next(error);
  }
};

module.exports.activateAccount = async (req, res, next) => {
  try {
    const { token } = req.body;
    const user = jwt.verify(token, process.env.JWT_TOKEN_SECRET);
    const ifVerified = await userServices.checkVerification(user._id);
    if (ifVerified) {
      res.status(400).send({ success: false, message: "this account is already verified" });
    } else {
      await userServices.verifyAccount(user._id);
      res.send({ success: true, message: "account has been activated" });
    }
  } catch (error) {
    next(error);
  }
};

module.exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await userServices.verifyEmailPassword(email, password, res);
    if (!user) {
      res.status(401).send({success: false , message: "your entire email or password is invalid"})
    } else {
      const accessToken = generateToken({ email: user.email, _id: user._id }, "7d");
      res.send({
        success: true,
        message: "login successful",
        accessToken,
        _id: user._id,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        profilePhoto: user.lastName,
        verified: user.verified,
      });
    }
  } catch (error) {
    next(error);
  }
};
