var express = require("express");
var router = express.Router();
const path = require("path");
const { withJWTAuthMiddleware } = require("express-kun");

const {
  getDataPoint,
  addDataPoint,
  editDataPoint,
  deleteDataPoint,
} = require(path.join(__dirname, "../controllers/eventController"));

router.route("/uploadDataPoint").get(getDataPoint).post(addDataPoint);
router.route("/uploadDataPoint/:id").put(editDataPoint).delete(deleteDataPoint);

const { getSettings, editSettigns, AddSettings } = require(path.join(
  __dirname,
  "../controllers/settingsController"
));

router.route("/settings").get(getSettings);
router.route("/settings/update").put(editSettigns);
router.route("/settings/post").post(AddSettings); //Should never be used

// const {
//   postLogin,
//   postRegister,
//   getUserinfo,
// } = require("../controllers/userController");

// const verify = require("../validation/verifyToekn");
// console.log(process.env.TOKEN_SECRET);
// const protectedRouter = withJWTAuthMiddleware(
//   router,
//   "IAMSCRIECTfsdafsdafsdafsd"
// );

// router.route("/login").post(postLogin);
// router.route("/register").post(postRegister);
// protectedRouter.get("/user", getUserinfo);

// router.get("/protected", verify, (req, res) => {
//   res.send(req.user);
// });

router.get("/", (req, res) => {
  res.send("I am working, just a test route at '/'").status(200);
});

module.exports = router;
