const { Message, User } = require("../db/models");
const {
  ADD_MESSAGE,
  DELETE_MESSAGE,
  HIDE_MESSAGE,
  SEND_MESSAGE,
  STARTED_TYPING,
  STOPPED_TYPING,
} = require("./actions");

// Хранилище подключений: userId → { ws, user }
const map = new Map();

const connectionCb = (socket, request) => {
  const Uid = request.session.user.id;

  // Сохраняем подключение в map
  map.set(Uid, { ws: socket, user: request.session.user });

  // Отправка списка всех онлайн-юзеров каждому клиенту
  const sendUsers = (activeConnections) => {
    const payload = [...activeConnections.values()].map(({ user }) => user);
    activeConnections.forEach(({ ws }) => {
      ws.send(JSON.stringify({ type: "SET_USERS", payload }));
    });
  };

  sendUsers(map); // Первичная рассылка после подключения

  // Отправка всех сообщений подключившемуся пользователю
Message.findAll({
  order: [['createdAt', 'ASC']],
  include: [{ model: User, as: 'author' }],
}).then((allMessages) => {
  const sanitizedMessages = allMessages.map((msg) => {
    const obj = msg.toJSON();
    if (obj.author) delete obj.author.password;
    return obj;
  });

  socket.send(
    JSON.stringify({
      type: "SET_ALL_MESSAGES",
      payload: sanitizedMessages,
    })
  );
});

  // Удаление при ошибке соединения
  socket.on("error", () => {
    map.delete(Uid);
    sendUsers(map);
  });

  // Обработка всех сообщений от клиента
  socket.on("message", async (message) => {
    const actionFromFront = JSON.parse(message);
    const { type, payload } = actionFromFront;

    switch (type) {
      // 💬 Отправка нового сообщения
      case SEND_MESSAGE:
        try {
          const newMessage = await Message.create({ text: payload, Uid });

          const newMessageWithAuthor = await Message.findOne({
            where: { id: newMessage.id },
            include: [{ model: User, as: "author" }],
          });

          if (!newMessageWithAuthor) {
            console.warn("Message not found after creation");
            return;
          }

          const cleanMessage = newMessageWithAuthor.toJSON();
          if (cleanMessage.author) {
            delete cleanMessage.author.password; // 🛡️ Безопасность: удаляем пароль
          }

          // Рассылка нового сообщения всем подключённым
          map.forEach(({ ws }) => {
            ws.send(JSON.stringify({
              type: ADD_MESSAGE,
              payload: cleanMessage,
            }));
          });
        } catch (err) {
          console.error("SEND_MESSAGE error:", err);
        }
        break;

      // ⌨️ Пользователь начал печатать
      case STARTED_TYPING:
        const startedTyping = {
          type: STARTED_TYPING,
          payload: map.get(Uid).user.username,
        };
        map.forEach(({ ws }) => ws.send(JSON.stringify(startedTyping)));
        break;

      // ⌨️ Пользователь перестал печатать
      case STOPPED_TYPING:
        const stoppedTyping = { type: STOPPED_TYPING, payload: null };
        map.forEach(({ ws }) => ws.send(JSON.stringify(stoppedTyping)));
        break;

      // ❌ Удаление сообщения
      case DELETE_MESSAGE:
        Message.findOne({ where: { id: payload } }).then(async (target) => {
          if (target?.Uid !== Uid) return; // Удалять может только автор

          await Message.destroy({ where: { id: payload } });

          // Уведомляем всех, что сообщение скрыто
          map.forEach(({ ws }) => {
            ws.send(JSON.stringify({ type: HIDE_MESSAGE, payload }));
          });
        });
        break;
    }

  });

  // Обработка отключения клиента
  socket.on("close", () => {
    map.delete(Uid);
    sendUsers(map);
  });
};

module.exports = connectionCb;
