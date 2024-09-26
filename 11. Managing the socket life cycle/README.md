If our server maintains a list of our connected sockets, it should always be mindful of when a socket disconnects.

A socket can disconnect for any number of reasons:
- The user may navigate away from the web page that the WebSocket connection is on
- The user's Internet may go down

When these things happen, we can tap into the disconnect event to notify the client side that the socket is no longer available.

Although the ID of a socket is primarily available for internal use, when we manage a list of connected users, it can be beneficial to have a record of the socket IDs to associate it with the rendered list in our interface.

In our case, we will use the socket ID as the actual id attribute for our DOM elements. The ID will look similar to a random assortment of numbers and letters (such as AL8r1DvmiQVT50trAAAC). By using the socket ID in tandem with the socket life cycle events, we will be able to show the list of currently active users on the page.