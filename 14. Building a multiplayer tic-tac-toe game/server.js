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
let players = {};
let unmatched;

function joinGame(socket) {
    // First task is to add the player to the players object
    players[socket.id] = {
        // The opponent will either be the socket that is currently unmatched, or it will be null if no players are unmatched
        opponent: unmatched,
        // This symbol will become '0' if player is unmatched
        symbol: 'X',
        socket: socket
    };
    // Every other player is marked as 'unmathched', which means there is not another player to pair them with yet. As soon as the next socket joins, the unmatched player is paired with the new socket and the unmatched variable is set back to null
    if (unmatched) {
        players[socket.id].symbol = 'O';
        players[unmatched].opponent = socket.id;
        unmatched = null;
    } else {
        unmatched = socket.id;
    }
    console.log(players);
}

// Return the opponent socket 
function getOpponent (socket) {
    if(!players[socket.id].opponent) {
        return;
    }
    return players[
        players[socket.id].opponent
    ].socket;
}

io.on('connection', function (socket) {
    joinGame(socket);

    // Once the sockethas an opponent, we can begin the game
    if(getOpponent(socket)) {
        socket.emit('game.begin', {
            symbol: players[socket.id].symbol
        });
        getOpponent(socket).emit('game.begin', {
            symbol: players[getOpponent(socket).id].symbol
        });
    }

    // Listen for a move to be made and emit an event to both players after the move is completed
    socket.on('moke.move', function (data) {
        if(!getOpponent(socket)) {
            return;
        }
        socket.emit('move.made', data);
        getOpponent(socket).emit('move.made', data);
    });

    // Emit the event to the opponent when the player leaves
    socket.on('disconnect', function () {
        if (getOpponent(socket)) {
            getOpponent(socket).emit('opponent.left');
        }
    });

});