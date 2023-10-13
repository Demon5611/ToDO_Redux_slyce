const express = require('express');
const { ToDo } = require('../db/models');

const router = express.Router();
// all posts
router.get('/all', async (req, res) => {
  try {
    const todo = await ToDo.findAll();
    res.json(todo);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

// add new post
router.post('/one',async(req,res)=>{
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
  
  
  router.patch('/:id', async (req, res) => {
    console.log('Received data:', req.body);
    try {
      const { id } = req.params;
      const { name } = req.body;
      const [updatedRows] = await ToDo.update({
          name,
        },
        { where: {id, Uid: req.session?.user?.id}  },
        );

      // console.log({updatedRows, reqbody: req.body})
      if (updatedRows === 0) {
        return res.status(400).json({ message: 'Запись не найдена' });
      }
      const updatedTodo = await ToDo.findOne({ where:{ id: req.params.id } });
      if (!updatedTodo) {
        return res.status(400).json({ message: 'Запись не найдена' });
      }
      res.status(200).json(updatedTodo);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
  

  // изменение статуса ok
  router.patch('/post/newstatus/:id/edit', async (req, res) =>{
    const { status } = req.body
  await ToDo.update({status},{ where: { id: req.params.id } });
    res.sendStatus(200);
  });


router.delete('/:id', async (req, res) => {
  try {
    await ToDo.destroy({ where: { id: req.params.id } });
    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

module.exports = router;
