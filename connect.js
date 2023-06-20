const mongoose = require("mongoose");
mongoose.set("strict", true);

async function connectToMongoDB(url) {
  try {
    await mongoose.connect(url);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error.message);
  }
}

module.exports = {
  connectToMongoDB,
};
