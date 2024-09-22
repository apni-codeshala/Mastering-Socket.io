const express = require("express");
const socketIO = require("socket.io");
const http = require("http");
const fs = require("fs");

const app = express();

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

const server = http.Server(app);
server.listen(5000, function () {
  console.log("Server serving at http://localhost:5000");
});

const io = socketIO(server);
const sockets = [];

io.on("connection", function (socket) {
  sockets.push(socket);
  socket.on("message", function (message) {
    for (var i = 0; i < sockets.length; i++) {
      sockets[i].send(message);
    }
  });
  socket.on("disconnect", function () {
    console.log("The socket disconnected");
    // We nood to remove the disconnecting socket form array, eitherwe send message to the disconnected network so it was loss for us
    for (var i = 0; i < sockets.length; i++) {
      if (sockets[i].id === socket.id) {
        sockets.splice(i, 1);
      }
    }
    console.log(
      "The socket disconnected. There are " +
        sockets.length +
        " connected sockets",
    );
  });
});
