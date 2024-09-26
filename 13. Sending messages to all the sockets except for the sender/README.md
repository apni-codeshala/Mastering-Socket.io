When a socket sends a message, we don't necessarily want it to receive the message that it
sent. We may want to display a different message to the sender than to the receivers. This can
be accomplished using the socket.broadcast.emit() syntax.