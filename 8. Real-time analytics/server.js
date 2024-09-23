const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const fs = require("fs");
const { disconnect } = require("process");

const app = express();

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

const server = http.Server(app);
server.listen(5000, function () {
  console.log("Server serving at http://localhost:5000");
});

const io = socketIO(server);

let count = 0;
io.on("connection", function (socket) {
  count++;
  /**
   * If we socket.emit() in place of io.emit
   * Than only recently connected users get the recent number of user and old pages will not get the live info
   * So to send the recent data to every one user io.emit()
   */
  // socket.emit("user.count", count);
  io.emit("user.count", count);
  socket.on("disconnect", function () {
    count--;
    io.emit("user.count", count);
  });
});
