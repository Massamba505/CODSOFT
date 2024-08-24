const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  dueDate: {
    type: Date,
    required: true,
  },
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
  },
  tasks: [
    { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Task" 
    }
  ],
  progress: { 
    type: Number, 
    default: 0 
  }
});

module.exports = mongoose.model('Project', projectSchema);
