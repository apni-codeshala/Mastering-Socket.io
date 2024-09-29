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

function createNamespace (i) {
    let group = io.of('/group-' + i);
    group.on('connection', function (socket) {
        socket.on('message.send', function (data) {
            console.log(data);
            group.emit('message.sent', data);
        });
    });
}

for (let i=0; i<2; i++) {
    createNamespace(i);
}