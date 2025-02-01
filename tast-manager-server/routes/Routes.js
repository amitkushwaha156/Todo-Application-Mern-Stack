const express = require('express'); 
const Task = require('../models/TaskModel');  

const router = express.Router();

router.post('/', async (req, res) => {
  const { title, description, dueDate, status } = req.body;  

  try {
   
    if (!title || !description || !dueDate || !status) {
      return res.status(400).json({ msg: 'Please include all required fields' });
    }

    const newTask = new Task({ title, description, dueDate, status });  
    await newTask.save();
    res.json(newTask);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

router.get('/:id', async (req, res) => {
  try {

    let task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ msg: 'Task not found' });
    }

 
    res.json(task);
  } catch (err) {
    console.error(err);

    res.status(500).send('Server Error');
  }
});


  router.delete('/:id', async (req, res) => {
   // console.log(req.params.id);
    try {
      let task = await Task.findById(req.params.id);
      
 
      if (!task) {
        return res.status(404).json({ msg: 'Task not found' });
      }
  
      await Task.findByIdAndDelete(req.params.id);
      res.json({ msg: 'Task removed' });
      
    } catch (err) {
      console.error(err); 
      res.status(500).send('Server Error');
    }
  });
  
  router.put('/:id', async (req, res) => {
    console.log(req.params.id);
    const { title, description ,dueDate,status} = req.body; 
  
    try {
     
      let task = await Task.findById(req.params.id);
  
    
      if (!task) {
        return res.status(404).json({ msg: 'Task not found' });
      }
  
      // Update the task with the new data
      task = await Task.findByIdAndUpdate(
        req.params.id,
        { title, description,dueDate,status }, 
        { new: true }
      );
  
      res.json(task); // Return the updated task
    } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
    }
  });
  
  router.get('/', async (req, res) => {
    const { page, limit } = req.query; // Default to page 1 and limit 10
  
  
    try {
      // Convert page and limit to numbers
      const pageNumber = parseInt(page);
      const limitNumber = parseInt(limit);
  
      // Calculate the number of documents to skip
      const skip = (pageNumber - 1) * limitNumber;
  
      // Fetch the tasks with pagination
      const tasks = await Task.find()
        .sort({ createdAt: -1 }) // Optional: sort by createdAt descending
        .skip(skip)
        .limit(limitNumber);
  
      // Get the total count of tasks for total pages
      const totalTasks = await Task.countDocuments();
  
      // Send response
      res.json({
        tasks,
        totalPages: Math.ceil(totalTasks / limitNumber),
        currentPage: pageNumber,
        totalTasks,
      });
    } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
    }
  });


module.exports = router;
