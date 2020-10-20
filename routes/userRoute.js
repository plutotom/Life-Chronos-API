var express = require("express");
var router = express.Router();
const path = require("path");
const { withJWTAuthMiddleware } = require("express-kun");

const {
  postLogin,
  postRegister,
  GETAllUsers,
  GETUser,
  getUserinfo, // < this is a test route
} = require("../controllers/userController");

router.post("/login", postLogin);

const protectedRouter = withJWTAuthMiddleware(
  router,
  process.env.JWT_SECRET || "IAMSCRIECTfsdafsdafsdafsd"
);

router.post("/register", postRegister);
router.post("/login", postLogin);
protectedRouter.get("/", GETAllUsers);
protectedRouter.get("/:id", GETUser);

//! my attemt at a protected route
// const verify = require("../validation/verifyToekn");
// console.log(process.env.TOKEN_SECRET);
// const protectedRouter = withJWTAuthMiddleware(
//   router,
//   "IAMSCRIECTfsdafsdafsdafsd"
// );
// protectedRouter.get("/user", getUserinfo);
// router.get("/protected", verify, (req, res) => {
//   res.send(req.user);
// });

module.exports = router;
