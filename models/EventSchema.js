const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
  email: { type: String, trim: true },
  title: {
    type: String,
    trim: true,
    required: [true, "Please add a title."],
  },
  event_start: {
    type: String,
    required: [true, "Please add event start time"],
  },
  event_duration: {
    type: String,
    required: [true, "Please add event end time"],
  },
  event_end: {
    type: String,
    required: [true, "Please add how much time you spent"],
  },
  date: {
    type: String,
    required: [true, "Please add data of event"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Entrie", EventSchema);
//mongoose.model("DataPoint", EventSchema);
// "dataPoint" is the collection in the mongo data base, And we run it though the
// eventSchema so that it is always looking the same in the data base
