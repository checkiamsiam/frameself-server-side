const jwt = require('jsonwebtoken');
require("dotenv").config();

const generateToken = (payload , expiresIn) => {
  return jwt.sign(payload , process.env.JWT_TOKEN_SECRET , {expiresIn});
}

module.exports = generateToken ;