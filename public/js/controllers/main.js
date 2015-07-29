angular.module('todoController', [])

	// inject the Todo service factory into our controller
	.controller('mainController', ['$scope','$http','Todolists', function($scope, $http, Todolists) {
  		$scope.loading = true;
  		$scope.showdate = false;

		// GET =====================================================================
		// when landing on the page, get all todolists and show them
		// use the service to get all the todos
		Todolists.get()
		.success(function(data) {
			$scope.todolists = data;
			$scope.duedates = [];

			//I want to first collect all todos from a todolist and then map each duedate

			for (var i = 0; i < $scope.todolists.length; i++) {
				var todos = $scope.todolists[i].todos;
					var duedatestemp = todos.map(function (todo) {
						return $scope.calculateDaysTillDue(todo.duedate);
					});
				$scope.duedates.push.apply($scope.duedates, duedatestemp);
			//$scope.duedates.push(duedatestemp);
				//console.log(todos);
				//for(var y = 0; y < todos.length; y++){


					/*$scope.duedates = todos.map(function (todo) {
						console.log(todo);
						console.log(todo.duedate);
						var oneDay = 24*60*60*1000;
						var today = new Date();
						console.log(today);
						var duedate = new Date(todo.duedate);
						console.log(duedate);

						$scope.numberofdays = Math.round(Math.abs((today.getTime() - duedate.getTime()) / (oneDay)));
						//console.log($scope.numberofdays);
						return $scope.numberofdays;
					});*/
				//};
					//console.log(duedates);
				//};

			};
			
			console.log($scope.duedates);
			//console.log($scope.duedates);

			//console.log("What is data here?: " + JSON.stringify(data));
			//console.log("Can I get all duedates?" + JSON.stringify(data.duedate));
			$scope.loading = false;
		});

		//Need to update todolists to get the view to update, therefore this method.
		//Need to do something about it, uglybugly
		//

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
			console.log("Checking if something is in the field, todolist.title: " + $scope.newtodolist.title);
			if ($scope.newtodolist.title != undefined) {
				$scope.loading = true;
				// call the create function from our service (returns a promise object)
				console.log("Todolist.title right now: " + $scope.newtodolist.title);
				Todolists.create($scope.newtodolist)
					// if successful creation, call our get function to get all the new todos
					.success(function(data) {
						$scope.loading = false;
						$scope.newtodolist = {}; // clear the form so our user is ready to enter another
						$scope.todolists = data; // assign our new list of todos
					});
				}
			};

		//ADD A TODO TO A GIVEN TODOLIST ============================================

		$scope.addTodo = function(id, $index) {
			//Set todolist to be the right todolist

			$scope.todolist = $scope.todolists[$index];
			console.log("The index of the todolist: " + $index);
			console.log("scope.todolists.text:" + $scope.todolist.text);
			if($scope.todolist.text != undefined) {
				//$scope.loading = true;
				console.log("Todolistid of the list to be updated: " + id);
				console.log("The data to be updated: " + JSON.stringify($scope.todolist.text));
				Todolists.update(id, $scope.todolist, $scope.todolist.duedate)
				.success(function(data) {
						//$scope.loading = false;
						//The data returned here is this todolist - same as todolist is right now
						console.log("The data returned is: " + JSON.stringify(data));
						//$scope.todo = {}; //Clear the todo field
						//Need to assign our new todolist
						console.log("SUccess withupdating");
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
					console.log("Data returned when deleting: " + JSON.stringify(data));
					$scope.todolists = data;
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

		// Calculating how many days till duedate =====================================

		// Returns the days between a & b date objects...
		function dateDiffInDays(a, b) {
   			var _MS_PER_DAY = 1000 * 60 * 60 * 24;
    		// Discard the time and time-zone information.
    		var utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
    		var utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
    		return Math.floor((utc2 - utc1) / _MS_PER_DAY);
		}

		//This need to be fixed
		$scope.calculateDaysTillDue = function(duedate) {
			//console.log(todo);
			//console.log(todo.duedate);
			var oneDay = 24*60*60*1000;
			var today = new Date();
			console.log(today);
			var duedate = new Date(duedate);
			console.log(duedate);

			$scope.numberofdays = Math.round(Math.abs((today.getTime() - duedate.getTime()) / (oneDay)));
			return $scope.numberofdays;
		};

	}]);

		