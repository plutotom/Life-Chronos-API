const mongoose = require("mongoose");
const path = require("path");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      process.env.MONGODB_URI ||
        "mongodb+srv://plutotom:password@123@lifechronoscluster.jfvey.mongodb.net/chronosHere?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
      }
    );

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.log(`Error: ${err.message}`, "Failed to connect to mongo server");
    process.exit(1);
  }
};

module.exports = connectDB;
