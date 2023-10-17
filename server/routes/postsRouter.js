const express = require('express');
const { ToDo } = require('../db/models');




const router = express.Router();

// отображаем только посты автора
router.get('/all', async (req, res) => {
  try {
    const todo = await ToDo.findAll({
      where: {
        Uid: req.session?.user?.id,
      },
    });
    res.json(todo);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

// add new post
router.post('/one', async(req,res)=>{
  try{
   const newTodo= await ToDo.create({
       name:req.body.name,
       Uid: req.session?.user?.id,
       statuse: false
   });
   res.json(newTodo)
}catch(error){
 console.log(error);
   res.sendStatus(400)
}
}); 
  
  
router.patch('/:id',  async (req, res) => {
  try {
    const { id } = req.params;
    const { name, status } = req.body;
    await ToDo.update(
      {
        name      
    },
      {
        where: {
        id,
        Uid: req.session?.user?.id,
      },
    },
    );
    const updatedPost = await ToDo.findOne();
    return res.json(updatedPost);
  } catch (err) {
    console.error(err);
    return res.sendStatus(500);
  }
});
  

  // изменение статуса ok
  router.patch('/post/newstatus/:id', async (req, res) => {
    const { status } = req.body;
    const { id } = req.params; // Извлекаем параметр 'id' из URL
  
    // Теперь 'status' содержит значение из тела запроса, и 'id' - значение из URL
  
    try {
      await ToDo.update({ status }, { where: { id } });
      res.sendStatus(200);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });




module.exports = router;
