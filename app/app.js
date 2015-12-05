'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'n3-pie-chart',
  'ui.bootstrap',
  'ui.dashboard',
  'myApp.widgets',
  'myApp.api',
  'myApp.sideMenuSwitch',
  'myApp.pageContent',
  'myApp.dashboard',
  'myApp.version',
  'myApp.calendar',
  'myApp.header'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/dashboard'});
}]);
