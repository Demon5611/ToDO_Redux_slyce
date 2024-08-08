const express = require("express");

function resLocals(req, res, next) {
  if (req.session?.user) res.locals.user = req.session?.user;
  res.locals.path = req.originalUrl;
  return next();
}

module.exports = resLocals;

// res.locals используется для передачи данных между middleware и шаблонами. 
// Эти данные могут быть использованы в рендеринг-шаблонах для отображения информации, которая была подготовлена или изменена в middleware.
// если пользователь был аутентифицирован, его имя будет отображаться в заголовке, а оригинальный URL запроса — в абзаце.
