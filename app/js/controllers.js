'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
  controller('MyCtrl1', ['version', function(version) {
    console.log("Alert Alert!", version);
  }])
  .controller('FlightMapCtrl', ['$scope', function ($scope) {
        'use strict';
        var prefix = '[Flight Map Ctrl] - ';
        console.log(prefix + 'loaded');
        $scope.vehicles = [
                {
                    "tailNumber": "XXX123",
                    "make": "Boeing",
                    "model": "797"
                },
                {
                    "tailNumber": "YYY456",
                    "make": "Airbus",
                    "model": "690"
                }
            ];
//        data().load({
//            url: 'sample.json',
//            resultHandler: function flightsHandler (response) {
//                console.log('data', response);
//            },
//            faultHandler: function faultHandler (error) {
//                console.log('[data svc] - There was a problem: ', error);
//            }
//        })
  }]);
