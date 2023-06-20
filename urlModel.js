const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema(
  {
    shortId: {
      type: String,
      required: true,
      unique: true,
    },
    redirectURL: {
      type: String,
      required: true,
    },
    note: {
      type: String,
      required: false, // Make the note field optional
    },
    visitHistory: [{
      timestamp: {
        type: Date,
        default: Date.now
      }
    }],
  },
  { timestamps: true }
);

const URL = mongoose.model("URL", urlSchema);

module.exports = URL;
