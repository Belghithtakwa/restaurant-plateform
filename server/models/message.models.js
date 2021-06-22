const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MessageSchema = new Schema(
  {
    fullName: { type: String },
    email: { type: String, index: true },
    msg: { type: String },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Message", MessageSchema);
