const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const blogSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  timeStamp: { type: Date, default: Date.now() },
  content: {
    type: String,
    required: true,
  },
  comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
});
module.exports = mongoose.model("Blog", blogSchema);
