'use strict'

/**
* The traffic file bootstraps the angular app by  initializing the main module and 
* creating namespaces and moduled for controllers, filters, services, and directives. 
*/

var traffic = traffic || {};

traffic.Constants = angular.module('traffic.constants', []);
traffic.Services = angular.module('traffic.services', []);
traffic.Controllers = angular.module('traffic.controllers', []);
traffic.Filters = angular.module('traffic.filters', []);
traffic.Directives = angular.module('traffic.directives', []);


angular.module('traffic', ['traffic.filters', 'traffic.services', 'traffic.directives', 'traffic.constants', 'traffic.controllers']).
  config(['$routeProvider', function($routeProvider) {
    
    $routeProvider.
      when('/about', {templateUrl: 'about/about-partial.html'}).
      when('/:id/', {templateUrl: 'details/details-partial.html'}).
      otherwise({templateUrl: 'error/error-partial.html'});
  }]);
