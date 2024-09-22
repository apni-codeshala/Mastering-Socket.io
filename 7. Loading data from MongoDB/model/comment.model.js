const mongoose = require("mongoose");

const commentSchema = mongoose.Schema({
  user: String,
  comment: String,
});

const Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment;
