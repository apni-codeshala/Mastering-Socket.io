// Install the ws library first: npm install ws
const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 5000 });

wss.on("connection", function connection(ws) {
  ws.on("message", function incoming(message) {
    console.log("received: %s", message);
    ws.send(`Echo: ${message}`);
  });

  ws.send("Welcome to the WebSocket server!");
});

console.log("WebSocket server is running on ws://localhost:5000");
