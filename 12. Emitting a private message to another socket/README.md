Sometimes, you need to send a private message to just one other socket and not every socket that may be listening in. As the server side is in charge of managing all the connected sockets, we can specify the sockets that our events are emitted to granularly.

In this recipe, we will use this ability to create a simple app. Here, the user can specify which user to give a hug to. Only the giver and receiver will be aware that the hug was initiated.

To send private messages using Socket.IO, follow these steps:

1. Add the relevant events to your server. These will be in charge of managing a list of connected users and emitting private messages to users (as required).