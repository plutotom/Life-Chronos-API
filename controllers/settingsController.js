const Settings = require("../models/settingsPUT");

//=============================GET========================================
exports.getSettings = async (req, res, next) => {
  try {
    const settings = await Settings.find();

    defaultDuration = settings[0].defaultDuration;
    return res.status(200).json({
      success: true,
      defaultDuration,
      settings,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "server error",
    });
  }
};

//===============================PUT=======================================
exports.editSettigns = async (req, res, next) => {
  console.log(req.body);
  try {
    await Settings.updateOne(req.body);
    // const data = await Settings.updateOne(req.body);

    return res.status(200).json({
      success: true,
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
//==============================POST=========================================
// should not be used, only here for testing and learning
exports.AddSettings = async (req, res, next) => {
  try {
    console.log(req.body);
    const { defaultDuration } = req.body;
    const newSetting = await Settings.create(req.body);

    res.status(201).json({
      success: true,
      data: newSetting,
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
