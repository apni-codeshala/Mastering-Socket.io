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
  });
});
