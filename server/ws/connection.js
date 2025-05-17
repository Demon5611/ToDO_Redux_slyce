const { Message, User } = require("../db/models");
const {
  ADD_MESSAGE,
  DELETE_MESSAGE,
  HIDE_MESSAGE,
  SEND_MESSAGE,
  STARTED_TYPING,
  STOPPED_TYPING,
} = require("./actions");

const map = new Map();

const connectionCb = (socket, request) => {
  const Uid = request.session.user.id;
  map.set(Uid, { ws: socket, user: request.session.user });

  const sendUsers = (activeConnections) => {
    const payload = [...activeConnections.values()].map(({ user }) => user);
    activeConnections.forEach(({ ws }) => {
      ws.send(JSON.stringify({ type: "SET_USERS", payload }));
    });
  };

  sendUsers(map);

  socket.on("error", () => {
    map.delete(Uid);
    sendUsers(map);
  });

  socket.on("message", async (message) => {
    const actionFromFront = JSON.parse(message);
    const { type, payload } = actionFromFront;

    switch (type) {
      case SEND_MESSAGE:
  try {
    const newMessage = await Message.create({ text: payload, Uid });
    const newMessageWithAuthor = await Message.findOne({
      where: { id: newMessage.id },
      include: [{ model: User, as: "author" }],
    });

    if (!newMessageWithAuthor) {
      console.warn('Message not found after creation');
      return;
    }

    const cleanMessage = newMessageWithAuthor.toJSON();
    if (cleanMessage.author) {
      delete cleanMessage.author.password;
    }

    console.log('WS JSON to send:', JSON.stringify({
      type: ADD_MESSAGE,
      payload: cleanMessage,
    }, null, 2));

    map.forEach(({ ws }) => {
      ws.send(JSON.stringify({
        type: ADD_MESSAGE,
        payload: cleanMessage,
      }));
    });
  } catch (err) {
    console.error('SEND_MESSAGE error:', err);
  }
  break;


      case STARTED_TYPING:
        const startedTyping = {
          type: STARTED_TYPING,
          payload: map.get(Uid).user.username,
        };
        map.forEach(({ ws }) => ws.send(JSON.stringify(startedTyping)));
        break;

      case STOPPED_TYPING:
        const stoppedTyping = { type: STOPPED_TYPING, payload: null };
        map.forEach(({ ws }) => ws.send(JSON.stringify(stoppedTyping)));
        break;

      case DELETE_MESSAGE:
        Message.findOne({ where: { id: payload } }).then(async (target) => {
          if (target?.Uid !== Uid) return;
          await Message.destroy({ where: { id: payload } });

          map.forEach(({ ws }) => {
            ws.send(JSON.stringify({ type: HIDE_MESSAGE, payload }));
          });
        });
        break;
    }

    console.log(`Received message ${message} from user ${Uid}`);
  });

  socket.on("close", () => {
    map.delete(Uid);
    sendUsers(map);
  });
};

module.exports = connectionCb;
