const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const uniqueValidator = require("mongoose-unique-validator");
const ManagerSchema = new Schema(
  {
    firstName: { type: String, maxlength: 64 },
    lastName: { type: String, maxlength: 64 },
    phoneNumber: {
      type: String,
      maxLength: 16,
      required: true,
      unique: true,
      index: true,
    },
    address: { type: mongoose.Schema.Types.ObjectId, ref: "Address" },
    email: { type: String, required: true, unique: true, index: true },
    restaurants: [{ type: mongoose.Schema.Types.ObjectId, ref: "Restaurant" }],
    password: { type: String, required: true, maxlength: 1024 },
    isManager: { type: Boolean, default: true },
    isActive: { type: Boolean, default: false },
    isAdmin: {type: Boolean, default: false}
  },
  { timestamps: true }
);
ManagerSchema.plugin(uniqueValidator, { message: "Manager not unique" });
module.exports = mongoose.model("Manager", ManagerSchema);
