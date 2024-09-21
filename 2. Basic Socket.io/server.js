const socketIO = require("socket.io");
const http = require("http");
const fs = require("fs");

const server = http.createServer(function (req, res) {
  fs.readFile(__dirname + "/index.html", function (err, data) {
    res.writeHead(200);
    res.end(data);
  });
});
server.listen(5000, function () {
  console.log("Server lisening on: http://localhost:5000");
});

const io = socketIO(server);

io.on("connection", function (socket) {
  socket.emit("greeting-from-server", {
    greeting: "Hello Client",
  });
  socket.on("greeting-from-client", function (message) {
    console.log(message);
  });
});
