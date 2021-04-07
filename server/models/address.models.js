const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const AddressSchema = new Schema(
  {
    streetName: { type: String, required: true, index: true },
    codeZip: { type: Number, required: true, index: true },
    blockNumber: { type: Number },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Address", AddressSchema);