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
  try {
    const { id } = req.params;
    console.log('id====><', id)
    const { name, status } = req.body;
    console.log('req.body================><', req.body)
    await ToDo.update(
      {
        name      
    },
      {    where: {
        id,
        Uid: req.session?.user?.id,
      },
    },
    );
    const updatedPost = await ToDo.findOne();
    console.log('updatedPost============><', updatedPost)
    return res.json(updatedPost);
  } catch (err) {
    console.error(err);
    return res.sendStatus(500);
  }
});



  

  // изменение статуса ok
  // router.patch('/post/newstatus/:id/edit', async (req, res) =>{
  //   const { status } = req.body
  // await ToDo.update({status},{ where: { id: req.params.id } });
  //   res.sendStatus(200);
  // });


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
