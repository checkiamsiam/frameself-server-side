const handleError = (err, req, res, next) => {
  if (res) {
    if (err.message) {
      res.status(500).send({ success: false, message: err.message });
    } else {
      res.status(500).send({ success: false, message: "there is a server side error" });
    }
  } else {
    console.log(`${err.message}`.red.bold);
  }
};

module.exports = handleError;
