angular.module('sortApp', [])

.controller('mainController',['$scope','$http','$filter','Clocks', function($scope, $http,$filter, Clocks) {

  $scope.sortType     = 'name'; // set the default sort type
  $scope.sortReverse  = false;  // set the default sort order
  $scope.searchFish   = '';     // set the default search/filter term
  $scope.loading = false;
 

// GET by user =====================================================================
		// when landing on the page, get all labs and show the
		// use the service to get all the labs
      
      $scope.createTodo = function() {
        
              // validate the formData to make sure that something is there
              // if form is empty, nothing will happen
              if ($scope.formData.labname != undefined) {
                $scope.loading = true;
        
                // call the get function from our service (returns a promise object)
                Clocks.getbyomcemail($scope.formData.labname,$scope.formData.emailaddr)
        
                  // if successful creation, call our get function to get all the new todos
                  .success(function(data) {
                    $scope.loading = false;
                    $scope.formData = {}; // clear the form so our user is ready to enter another
                    $scope.sushi = data; // assign our new list of todos
                  });
              }
            };

}]);
