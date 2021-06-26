const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderSchema = new Schema(
  {
    code: { type: String, unique: true, index: true },
    items: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        quantity: { type: Number },
        price: { type: Number },
        totalPrice: { type: Number },
      },
    ],
    client: { type: mongoose.Schema.Types.ObjectId, refPath: "onModel" },
    onModel: { type: String, required: true, enum: ["Client", "Manager"] },
    restaurant: { type: mongoose.Schema.Types.ObjectId, ref: "Restaurant" },
    orderType: { type: String }, // delivery, in_place
    state: { type: String, default: "pending" }, //pending, waiting_confirmation, canceled, delivered, confirmed
    deliveryAddress: { type: mongoose.Schema.Types.ObjectId, ref: "Address" },
    payed: { type: Boolean, default: false },
    totalPrice: { type: Number },
  },
  { timestamps: true }
);

OrderSchema.pre("validate", function (next) {
  if (!this.code) {
    this.generateCode();
  }
  next();
});
OrderSchema.methods.calculateTotal = function () {
  this.totalPrice = 0;
  this.items.forEach((element) => {
    this.totalPrice = element.totalPrice + this.totalPrice;
  });
  return this.save();
};
OrderSchema.methods.generateCode = function () {
  this.code = ((Math.random() * Math.pow(36, 6)) | 0).toString(36);
};
module.exports = mongoose.models.Order || mongoose.model("Order", OrderSchema);
