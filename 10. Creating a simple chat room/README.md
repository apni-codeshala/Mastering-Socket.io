- The server-side code will act as a hub for incoming messages. When new messages come, it will emit them to all connected sockets.

- We will submit the messages from our form on the client side. We will also render new messages when they are emitted from the server. In this way, the client who emits the message will listen for the same message.sent event, as all the other clients.

### Tas to perform from own

```
The messages in this simple example will not be persisted. This means that when the client first loads the page, there will not be any messages in the interface. They will only receive messages when new messages are posted after the page is loaded.

To show all the messages that occurred before the page load, we would need to maintain them somehow and emit them when the socket connection event is fired on the server. For example, we could hold an array of posted messages in the memory and emit them when the page is loaded. The downside to the in-memory approach is that when the server is restarted, all the messages that we previously had in the memory would be lost.

A better approach would be to keep the messages in a database and fetch the previously posted messages when the connection is created.

```