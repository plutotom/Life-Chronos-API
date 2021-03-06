const Entrie = require("../models/EventSchema");
//=============================GetUserEvents========================================
//@des post data for new entrey
// POST /GetUserEvents
// @acces Public, should be account tied
exports.getDataPoint = async (req, res, next) => {
  try {
    console.log(req.body, "should be body");
    const logedInUsersEvents = await Entrie.find({
      email: req.body.email,
    });
    return res.status(200).json({
      success: true,
      data: logedInUsersEvents,
    });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({
      success: false,
      error: "server error",
      message: err.message,
    });
  }
};
//==============================POST=========================================
//@des post data for new entrey
// POST /uploadDataPoint
// @acces Public, should be account tied
exports.addDataPoint = async (req, res, next) => {
  try {
    const { text, amount } = req.body;
    const dataPoints = await Entrie.create(req.body);
    console.log("post running");
    res.status(201).json({
      success: true,
      data: dataPoints,
    });
  } catch (err) {
    if (err.name === "ValidationError") {
      const messages = Object.values(err.errors).map((val) => val.message);

      return res.status(400).json({
        success: false,
        error: messages,
      });
    } else {
      return res.status(500).json({
        success: false,
        error: "Server Error",
      });
    }
  }
};
//===============================PUT=======================================
//@des post data for new entrey
// PUT /uploadDataPoint:id
// @acces Public, should be account tied
exports.editDataPoint = async (req, res, next) => {
  console.log(req.body);
  try {
    const dataToUpdate = Entrie.findById(req.params.id);
    if (!dataToUpdate) {
      return res.status(404).json({
        success: false,
        error: "No item by that id",
      });
    }
    await dataToUpdate.updateOne(req.body);
    // const data = await Entrie.updateOne(req.body);

    return res.status(200).json({
      success: true,
    });
  } catch (err) {
    // console.log(err);
    if (err.name === "ValidationError") {
      const messages = Object.values(err.errors).map((val) => val.message);

      return res.status(400).json({
        success: false,
        error: messages,
      });
    } else {
      return res.status(500).json({
        success: false,
        error: "Server Error",
      });
    }
  }
};
//=================================DELETE=======================================
//@des post data for new entrey
// DELETE /uploadDataPoint/:id
// @acces Public, should be account tied
exports.deleteDataPoint = async (req, res, next) => {
  try {
    const dataToDelete = Entrie.findById(req.params.id);
    if (!dataToDelete) {
      return res.status(404).json({
        success: false,
        error: "No item by that id",
      });
    }
    await dataToDelete.deleteOne();

    return res.status(200).json({
      success: true,
      data: `you ya yeeted: ${req.params.id}!`,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      succcess: false,
      error: err,
    });
  }
};
