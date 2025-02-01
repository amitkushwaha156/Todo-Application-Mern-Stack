const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"], // Custom error message
    trim: true,  // Automatically trims whitespace
    minlength: [3, "Title should have at least 3 characters"], // Minimum length validation
    maxlength: [100, "Title should not exceed 100 characters"], // Maximum length validation
   
  },
  description: {
    type: String,
    required: [true, "Description is required"],
    trim: true,  // Automatically trims whitespace
    minlength: [10, "Description should have at least 10 characters"], // Description length validation
    
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
