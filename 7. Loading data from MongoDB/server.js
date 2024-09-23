const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const fs = require("fs");
// const connect = require("./config/dbConfig");

const app = express();

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

const server = http.Server(app);
server.listen(5000, async function () {
  console.log("Server serving at http://localhost:5000");
  // await connect();
});

const io = socketIO(server);

io.on("connection", function (socket) {
  const controllers = ["comments"];
  for (let i = 0; i < controllers.length; i++) {
    require("./controllers/" + controllers[i] + ".controller")(socket);
  }
});
