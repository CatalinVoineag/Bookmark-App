var app = angular.module('myApp', ['ngRoute', 'firebase', 'appControllers'])
.constant('FIREBASE_URL', 'https://youtubeapp.firebaseio.com/');

var appControllers = angular.module('appControllers', ['firebase']);

app.run(['$rootScope', '$location', function($rootScope, $location) {
  $rootScope.$on('$routeChangeError',
  function(event, next, previous, error) {
    if(error === 'AUTH_REQUIRED') {
      $rootScope.message='Sorry, you must log in to access that page';
      $location.path('/login');
    }
  });
}]);

app.config(['$routeProvider', function($routeProvider){
	$routeProvider.
		when('/login', {
			templateUrl: 'views/login.html',
			controller: 'RegistrationController'
		}).
		when('/register',{
			templateUrl: 'views/register.html',
			controller: 'RegistrationController'
		}).
		when('/bookmarks', {
			templateUrl: 'views/bookmarks.html',
			controller: 'BookmarksController',
			resolve: {
				currentAuth: function(Authentication) {
					return Authentication.requireAuth();
				}
			}
		}).
		when('/homepage', {
			templateUrl: 'views/homepage.html'
		}).
		otherwise ({
			redirectTo: '/homepage'
		});
}]);