const fs = require("fs");

const welcome = (req, res, next) => {
  fs.readFile("./public/welcome.html", (err, data) => {
    if (!err) {
      res.set("Content-Type", "text/html");
      res.send(Buffer.from(data) ); // Buffer.from(data) --> (same)  data.toString() 
    } else {
      next(err);
    }
  });
  
};

module.exports = welcome;
