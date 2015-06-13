var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

var TodoListSchema = new mongoose.Schema({
	title: String,
	todos: [{ text: String,
			  completed: Boolean, 
              duedate: {type: Date, default: Date.now}
            }],
});

module.exports = mongoose.model('TodoList', TodoListSchema);
