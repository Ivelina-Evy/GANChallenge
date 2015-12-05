'use strict';

angular.module('myApp.sideMenuSwitch', [])

.controller('SwitchCtrl', ["$scope","$rootScope",function($scope,$rootScope) {
}])


.directive("bootstrapSwitch", ["$rootScope",function($rootScope) {
    return {
        restrict: "A",
        link: function(scope, elem, attrs) {
            $(elem).bootstrapSwitch();
            $(elem).on('switchChange.bootstrapSwitch', function(ev, picker) {
                $rootScope.$broadcast('toggleSideMenu');
            });
        }
    }
}]);


