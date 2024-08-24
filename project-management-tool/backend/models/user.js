const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  projects: [
    { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Project",
      default : []
    }
  ],
},{ timestamps: true });

module.exports = mongoose.model('User', userSchema);
