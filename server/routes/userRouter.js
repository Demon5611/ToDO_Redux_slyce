const express = require('express');
const bcrypt = require('bcrypt');
const { User } = require('../db/models');

const router = express.Router();

router.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;
  if (username && email && password) {
    try {
      const [user, created] = await User.findOrCreate({
        where: { email },
        defaults: { username, password: await bcrypt.hash(password, 10) },
      });
      if (!created) return res.sendStatus(401);

      const sessionUser = JSON.parse(JSON.stringify(user));
      delete sessionUser.password;
      req.session.user = sessionUser;
      return res.json(sessionUser);
    } catch (e) {
      console.log(e);
      return res.sendStatus(500);
    }
  }
  return res.sendStatus(500);
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (email && password) {
    try {
      const user = await User.findOne({
        where: { email },
      });
      if (!(await bcrypt.compare(password, user.password))) {
        return res.sendStatus(401);
      }

      const sessionUser = JSON.parse(JSON.stringify(user));
      delete sessionUser.password;
      req.session.user = sessionUser;
      return res.json(sessionUser);
    } catch (e) {
      console.log(e);
      return res.sendStatus(500);
    }
  }
  return res.sendStatus(500);
});

router.get('/check', (req, res) => {
  if (req.session.user)
  {
    return res.json(req.session.user);
  }
  return res.sendStatus(401);
});


// проверка наличия куки пользователя. браузер запомнит и сразу авторизует 
router.get('/logout', (req, res) => {
  req.session.destroy();
  res.clearCookie('sid').sendStatus(200);
});


// обновление данных пользователя на админ странице
router.patch('/update/:id', async (req, res) =>
{
  try {
    const { email, password, username } = req.body;
  const hashPassword = await bcrypt.hash(password, 10);
  const [user, created] = await User.update({
    where: { email },
    defaults: {
      email, username, password: hashPassword,
    },
  });
  const { id } = req.params;
  await User.findOne(req.body, { where: { id } });
  if (created)
  {
    req.session.user = { ...user.get(), hashPassword: undefined };
    return res.sendStatus(200);
  } else  {
    return res.status(400).json({ message: 'Email already exists' });
  } 

  } catch (error) {
    res.status(500).json({ message: 'не верный id' });
  }
});

router.get('/chat', async (req, res) => {
  const messages = await Message.findAll({ include: User });
  res.render('Layout', { messages });
});


module.exports = router;
