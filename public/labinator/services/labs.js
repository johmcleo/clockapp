angular.module('clockService', [])

	// super simple service
	// each function returns a promise object 
	.factory('Clocks', ['$http',function($http) {
		return {
			get : function() {
				return $http.get('/api/clocks/');
			},
			getuniquelabs : function() {
				return $http.get('/api/uniquelabs');
			},
			getbyomc : function(labuser) {
				return $http.get('/api/clocks/' + labuser);
			},
			getbyomcemail : function(labuser,emailaddr) {
				return $http.get('/api/clocks/' + labuser + '/' + emailaddr);
			},
			create : function(labData) {
				return $http.post('/api/labs', labData);
			},
			booklab : function(labuser,labname) {
				return $http.post('/api/booklab', {labuser:labuser,labname:labname});
			},
			delete : function(id) {
				return $http.delete('/api/labs/' + id);
			}
		}
	}]);