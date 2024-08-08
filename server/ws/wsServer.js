const WebSocketServer = require("ws");
const sessionParser = require("../middlewares/sessionParser");

const wsServer = new WebSocketServer({
  noServer: true, // указывает, что WebSocket-сервер не должен автоматически создавать собственный HTTP сервер, а будет использовать существующий.
  clientTracking: false // отключает отслеживание клиентов, что может быть полезно для снижения нагрузки.
});

const upgradeCb = (request, socket, head) => {
  socket.on("error", (err) => {
    console.log("upgradeCb BACK:Socket error:", err);
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
      wsServer.emit("WsServer connection ==>", ws, request);
    });
  });
};

module.exports = { upgradeCb, wsServer };

// код настраивает WebSocket-сервер, который интегрируется с middleware для проверки сессий. Он обрабатывает HTTP-запросы на обновление до WebSocket-соединений, 
// проверяет наличие активной сессии пользователя, и если проверка проходит успешно, управляет WebSocket-соединением. 
// В случае неуспешной проверки сессии соединение закрывается с кодом ошибки 401.
