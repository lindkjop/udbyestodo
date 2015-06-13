var mongoose = require('mongoose');

var TodoSchema = new mongoose.Schema({
  text: { type: String, default: 'No text' }, 
  completed: { type: Boolean, default: false }, 
  duedate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Todo', TodoSchema);