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
        var p, planes = [],
            mapOptions = {
            center: new google.maps.LatLng(41.5784, -73.364661),
            zoom: 8,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };


        console.log('directive:', scope);
        var map = new google.maps.Map(document.getElementById('flight-map'),
            mapOptions);

        scope.$on('data-loaded', function () {
            for (p = 0; p < scope.aircraft.length; p += 1) {
                planes[p] = new google.maps.Marker({
                    position: new google.maps.LatLng(scope.aircraft[p].velocity.se.lat,
                        scope.aircraft[p].velocity.se.lng),
                    map: map,
                    icon: 'img/38-airplane.png'
                });
            }
        });
    }
}]);

