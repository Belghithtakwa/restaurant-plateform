const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const RestaurantAddressSchema = new Schema(
  {
    geo: {
      longitude: { type: Number },
      altitude: { type: Number },
    },
    streetName: { type: String, required: true, index: true },
    codeZip: { type: Number, required: true, index: true },
    blockNumber: { type: Number },
  },
  { timestamps: true }
);
module.exports = mongoose.model("RestaurantAddress", RestaurantAddressSchema);
