var TodoList = require('./models/todolist');

module.exports = function(app) {

	// api ---------------------------------------------------------------------
	// get all todolists
	app.get('/api/todolists', function(req, res) {

		// use mongoose to get all todos in the database
		TodoList.find(function(err, todolists) {

			// if there is an error retrieving, send the error. nothing after res.send(err) will execute
			if (err)
				res.send(err)

			res.json(todolists); // return all todos in JSON format
		});
	});

	// create todolist and send back all todolists after creation
	app.post('/api/todolists', function(req, res) {

		// create a todolist, information comes from AJAX request from Angular
		TodoList.create({
			title : req.body.title,
 			//No todos in the list when it is created
			done : false //What does this line do? Get a invalid json error if removed
		}, function(err, todolist) {
			if (err)
				res.send(err);

			// get and return all the todos after you create another
			TodoList.find(function(err, todolists) {
				if (err)
					res.send(err)
				res.json(todolists);
			});
		});

	});

	//Update a todolist with a new todo
	app.put('/api/todolists/:todolist_id', function (req, res) {
		var todolist_id = req.params.todolist_id;
		console.log("Trying to find todolist with id: " + todolist_id);
		TodoList.findOne({_id: todolist_id}, function (err, todolist) {
			if(err){
				//console.log("Something went wrong!");
				res.send(err);
			} else {
				console.log(req.body);
				todolist.todos.push({title: req.body.title,text: req.body.todotext, completed: false, duedate: req.body.duedate});
			}

			todolist.save(function(err) {
				if(err){
					//console.log("something went wrong!");
					res.send(err);
				} else {
					//console.log("The updated todolist was: " + todolist);
					res.json({message: "Todolist updated: "}, todolist);
				}
			});
		});
	});


	// delete a todolist
	app.delete('/api/todolists/:todolist_id', function(req, res) {
		TodoList.remove({
			_id : req.params.todolist_id
		}, function(err, todolist) {
			if (err)
				res.send(err);

			// get and return all the todos after you create another
			TodoList.find(function(err, todolists) {
				if (err)
					res.send(err)
				res.json(todolists);
			});
		});
	});

	// delete a todo within a todolist
	app.delete('/api/todolists/:todolist_id/:todo_id', function(req, res) {
		var todolist_id = req.params.todolist_id;
		var todo_id = req.params.todo_id;
		console.log("Trying to find todolist with id: " + todolist_id + " To delete todo with id: " + todo_id);
		TodoList.findById(todolist_id, function (err, todolist) {
			if(err){
				res.send(err);
			} else {
				todolist.todos.pull({'_id': todo_id});
			}

			todolist.save(function(err) {
				if(err){
					res.send(err);
				} else {
					res.json({message: "Todolist updated: "}, todolist);
				}
			});
		});
	});

	// application -------------------------------------------------------------
	app.get('*', function(req, res) {
		res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
	});
};