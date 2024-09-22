const express = require("express");
const http = require("http");
const fs = require("fs");
const socketIO = require("socket.io");

const app = express();

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

const server = http.Server(app);
server.listen(5000, function () {
  console.log("Server is serving at http://localhost:5000");
});

const io = socketIO(server);

io.on("connection", function (socket) {
  const controllers = ["comments", "posts"];
  for (let i = 0; i < controllers.length; i++) {
    require("./controllers/" + controllers[i] + ".controller")(socket);
  }
});
