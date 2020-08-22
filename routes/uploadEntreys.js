var express = require("express");
var router = express.Router();

const {
  getDataPoint,
  addDataPoint,
  editDataPoint,
  deleteDataPoint,
} = require("../controllers/dataPoint");

router.route("/").get(getDataPoint).post(addDataPoint);

router.route("/:id").put(editDataPoint).delete(deleteDataPoint);

module.exports = router;
