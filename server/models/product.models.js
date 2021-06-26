const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const Schema = mongoose.Schema;
const slug = require("slug");
const ProductSchema = new Schema(
  {
    productName: { type: String, maxlength: 256, minlength: 6 },
    productSlug: {
      type: String,
      maxlength: 512,
      unique: true,
      lowercase: true,
      index: true,
    },
    price: { type: Number },
    description: { type: String, maxlength: 512 },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    image: { type: String },
    restaurant: { type: mongoose.Schema.Types.ObjectId, ref: "Restaurant" },
  },
  { timestamps: true }
);
ProductSchema.plugin(uniqueValidator, { message: "Product not unique" });

ProductSchema.pre("validate", function (next) {
  if (!this.productSlug) {
    this.slugify();
  }
  next();
});

ProductSchema.methods.slugify = function () {
  this.productSlug =
    slug(this.productName) +
    "-" +
    ((Math.random() * Math.pow(36, 6)) | 0).toString(36);
};
module.exports = mongoose.model("Product", ProductSchema);
