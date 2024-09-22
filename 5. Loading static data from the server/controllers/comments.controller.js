const comments = [
  {
    user: "Batman",
    comment: "Great post!",
  },
  {
    user: "Robin",
    comment: "Interesting ideas...",
  },
  {
    user: "Joker",
    comment: "Thanks, Batman!",
  },
  {
    user: "Bruce Wayne",
    comment: "I agree with Batman",
  },
];

module.exports = function (socket) {
  // Recent comments
  for (let i = 0; i < comments.length; i++) {
    socket.emit("comment.add", comments[i]);
    socket.emit("comment.count", {
      count: i + 1,
    });
  }
};
