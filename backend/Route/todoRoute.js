const express = require('express');
const router = express.Router();
const todolist = require('../Model/todoModel');


router.use(express.json());


//post todo list

router.post('/addtodo', async (req, res) => {
    try {
        let data = req.body;
        let todoInfo = await todolist(data).save();
        console.log(todoInfo);
        res.status(200).send({ message: "Todo added" });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Error adding data" });
    }
});


//get Todo info

router.get('/todolist', async (req, res) => {
    try {
        const Todolist = await todolist.find();
        res.status(200).send(Todolist);
    } catch (error) {
        console.log(error);
        res.status(500).send("Error fetching todos");
    }
});


router.delete('/remove/:id', async (req, res) => {
    try {
        const deletedTask = await todolist.findByIdAndDelete(req.params.id);
        if (!deletedTask) {
            return res.status(404).json({ error: "Task not found" });
        }
        res.json({ message: "Task deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});



router.put('/tasks/:id', async (req, res) => {
    try {
      const todoId = req.params.id;
      const updatedTask = req.body;
  
      // Find the task by ID and update its status
      const task = await todolist.findByIdAndUpdate(
        todoId,
        { Status: updatedTask.Status },
        { new: true }
      );
  
      if (!task) {
        return res.status(404).json({ message: 'Task not found' });
      }
  
      res.json(task);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  });
  


module.exports = router;