var willHitchcock = angular.module('willHitchcock', ['ngRoute', 'pageCtrl']);

willHitchcock.config(['$routeProvider', function($routeProvider) {
	$routeProvider
		.when('/resume', {
			templateUrl: 'partials/resume.html',
			controller: 'ResumeCtrl'
		})
		.when('/contact', {
			templateUrl: 'partials/contact.html',
			controller: 'ContactCtrl'
		})
		.when('/portfolio', {
			templateUrl: 'partials/portfolio.html',
			controller: 'PortfolioCtrl'
		})
		.when('/', {
			templateUrl: 'partials/about.html',
			controller: 'AboutCtrl'
		})
		.otherwise({
			redirectTo: '/'
		})
}]);