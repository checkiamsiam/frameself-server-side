const bcrypt = require("bcrypt");

async function beforeSaveUser(next) {
  const hash = await bcrypt.hash(this.password , 10);
  this.password = hash ;
  next();
}

module.exports = beforeSaveUser;
