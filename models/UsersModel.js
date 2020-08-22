const mongoose = require("mongoose");

const userModel = new mongoose.Schema({
  email: {
    type: String,
    trim: true,
    required: [true, "Please add a user name."],
    min: 4,
    max: 24,
  },
  password: {
    type: String,
    required: [true, "Please add a password."],
    min: 4,
    max: 36,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("user", userModel);
//mongoose.model("DataPoint", EventSchema);
// "dataPoint" is the collection in the mongo data base, And we run it though the
// eventSchema so that it is always looking the same in the data base
