Socket.IO uses namespaces to keep separate types of messages from colliding with each other. With namespaces, we can be sure that our applications are listening for the correct events.

We can also define arbitrary rooms that our sockets can join or leave. These rooms restrict someone from receiving messages and send them only to interested parties.

## Creating chat channels with namespaces

Namespaces are a great way to make sure that our Socket.IO events are not emitted globally to all the sockets that are connected to the server. We can send messages to a namespace. Only the sockets listening to this namespace will receive the event.

Many applications have multiple customers that should never be mixed together. In our URLs, we typically show the use of different domains to keep our customers separate so that customer1.website.com has a different result to customer2.website.com. In the same way, our Socket.IO sockets can be namespaced to minimize concerns about intermingling data and messaging.

In this recipe, we will set up two separate groups of chat channels. We can post to either group. The message will be restricted to the namespace for that group.

On the server side of our application, the io.of() method was used to create a namespace. It took a string with the name of the namespace as the first argument. The namespace name was important because we also used it on the client side.

On the client side, we just needed to add the namespace to the end of our first argument in the io() method. In our example, we instantiated the namespace with the port number as io.of('http://localhost:5000/my-namespace'). However, if we were listening on
port 80 instead of port 5000, we could actually just pass the namespace name and not worry about providing the port: io.of('my-namespace').