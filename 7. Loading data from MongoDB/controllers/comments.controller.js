const Comment = require("../model/comment.model");

module.exports = function (socket) {
  let stream = Comment.find().stream();
  stream.on("data", function (comment) {
    socket.emit("comment.add", comment);
  });
};
