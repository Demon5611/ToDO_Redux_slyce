const { WebSocketServer } = require("ws");
const sessionParser = require("../middlewares/sessionParser");

const wsServer = new WebSocketServer({
  noServer: true,
  clientTracking: false,
});

const upgradeCb = (request, socket, head) => {

  sessionParser(request, {}, () => {
    if (!request.session?.user) {
      console.log("❌ no session, rejecting");
      socket.write("HTTP/1.1 401 Unauthorized\r\n\r\n");
      socket.destroy();
      return;
    }

    console.log("✅ session parsed, upgrading...");

    wsServer.handleUpgrade(request, socket, head, (ws) => {
      wsServer.emit("connection", ws, request);

    });
  });
};

module.exports = { wsServer, upgradeCb };
