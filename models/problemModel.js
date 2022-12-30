const mongoose = require("mongoose");
const url = require("mongoose-type-url");
const Schema = mongoose.Schema;

const problemSchema = new Schema(
  {
    date: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    link: {
      type: url,
      required: true,
    },
    platform: {
      type: String,
      required: true,
    },
    difficulty: {
      type: String,
      required: true,
    },
    topic: {
      type: String,
      required: true,
    },
    helpUsed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// every problem has a unique link

module.exports = mongoose.model("Problem", problemSchema);
