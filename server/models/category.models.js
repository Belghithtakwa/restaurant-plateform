const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const Schema = mongoose.Schema;
const slug = require("slug");
const Product = require("./product.models");
const CategorySchema = new Schema(
  {
    categoryName: { type: String, maxlength: 256, minlength: 6},
    categorySlug: {
      type: String,
      maxlength: 512,
      unique: true,
      lowercase: true,
      index: true,
    },
    description: { type: String, maxlength: 512 },
    restaurant: { type: mongoose.Schema.Types.ObjectId, ref: "Restaurant" },
  },
  { timestamps: true }
);
CategorySchema.plugin(uniqueValidator, { message: "Category not unique" });

CategorySchema.pre("deleteOne", function (next) {
  Product.deleteMany({ category: this._id });
  next()
});
CategorySchema.pre("validate", function (next) {
  if (!this.categorySlug) {
    this.slugify();
  }
  next();
});

CategorySchema.methods.slugify = function () {
  this.categorySlug =
    slug(this.categoryName) +
    "-" +
    ((Math.random() * Math.pow(36, 6)) | 0).toString(36);
};
module.exports = mongoose.model("Category", CategorySchema);
