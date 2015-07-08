angular.module('todoController', [])

	// inject the Todo service factory into our controller
	.controller('mainController', ['$scope','$http','Todolists', function($scope, $http, Todolists) {
		$scope.todolist = {};
		$scope.todos = {};
		$scope.loading = true;

		// GET =====================================================================
		// when landing on the page, get all todolists and show them
		// use the service to get all the todos
		Todolists.get()
			.success(function(data) {
				$scope.todolists = data;
				$scope.loading = false;
			});

		//Need to update todolists to get the view to update, therefore this method.
		//Need to do something about it, uglybugly

		$scope.getTodolists = function() {
			Todolists.get()
			.success(function(data) {
				$scope.todolists = data;
				$scope.loading = false;
			});
		};

		// CREATE ==================================================================
		// when submitting the add form, send the text to the node API
		$scope.createTodolist = function() {
			// validate the formData to make sure that something is there
			// if form is empty, nothing will happen
			console.log("Checking if something is in the field, todolist.title: " + $scope.todolist.title);
			if ($scope.todolist.title != undefined) {
				$scope.loading = true;
				// call the create function from our service (returns a promise object)
				console.log("Todolist.title right now: " + $scope.todolist.title);
				Todolists.create($scope.todolist)
					// if successful creation, call our get function to get all the new todos
					.success(function(data) {
						$scope.loading = false;
						$scope.todolist = {}; // clear the form so our user is ready to enter another
						$scope.todolists = data; // assign our new list of todos
					});
			}
		};

		//ADD A TODO TO A GIVEN TODOLIST ============================================

		$scope.addTodo = function(id) {
			if($scope.todos.text != undefined) {
				//$scope.loading = true;
				console.log("Todolistid of the list to be updated: " + id);
				console.log("The sata to be updated: " + JSON.stringify($scope.todos));
				Todolists.update(id, $scope.todos)
					.success(function(data) {
						//$scope.loading = false;
						//The data returned here is this todolist - same as todolist is right now
						console.log("The data returned is: " + JSON.stringify(data));
						$scope.todos = {}; //Clear the todo field
						//Need to assign our new todolist
						console.log("SUccess withupdating");
						$scope.todolist = data;
						console.log("todolist now: " + JSON.stringify($scope.todolist));
						console.log("Todolist.todos now: " + JSON.stringify($scope.todolist.todos));
						console.log("Todolists now: " + JSON.stringify($scope.todolists));
						//$scope.todos working, but not updating view.
						//Same with scope.todolist and scope.todolist.todos
						$scope.getTodolists();
						//Todolists has all todolists, but is missing the last todo from the edited list.
						//Todolist.todos has all todos, the new one included
					});

				//Need to create a todo with given data and then push it to TodoList?
			}
		};



		// DELETE ==================================================================
		// delete a todolist after checking it
		$scope.deleteTodolist = function(id) {
			$scope.loading = true;

			Todolists.deletetodolist(id)
				// if successful creation, call our get function to get all the new todos
				.success(function(data) {
					$scope.loading = false;
					$scope.todos = data; // assign our new list of todos
				});
		};

		$scope.deleteTodo = function(todolist_id, todo_id) {
			Todolists.deletetodo(todolist_id, todo_id)
				.success(function(data) {
					console.log("success when running deletetodo!");
					$scope.todos = data;

					$scope.getTodolists();
				});
		};

	}]);