const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const http = require("http");
const {WebSocketServer} = require("ws"); // Изменили путь

const connectionCb = require("./ws/connection");
const postsRouter = require("./routes/postsRouter");
const userRouter = require("./routes/userRouter");
const resLocals = require("./middlewares/resLocals");
const sessionParser = require("./middlewares/sessionParser");

require("dotenv").config();

const PORT = 3000;
const app = express();

app.use(cors({ credentials: true, origin: true }));
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(sessionParser);
app.use(resLocals);

app.use("/api/post", postsRouter);
app.use("/api/user", userRouter);

const server = http.createServer(app); // Использовали http.createServer с express
const wsServer = new WebSocketServer({ server });

server.on("upgrade", (request, socket, head) => {
  wsServer.handleUpgrade(request, socket, head, (ws) => {
    wsServer.emit("connection", ws, request);
  });
});

server.listen(PORT, () => console.log(`App has started on port ${PORT}`));
