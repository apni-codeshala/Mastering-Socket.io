const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
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

io.on("connection", function (socket) {
  setInterval(function () {
    socket.emit("seconds.update", {
      time: new Date(),
    });
  }, 1000);
});
