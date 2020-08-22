const jwt = require("jsonwebtoken");
const env = require("dotenv").config();

module.exports = function (req, res, next) {
  const token = req.header("auth-token");
  if (!token) return res.status(400).send("you do not have a toekn");
  try {
    console.log(process.env.TOKEN_SECRET);
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).send("bad token");
  }
};
