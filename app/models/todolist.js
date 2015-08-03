//var mongoose = require('mongoose');
//var ObjectId = mongoose.Schema.Types.ObjectId;


/*var Inputodo = new Schema({
  text: { type: String, default: 'No text' }, 
  completed: { type: Boolean, default: false }, 
  duedate: { type: Date, default: Date.now }
});


var Predeftodo = new Schema({
  text: { type: String, default: 'No text' }, 
  completed: { type: Boolean, default: false },
});


var Predeftodolist = new mongoose.Schema({
	duedate: { type: Date, default: Date.now }, 
	weekly: { type: Boolean, default: false },
	todos: [Predeftodo]
})

var TodoListSchema = new mongoose.Schema({
	title: String,
	todos: [Inputodo],
	predeftodos: [Predeftodo]
});



module.exports = mongoose.model('Predeftodolist', Predeftodolist);
module.exports = mongoose.model('TodoList', TodoListSchema);*/

module.exports = function(mongoose) {
	var Inputodo = new mongoose.Schema({
	  text: { type: String, default: 'No text' }, 
	  completed: { type: Boolean, default: false }, 
	  duedate: { type: Date, default: Date.now }
	});


	var Predeftodo = new mongoose.Schema({
	  text: { type: String, default: 'No text' }, 
	  completed: { type: Boolean, default: false },
	});

	var TodoListSchema = new mongoose.Schema({
		title: String,
		todos: [Inputodo],
		predeftodos: [Predeftodo]
	});
	var Predeftodolist = new mongoose.Schema({
		duedate: { type: Date, default: Date.now }, 
		weekly: { type: Boolean, default: false },
		todos: [Predeftodo]
	});

	var models = {
      TodoList : mongoose.model('TodoList', TodoListSchema),
      Predeftodolist : mongoose.model('Predeftodolist', Predeftodolist)
    };
    return models;
};