angular.module('myApp.api', [])
.service('apiService', function($http,$q){
    return {
        getData: function(from,to) {
            var deferred = $q.defer();
            $http.get("data/emails.json")
                .success(function(data) {

                    var summary = {
                        sent:{
                            total: 0,
                            "values": []
                        },
                        delivered:{
                            total: 0,
                            "values": []
                        },
                        read:{
                            total: 0,
                            "values": []
                        },
                        complaints:{
                            total: 0,
                            "values": []
                        }
                    };

                    data.sort(function(a, b){
                        var date1 = new Date(a.date);
                        var date2 = new Date(b.date);
                        if(date1 < date2) return -1;
                        if(date1 > date2) return 1;
                        return 0;
                    });

                    angular.forEach(data, function(value) {
                        var newsLetterDate = new Date(value.date);
                        if(from <= newsLetterDate && newsLetterDate <= to) {
                            this.sent.total = this.sent.total + value.newsletter.email_sent;
                            this.sent.values.push([newsLetterDate,value.newsletter.email_sent]);

                            this.delivered.total = this.delivered.total + value.newsletter.email_delivered;
                            this.delivered.values.push([newsLetterDate,value.newsletter.email_delivered]);

                            this.read.total = this.read.total + value.newsletter.email_read;
                            this.read.values.push([newsLetterDate,value.newsletter.email_read]);

                            this.complaints.total = this.complaints.total + value.newsletter.email_complaints;
                            this.complaints.values.push([newsLetterDate,value.newsletter.email_complaints]);
                        }
                    },summary);

                    if(summary.delivered.total != 0 && summary.read.total != 0) {
                        summary.utilization = Math.round((summary.read.total / summary.delivered.total) * 100)
                    } else {
                        summary.utilization = 0;
                    }

                    deferred.resolve({
                        emails: summary
                    });

                }).error(function(msg, code) {
                    deferred.reject(msg);
                    $log.error(msg, code);
                });
            return deferred.promise;
        }
    }
});