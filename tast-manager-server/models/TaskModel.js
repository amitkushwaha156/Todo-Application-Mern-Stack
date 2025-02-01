const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"], // Custom error message
   
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
