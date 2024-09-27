const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const fs = require('fs');

const app = express();

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

const server = http.Server(app);
server.listen(5000, function () {
    console.log('Server is serving at http://localhost:5000');
});

const io = socketIO(server);

io.on('connection', function (socket) {
    socket.on('user.join', function (data) {
        socket.broadcast.emit('user.joined', data);
    });
}); 