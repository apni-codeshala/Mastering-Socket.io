- On the server, we will keep a variable with the number of currently connected sockets. We
will emit an event every time the count changes. This allows you to always have the ability to
display the number of current users on this page.

- To display real-time data with more detailed information, you would need to emit a custom
event from the client instead of just listening for a socket connection. The custom event would
include any information that you could only get from the browser. It may contain the browser
and demographic information that isn't available on the server. Here is an example of a
slightly richer analytics tracking:

```javascript
socket.emit('analytics.log', {
    userAgent: window.navigator.userAgent,
    location: window.location,
    track: !window.navigator.doNotTrack
});
```
