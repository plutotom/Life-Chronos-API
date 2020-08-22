const path = require("path");
const express = require("express");
var cors = require("cors");
const dotenv = require("dotenv");

const morgan = require("morgan");
const connectDB = require("./config/db");
// dotenv.config({ path: "./config/config.env" });

// const jwt = require("express-jwt");
// const jwtAuthz = require("express-jwt-authz");
// const jwksRsa = require("jwks-rsa");

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

const { param } = require("./routes/routes");
const getDataPoint = require("./routes/routes");
app.use("/", getDataPoint);

// if in dev mode, morgan will log connections to console
// if (process.env.NODE_ENV === "development") {
//   app.use(morgan("dev"));
// }
// if in production mode will look for build react app in client/build
app.use(morgan("production"));
// if (process.env.NODE_ENV === "production") {
// app.use(express.static("../build"));
// // loads react app content from ../build/index.html at path *
// app.get("*", (req, res) =>
//   res.sendFile(path.resolve(__dirname, "../", "build", "index.html"))
// );
// }

const HOST = process.env.HOST || "0.0.0.0";
const PORT = process.env.SERVER_PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
