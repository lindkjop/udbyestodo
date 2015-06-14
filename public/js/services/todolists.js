angular.module('todolistService', [])

	// super simple service
	// each function returns a promise object 

	.factory('Todolists', ['$http',function($http) {
		return {
			get : function() {
				return $http.get('/api/todolists');
			},
			create : function(todolistTitle) {
				return $http.post('/api/todolists', todolistTitle);
			},
			deletetodolist : function(id) {
				return $http.delete('/api/todolists/' + id);
			},

			deletetodo : function(listid, todoid) {
				return $http.delete('/api/todolists/' + listid + "/" + todoid);
			},

			update : function(id, todotext) {
				console.log("The Id of the todolist to be updated: " + id + " tododata: " + JSON.stringify(todotext));
				return $http.put('/api/todolists/' + id, todotext);
			}
		}
	}]);