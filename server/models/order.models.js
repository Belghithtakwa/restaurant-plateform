const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderSchema = new Schema(
  {
    items: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        quantity: { type: Number },
        price: { type: Number },
        totalPrice: { type: Number },
      },
    ],
    client : {type : mongoose.Schema.Types.ObjectId, ref:"Client"}, //TODO: need to solve
    restaurant: {type: mongoose.Schema.Types.ObjectId, ref:"Restaurant"},
    orderType: { type: String }, // delivery, in_place
    state: { type: String, default: "waiting_confirmation" }, //pending, waiting_confirmation, canceled, delivered,
    deliveryAddress: { type: mongoose.Schema.Types.ObjectId, ref: "Address" },
    payed: { type: Boolean, default: false },
    totalPrice: { type: Number },
  },
  { timestamps: true }
);

module.exports = mongoose.models.Order || mongoose.model("Order", OrderSchema);
