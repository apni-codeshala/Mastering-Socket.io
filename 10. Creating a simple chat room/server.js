const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const dotenv = require('dotenv');
const fs = require("fs");

const connect = require('./config/dbConfig');
const MessageRepository = require('./repository/message.repository');

const app = express();
dotenv.config();

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

const server = http.Server(app);
server.listen(5000, async function () {
  console.log("Server serving at http://localhost:5000");
  await connect();
});

const io = socketIO(server);
const messageRepository = new MessageRepository();

io.on("connection", async function (socket) {
  const previousMessages = await messageRepository.getAll();
  socket.emit('previous.messages', previousMessages);
  socket.on("message.send", function (data) {
    io.emit("message.send", data);
    messageRepository.create(data);
  });
});
