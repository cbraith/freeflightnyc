'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
  controller('MyCtrl1', ['version', function(version) {
    console.log("Alert Alert!", version);
  }])
  .controller('FlightMapCtrl', ['$scope', 'data', function ($scope, data) {
        'use strict';
        var prefix = '[Flight Map Ctrl] - ';
        console.log(prefix + 'loaded');

        data.load({
            url: 'sample.json',
            resultHandler: function flightsHandler (response) {
                $scope.vehicles = response.vehicles;
                console.log('data', $scope.vehicles);
            }
        })
  }]);
