let app = require("express")();
let httpServer = require("http").Server(app);
const io = require("socket.io")(httpServer, { cors: { origin: "*", methods: ["GET", "POST"]  }});


io.on("connection", socket => {
  // Log whenever a user connects
  console.log("user connected");
io.emit('userId', socket.id)
//   socket.on("testEvent",function(){
//     io.emit('testEvent','here is random data from server');
//   })
  io.emit('testEvent','Random message from websocket')
  // Log whenever a client disconnects from our websocket server
  socket.on("disconnect", function() {
    console.log("user disconnected");
  });

  // When we receive a 'message' event from our client, print out
  // the contents of that message and then echo it back to our client
  // using `io.emit()`
  socket.on("message", message => {
    console.log("Message Received: " + message);
    io.emit("message", { type: "new-message", text: message });
  });
});

// Initialize our websocket server on port 5000
httpServer.listen(5000, () => {
  console.log("started on port 5000");
});