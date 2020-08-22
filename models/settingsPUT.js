const mongoose = require("mongoose");

const Settings = new mongoose.Schema({
  defaultDuration: {
    type: String,
    trim: true,
    required: [true, "Please add a defaultDuration."],
  },
});

module.exports = mongoose.model("setting", Settings);
//mongoose.model("DataPoint", EventSchema);
// "dataPoint" is the collection in the mongo data base, And we run it though the
// eventSchema so that it is always looking the same in the data base
