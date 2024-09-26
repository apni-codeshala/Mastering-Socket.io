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

const sockets = {};

io.on('connection', function (socket) {

    // Emit the connected users when a new socket connects
    for(let i in sockets) {
        /**
         * Here we are not using io.emit else use looping and send the emit why ?
         * One reason is, I doesn't want to emit this event to itself else he will see itself on users liston frontend
         * */
        socket.emit('user.add', {
            username: sockets[i].username,
            id: sockets[i].id
        });
    }

    // Add a new user
    socket.on('username.create', function (data) {
        // We are adding username to socket itself to directly using username with socket
        socket.username = data;
        // Adding socket object containing ids and username with ky as id of socket and value itself as socket object
        sockets[socket.id] = socket;
        io.emit('user.add', {
            username: socket.username,
            id: socket.id
        });
    });

    // Send the hug event to only the socket specified
    socket.on('user.hug', function (id) {
        sockets[id].emit('user.hugged', socket.username);
    });

    // Remve the disconnected users
    socket.on('disconnect', function () {
        delete sockets[socket.id];
        io.emit('user.remove', socket.id);
    });
});