angular.module('todoController', [])

	// inject the Todo service factory into our controller
	.controller('mainController', ['$scope','$http','Todolists', function($scope, $http, Todolists) {
		$scope.today = function() {
			$scope.dt = new Date();
		};
		$scope.today();

		$scope.clear = function () {
			$scope.dt = null;
		};

		// Disable weekend selection
		$scope.disabled = function(date, mode) {
		 	return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
		};

		$scope.toggleMin = function() {
		 	$scope.minDate = $scope.minDate ? null : new Date();
		};
		
		$scope.toggleMin();

		$scope.open = function($event) {
			$event.preventDefault();
		  	$event.stopPropagation();

		  	$scope.opened = true;
		};

		  $scope.dateOptions = {
		  	formatYear: 'yy',
		  	startingDay: 1
		  };

		  $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
		  $scope.format = $scope.formats[0];

		  var tomorrow = new Date();
		  tomorrow.setDate(tomorrow.getDate() + 1);
		  var afterTomorrow = new Date();
		  afterTomorrow.setDate(tomorrow.getDate() + 2);
		  $scope.events =
		  [
		  {
		  	date: tomorrow,
		  	status: 'full'
		  },
		  {
		  	date: afterTomorrow,
		  	status: 'partially'
		  }
		  ];

		  $scope.getDayClass = function(date, mode) {
		  	if (mode === 'day') {
		  		var dayToCheck = new Date(date).setHours(0,0,0,0);

		  		for (var i=0;i<$scope.events.length;i++){
		  			var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);

		  			if (dayToCheck === currentDay) {
		  				return $scope.events[i].status;
		  			}
		  		}
		  	}

		  	return '';
		  };


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
				Todolists.update(id, $scope.todolist)
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

		}]);