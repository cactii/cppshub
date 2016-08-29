var angular = require('angular');

var about = angular.module('cppshub.pages', ['ngRoute']);

about.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/sources', {
        templateUrl: 'sources.html'
    });

    $routeProvider.when('/mediaservers', {
        templateUrl: 'mediaservers.html'
    });

    $routeProvider.when('/extras', {
        templateUrl: 'extras.html'
    });
}]);