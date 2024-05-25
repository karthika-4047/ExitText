const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  Task: String,
  Status: { type: String, enum: ['completed', 'ongoing'], default: 'ongoing' },
 

});

const Todo = mongoose.model('todo', todoSchema);

module.exports = Todo;