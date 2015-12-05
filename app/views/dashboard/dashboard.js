'use strict';

angular.module('myApp.dashboard', ['ngRoute'])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/dashboard', {
            templateUrl: 'views/dashboard/dashboard.html',
            controller: 'DashboardCtrl'
        });
    }])
    .controller('DashboardCtrl', ["$scope",function($scope) {
        $scope.sideMenuToggled = false;
        $scope.$on('toggleSideMenu', function() {
            $scope.sideMenuToggled = !$scope.sideMenuToggled;
            $scope.$apply();
        });
    }]);