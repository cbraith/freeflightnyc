'use strict';

/* Directives */


angular.module('myApp.directives', []).
  directive('appVersion', ['version', function(version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
  }]).
  directive('flightMap', [function () {
    return function (scope, el, attrs) {
        var mapOptions = {
            center: new google.maps.LatLng(-34.397, 150.644),
            zoom: 8,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        console.log('directive:', scope);
        var map = new google.maps.Map(document.getElementById("flight-map"),
            mapOptions);
    }
    }]);

