const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const commentSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  blogID: { type: Schema.Types.ObjectId, required: true },
  content: {
    type: String,
    required: true,
  },
  timeStamp: { type: Date, default: Date.now() },
});
commentSchema.pre("save", function (next) {
  next();
});
module.exports = mongoose.model("Comment", commentSchema);
