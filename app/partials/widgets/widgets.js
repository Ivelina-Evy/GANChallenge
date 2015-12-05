'use strict';

angular.module('myApp.widgets', ['ui.bootstrap','myApp.api','n3-pie-chart','nvd3ChartDirectives'])

.controller('WidgetsCtrl', ["$scope","apiService",function($scope,apiService) {
        var widgetDefinitions = [
            {
                name: 'email_sent',
                title:'Total Sent',
                templateUrl:"partials/widgets/template/sent.html",
                style: {
                    width: '25%'
                }
            },
            {
                name: 'email_delivered',
                title:'Total Delivered',
                templateUrl:"partials/widgets/template/delivered.html",
                style: {
                    width: '25%'
                }
            },
            {
                name: 'email_read',
                title:'Total Read',
                templateUrl:"partials/widgets/template/read.html",
                style: {
                    width: '25%'
                }
            },
            {
                name: 'email_complaints',
                title:'Total Complaints',
                templateUrl:"partials/widgets/template/complaints.html",
                style: {
                    width: '25%'
                }
            },
            {
                name: 'emails_s_ot',
                title: 'Sent over time',
                templateUrl:"partials/widgets/template/linechart_sent.html",
                style: {
                    width: '50%'
                }
            },
            {
                name: 'emails_d_ot',
                title: 'Delivered over time',
                templateUrl:"partials/widgets/template/linechart_delivered.html",
                style: {
                    width: '50%'
                }
            },
            {
                name: 'emails_r_ot',
                title: 'Read over time',
                templateUrl:"partials/widgets/template/linechart_read.html",
                style: {
                    width: '50%'
                }
            },
            {
                name: 'emails_c_ot',
                title: 'Complaints over time',
                templateUrl:"partials/widgets/template/linechart_complaints.html",
                style: {
                    width: '50%'
                }
            },
            {
                name: 'emails_d_vs_r',
                title: 'Delivered VS Read',
                templateUrl:"partials/widgets/template/delivered_vs_read.html",
                style: {
                    width: '25%'
                }
            }
        ];



        var defaultWidgets = _.map(widgetDefinitions, function (widgetDef) {
            return {
                name: widgetDef.name
            };
        });

        $scope.dashboardOptions = {
            widgetButtons: false,
            widgetDefinitions: widgetDefinitions,
            defaultWidgets: defaultWidgets,
        };

        $scope.xAxisTickFormatFunction = function(){
            return function(d){
                return d3.time.format('%x')(new Date(d)); //uncomment for date format
            }
        }

        $scope.$on('datesSelected', function(event, args) {
            var dates = args.dates;
            apiService.getData(dates.startDate,dates.endDate).then(function(summary){
                $scope.sent = summary.emails.sent.total;
                $scope.delivered = summary.emails.delivered.total;
                $scope.read = summary.emails.read.total;
                $scope.complaints = summary.emails.complaints.total;

                $scope.gauge_options = {thickness: 5, mode: "gauge", total: 100};
                $scope.gauge_data = [
                    {label: "", value: summary.emails.utilization, color: "#d62728", suffix: "%"}
                ];

                $scope.sentData = [
                    {
                        "key": "sent",
                        "values": [],
                        color: '#31708f'
                    }
                ];

                $scope.deliveredData = [
                    {
                        "key": "delivered",
                        "values": [],
                        color: '#3c763d'
                    }
                ];

                $scope.readData = [
                    {
                        "key": "read",
                        "values": [],
                        color: '#8a6d3b'
                    }
                ];

                $scope.complaintsData = [
                    {
                        "key": "complaints",
                        "values": [],
                        color: '#a94442'
                    }
                ];

                $scope.sentData[0].values = summary.emails.sent.values;
                $scope.deliveredData[0].values = summary.emails.delivered.values;
                $scope.readData[0].values = summary.emails.read.values;
                $scope.complaintsData[0].values = summary.emails.complaints.values;
            });
        });
    }]);