const mongoose = require("mongoose");
const path = require("path");
const express = require("express");
var cors = require("cors");
const morgan = require("morgan");
const app = express();

app.use(express.static(path.join(__dirname)));

const connectDB = require(path.join(__dirname + "/config/db"));
console.log(path.join(__dirname + "/config/db"));
app.use(cors());
app.use(express.json());

app.use(morgan("production"));
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

connectDB();
//===========================================================================================================================
const { param } = require(path.join(__dirname, "./routes/routes"));
const getDataPoint = require(path.join(__dirname, "./routes/routes"));
app.use("/", getDataPoint);
const usersHandeling = require(path.join(__dirname, "./routes/userRoute"));
app.use("/user", usersHandeling);

const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", function () {
  console.log(`Listening on PORT ${PORT}`);
});
