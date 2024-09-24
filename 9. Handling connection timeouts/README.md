- When we perform a real-time application development, it is important to be aware of when the server-side WebSocket connection is dropped, and we will no longer be able to communicate with our server. This allows you to provide an offline mode for our apps, where we can keep a record of all the events that need to be emitted to the server once the connection is re-established.

- Socket.IO has some really great built-in functionalities to re-establish the connection once it has been dropped. This is accomplished by creating recurring polling requests to the server until a new connection is found or until the number of reconnection attempts we allow are exceeded.

- All the connection timeout handling will happen on the client side. Socket.IO gives us several socket life cycle events that we can tap into. We can use these events to know when we lose a connection, when we successfully reconnect, and so on. We will use the lifecycle callbacks in our template to listen for socket reconnections.

-We will be able to pass an object of options as our second argument when we call the io() function on the client side.

- By default, the reconnection option is set to true. If we set reconnection to false, Socket.IO will not attempt to reconnect when a connection is dropped.

- The reconnectionDelay option specifies how many milliseconds are allowed to pass before we ping the server for a reconnection. The pinging will continue to take place until the number of reconnectionAttempts we specified is satisfied or until the connection is re-established. By default, the reconnection attempts are set to Infinity.
