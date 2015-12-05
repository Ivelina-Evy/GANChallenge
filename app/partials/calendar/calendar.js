'use strict';

angular.module('myApp.calendar', [])

.controller('CalendarCtrl', ["$scope",function($scope) {

}])

.directive("dateRangePicker", ["$rootScope",function($rootScope) {
    return {
        restrict: "A",
        link: function(scope, elem, attrs) {
            $(elem).daterangepicker();
            $(elem).on('show.daterangepicker', function(ev, picker) {
                $rootScope.$broadcast('showDatePicker');
            });
            $(elem).on('hide.daterangepicker', function(ev, picker) {
                $rootScope.$broadcast('hideDatePicker');
            });
            $(elem).on('apply.daterangepicker', function(ev, picker) {
                $rootScope.$broadcast('datesSelected',{ dates:{startDate:picker.startDate.toDate(),endDate:picker.endDate.toDate()}});
            });
        }
    }
}]);
