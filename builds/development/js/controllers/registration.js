app.controller('RegistrationController', function($scope, $location, $firebaseAuth, Authentication){

	var ref = new Firebase('https://youtubeapp.firebaseio.com/');
	var auth = $firebaseAuth(ref);

	$scope.login = function() {
		Authentication.login($scope.user)
		.then(function(error){
			$location.path('/bookmarks');
		}).catch(function(error){
			$scope.message = error.message;
		});
	}; //login

	$scope.register = function() {
		Authentication.register($scope.user)
		.then(function(user) {
			Authentication.login($scope.user);
			$location.path('/bookmarks');
		}).catch(function(error){
			$scope.message = error.message;
		});
	}; //register

}); //RegistrationController 