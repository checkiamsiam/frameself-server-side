const mongoose = require("mongoose");
const handleError = require("../middleware/errorHandler");
require("dotenv").config();

const dbConnect = () => {
  mongoose
    .connect(process.env.DB_URI_ATLAS)
    .then(() => {
      console.log("database connected successfully".yellow.bold);
    })
    .catch((err) => {
      handleError(err);
    });
};

module.exports = dbConnect;
