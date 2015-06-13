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
				console.log("Todolistid: " + id);
				Todolists.update(id, $scope.todos)
					.success(function(data) {
						//$scope.loading = false;
						//The data returned here is this entire todolist
						console.log("The data returned is: " + JSON.stringify(data));
						$scope.todos = {}; //Clear the todo field
						//Need to assign our new todolist
						console.log("SUccess with updating");
						$scope.todolist = data;
						//$scope.todolist.todos = data;
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
				});
		};

	}]);