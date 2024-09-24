const express = require("express"),
  app = express(),
  http = require("http"),
  socketIO = require("socket.io");

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

const server = http.Server(app);
server.listen(5000, function () {
  console.log("Server is serving at http://localhost:5000");
});

const io = socketIO(server);
