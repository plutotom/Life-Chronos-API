const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

function setPassword(value) {
  return bcrypt.hashSync(value, 10);
}

const userModel = new mongoose.Schema({
  email: {
    type: String,
    trim: true,
    required: [true, "Please add a user name."],
    min: 4,
    max: 24,
    toLower: true,
  },
  password: {
    type: String,
    required: [true, "Please add a password."],
    min: 4,
    max: 36,
    set: setPassword,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  settings: {
    type: String,
    default: "2:00",
  },
});

module.exports = mongoose.model("user", userModel);
//mongoose.model("DataPoint", EventSchema);
// "dataPoint" is the collection in the mongo data base, And we run it though the
// eventSchema so that it is always looking the same in the data base
