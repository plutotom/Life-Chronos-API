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

const protectedRouter = withJWTAuthMiddleware(
  router,
  process.env.JWT_SECRET || "IAMSCRIECTfsdafsdafsdafsd"
);

protectedRouter.post("/GetUserEvents", getDataPoint);
protectedRouter.post("/uploadDataPoint", addDataPoint);
protectedRouter.put("/uploadDataPoint/:id", editDataPoint);
protectedRouter.delete("/uploadDataPoint/:id", deleteDataPoint);

const { getSettings, editSettigns, AddSettings } = require(path.join(
  __dirname,
  "../controllers/settingsController"
));

router.get("/settings", getSettings);
router.put("/settings/update", editSettigns);
router.post("/settings/post", AddSettings);
// ^ Should never be used, Only here for testing and first time adding settings.
// needs to be depercated

router.get("/", (req, res) => {
  res.send("I am working, just a test route at '/'").status(200);
});

module.exports = router;
