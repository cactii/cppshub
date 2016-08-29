var angular = require('angular');
// Explicitly require for browserify to include angular modules
require('angular-route');
require('./routes/pages');

// OTHER SHIT
window.paceOptions = {
    document: true,
    eventLag: true,
    restartOnPushState: true,
    restartOnRequestAfter: true,
    ajax: {
        trackMethods: ['POST', 'GET']
    }
};

require('pace-progress/pace.min');

var app = angular.module('cppshub', [
    'ngRoute',
    'cppshub.pages',
]);

app.config(['$routeProvider', function($routeProvider) {
    $routeProvider.otherwise({redirectTo: '/sources'});
}]);

app.config(['$locationProvider', function ($locationProvider) {
    $locationProvider.hashPrefix('!');
}]);