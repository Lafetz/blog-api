const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const commentSchema = new Schema({
  username: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  timeStamp: { type: Date, default: Date.now() },
});
module.exports = mongoose.model("Comment", commentSchema);
