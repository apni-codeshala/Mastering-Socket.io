1. Sending a WebSocket message from the client only requires the data as a single
argument.

2. This means that you have to format your WebSocket data in such a way that you
can easily determine what it is for.

3. If you want to emulate the ease of sending a message without a topic, you can use the
socket.send() method to send messages as needed. And we get message on other side using `socket.on('message')`

4. The socket.send(...) method is a shortcut for socket.emit('message', ...)
