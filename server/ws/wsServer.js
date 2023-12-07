const WebSocketServer = require("ws");
const sessionParser = require("../middlewares/sessionParser");

const wsServer = new WebSocketServer({
  noServer: true,
  clientTracking: false,
});

const upgradeCb = (request, socket, head) => {
  socket.on("error", (err) => {
    console.log("Socket error:", err);
  });

  console.log("Parsing session from request...");
  sessionParser(request, {}, () => {
    if (!request.session.user) {
      socket.write("HTTP/1.1 401 Unauthorized\n\n");
      socket.destroy();
      return;
    }
    console.log("Session is parsed!");

    socket.removeListener("error", (err) => {
      console.log("Socket error:", err);
    });

    wsServer.handleUpgrade(request, socket, head, (ws) => {
      wsServer.emit("connection", ws, request);
    });
  });
};

module.exports = { upgradeCb, wsServer };
