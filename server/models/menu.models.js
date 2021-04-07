const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const Schema = mongoose.Schema;
const slug = require("slug");
const MenuSchema = new Schema({
  menuName: { type: String, maxlength: 256, minlength: 6, unique: true },
  menuSlug: {
    type: String,
    maxlength: 512,
    unique: true,
    lowercase: true,
    index: true,
  },
  description: { type: String, maxlength: 512 },
  isActive: { type: Boolean, default: false },
  categories: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }],
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
});
MenuSchema.plugin(uniqueValidator, { message: "Menu not unique" });

MenuSchema.pre("validate", function (next) {
  if (!this.menuSlug) {
    this.slugify();
  }
  next();
});

MenuSchema.methods.slugify = function () {
  this.menuSlug =
    slug(this.menuName) +
    "-" +
    ((Math.random() * Math.pow(36, 6)) | 0).toString(36);
};
module.exports = mongoose.model("Product", MenuSchema);
