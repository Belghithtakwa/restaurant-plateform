const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FeedbackSchema = new Schema(
  {
    client : {type :  mongoose.Schema.Types.ObjectId, ref: "Client"},
    description : {type : String },
  },
  {timestamps : true}
);
 module.exports = mongoose.model("feedback", FeedbackSchema);