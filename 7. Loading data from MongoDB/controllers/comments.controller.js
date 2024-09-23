const Comment = require("../model/comment.model");

module.exports = function (socket) {
  const cursor = Comment.find().cursor();

  cursor
    .eachAsync((comment) => {
      socket.emit("comment.add", comment);
    })
    .catch((err) => {
      console.error(err);
    });
};
