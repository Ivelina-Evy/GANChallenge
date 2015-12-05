'use strict';

angular.module('myApp.pageContent', [])

.controller('ContentCtrl', ["$scope","$rootScope",function($scope,$rootScope) {
        $scope.showDatePicker = false;
        $scope.$on('showDatePicker', function() {
            $scope.showDatePicker = true;
            $scope.$apply();
        });

        $scope.$on('hideDatePicker', function() {
            $scope.showDatePicker = false;
            $scope.$apply();
        });
}]);


