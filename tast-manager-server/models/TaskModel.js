const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"], // Custom error message
    minlength: [5, "Title must be at least 5 characters long"], // Minimum length for title
    maxlength: [100, "Title cannot exceed 100 characters"], // Maximum length for title
 
  },
  description: {
    type: String,
    required: true,
    
  },
  dueDate: {
   type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ['Pending', 'Complete', 'In Progress'],  
    required: true,
    default: 'Pending', 
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Task', TaskSchema);
