We can observe the real power of Socket.IO by using it in a multiplayer game. Although there are many examples of multiplayer games we could implement, tic-tac-toe is one of the more simple games.

First, create a server.js file to handle the server-side portion of our game. Make sure that you create an instantiated Socket.IO connection on your server before you add the following code:

```javascript

let players = {}, unmatched;

function joinGame (socket) {
    // Add the player to our object of players
    players[socket.id] = {
        // The opponent will either be the socket that is currently unmatched, or it will be null if no players are unmatched
        opponent: unmatched,
        // The symbol will become 'O' if the player is unmatched
        symbol: 'X',
        // The socket that is associated with this player
        socket: socket
    };
    // Every other player is marked as 'unmatched', which means
    // there is not another player to pair them with yet. As soon
    // as the next socket joins, the unmatched player is paired with
    // the new socket and the unmatched variable is set back to null
    if (unmatched) {
        players[socket.id].symbol = 'O';
        players[unmatched].opponent = socket.id;
        unmatched = null;
    } else {
        unmatched = socket.id;
    }
}

// Returns the opponent socket
function getOpponent (socket) {
    if (!players[socket.id].opponent) {
        return;
    }
    return players[
        players[socket.id].opponent
    ].socket;
}

io.on('connection', function (socket) {
    joinGame(socket);
    // Once the socket has an opponent, we can begin thegame
    if (getOpponent(socket)) {
        socket.emit('game.begin', {
            symbol: players[socket.id].symbol
        });
        getOpponent(socket).emit('game.begin', {
            symbol: players[getOpponent(socket).id].symbol
        });
    }
    // Listens for a move to be made and emits an event to both
    // players after the move is completed
    socket.on('make.move', function (data) {
        if (!getOpponent(socket)) {
            return;
        }
        socket.emit('move.made', data);
        getOpponent(socket).emit('move.made', data);
    });
    // Emit an event to the opponent when the player leaves
    socket.on('disconnect', function () {
        if (getOpponent(socket)) {
            getOpponent(socket).emit('opponent.left');
        }
    });
});
    
```

Then, create an index.html template for a view of our game with the following code:
```html
<div class="board">
    <button id="a0"></button>
    <button id="a1"></button>
    <button id="a2"></button>
    <button id="b0"></button>
    <button id="b1"></button>
    <button id="b2"></button>
    <button id="c0"></button>
    <button id="c1"></button>
    <button id="c2"></button>
    <div id="messages">Waiting for opponent to join...</div>
</div>
```

Now, write the client-side JavaScript to handle the game play, as shown in the following code:

```javascript
let myTurn = true, symbol;

function getBoardState () {
    let obj = {};
    // We will compose an object of all of the Xs and Os that are on the board
    $('.board button').each(function () {
        obj[$(this).attr('id')] = $(this).text() || '';
    });
    return obj;
}

function isGameOver () {
    let state = getBoardState(),
    // One of the rows must be equal to either of these value for the game to be over
    matches = ['XXX', 'OOO'],
    // These are all of the possible combinations that would win the game
    rows = [
        state.a0 + state.a1 + state.a2,
        state.b0 + state.b1 + state.b2,
        state.c0 + state.c1 + state.c2,
        state.a0 + state.b1 + state.c2,
        state.a2 + state.b1 + state.c0,
        state.a0 + state.b0 + state.c0,
        state.a1 + state.b1 + state.c1,
        state.a2 + state.b2 + state.c2
    ];
    // Loop over all of the rows and check if any of them compare to either 'XXX' or 'OOO'
    for (let i=0; i<rows.length; i++) {
        if (rows[i] === matches[0] || rows[i] === matches[1]) {
            return true;
        }
    }
}

function renderTurnMessage () {
    // Disable the board if it is the opponents turn
    if (!myTurn) {
        $('#messages').text('Your opponent\'s turn');
        $('.board button').attr('disabled', true);
        // Enable the board if it is your turn
    } else {
        $('#messages').text('Your turn.');
        $('.board button').removeAttr('disabled');
    }
}

function makeMove (e) {
    e.preventDefault();
    // It's not your turn
    if (!myTurn) {
        return;
    }
    // The space is already checked
    if ($(this).text().length) {
        return;
    }
    // Emit the move to the server
    socket.emit('make.move', {
        symbol: symbol,
        position: $(this).attr('id')
    });
}

// Event is called when either player makes a move
socket.on('move.made', function (data) {
    // Render the move
    $('#' + data.position).text(data.symbol);
    // If the symbol is the same as the player's symbol, we can assume it is their turn
    myTurn = (data.symbol !== symbol);
    // If the game is still going, show who's turn it is
    if (!isGameOver()) {
        renderTurnMessage();
        // If the game is over
    } else {
        // Show the message for the loser
        if (myTurn) {
            $('#messages').text('Game over. You lost.');
            // Show the message for the winner
        } else {
            $('#messages').text('Game over. You won!');
        }
        // Disable the board
        $('.board button').attr('disabled', true);
    }
});

// Set up the initial state when the game begins
socket.on('game.begin', function (data) {
    // The server will asign X or O to the player
    symbol = data.symbol;
    // Give X the first turn
    myTurn = (symbol === 'X');
    renderTurnMessage();
});

// Disable the board if the opponent leaves
socket.on('opponent.left', function () {
    $('#messages').text('Your opponent left the game.');
    $('.board button').attr('disabled', true);
});

$(function () {
    $('.board button').attr('disabled', true);
    $('.board> button').on('click', makeMove);
});

```
