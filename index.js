const express = require("express");
const app = express();
const cors = require("cors");
const routes = require("./app");
const handleError = require("./src/middleware/errorHandler");
require("dotenv").config();
const colors = require("colors");
const dbConnect = require("./src/utils/dbConnection");
const welcome = require("./src/middleware/welcome");
const port = process.env.PORT || 5000;

// primary global middleware
app.use(cors());
app.use(express.json());

//db connection
dbConnect();

// api routes
app.use("/api/v1", routes);

// welcome route (root)
app.get("/", welcome);

// Not found route catch
app.all("*", (req, res) => {
  res.status(404).send({ success: false, message: "request not found" });
});

// global error handler
app.use(handleError);

app.listen(port, () => {
  console.log(`server is running at port ${port}`.yellow.bold);
});

