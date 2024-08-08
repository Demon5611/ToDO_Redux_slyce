const session = require("express-session");
const store = require("session-file-store");
const express = require("express");

require("dotenv").config();

const FileStore = store(session);

const sessionParser = session({
  name: "sid",
  secret: process.env.SESSION_SECRET ?? "test",
  resave: true,
  store: new FileStore(),
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 12,
    httpOnly: true,
  },
});

module.exports = sessionParser;
// код настраивает систему сессий для Express-приложения с использованием express-session и session-file-store для хранения сессий в файловой системе. 
// Он загружает конфигурации из переменных окружения и создает параметры для сессий, такие как имя cookie, секретный ключ, настройки хранения и срок действия cookie. 
// После этого, настроенный sessionParser экспортируется для использования в других частях приложения.
