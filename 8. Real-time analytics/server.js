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
let currentUsers = []; // Fixed typo

io.on("connection", function (socket) {
  count++;
  /**
   * If we socket.emit() in place of io.emit
   * Than only recently connected users get the recent number of user and old pages will not get the live info
   * So to send the recent data to every one user io.emit()
   */
  // socket.emit("user.count", count);
  io.emit("user.count", count);

  socket.on("analytics.log", function (analytics) {
    const newInfo = {
      ...analytics,
      socketId: socket.id, // Correctly using socket.id
    };
    currentUsers.push(newInfo);
    io.emit("newuser", currentUsers);
  });

  socket.on("disconnect", function () {
    count--;
    // Remove the user from currentUsers based on socket.id
    io.emit("removeuser", socket.id);
    currentUsers = currentUsers.filter((user) => user.socketId !== socket.id);
    io.emit("user.count", count);
  });
});
