global.jQuery = require('jquery');
global.$      = require('jquery');
var angular   = require('angular');

require('angular-route');

require('./controllers');
require('./enterHeight');
require('./cardsToggle');
require('./formState');

var willHitchcock = angular.module('willHitchcock', ['ngRoute', 'pageCtrl', 'enterHeight', 'cardToggle', 'formState']);

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
		.when('/bio', {
			templateUrl: 'partials/about.html',
			controller: 'AboutCtrl'
		})
		.when('/', {
			templateUrl: 'partials/portfolio.html',
			controller: 'PortfolioCtrl'
		})
		.otherwise({
			redirectTo: '/'
		})
}]);