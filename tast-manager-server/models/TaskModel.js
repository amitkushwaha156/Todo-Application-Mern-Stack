const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
    trim: true,  
    minlength: [3, "Title should have at least 3 characters"], 
    maxlength: [100, "Title should not exceed 100 characters"], 
   
  },
  description: {
    type: String,
    required: [true, "Description is required"],
    trim: true,  
    minlength: [10, "Description should have at least 10 characters"], 
    
  },
  dueDate: {
   type: Date,
   required: [true, "Due date is required"],
  },
  status: {
    type: String,
    enum: {
      values: ['Pending', 'Complete', 'In Progress'],
      message: 'Status must be one of the following: Pending, Complete, In Progress'
    }, 
    required: true,
    default: 'Pending', 
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Task', TaskSchema);
