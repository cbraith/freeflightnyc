

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services', []).
  value('version', '0.1').
    service('data', ['$http', function ($http) {
            'use strict';

            return {
                load: function load (options) {
                $http({ method: 'GET', url: options.url }).
                    then(function (response) {
                        console.log(response.data, 'heres the raw response text');
                        var d = response.data;

                        // Handle some results
                        if (options.resultHandler) {
                            options.resultHandler(d);
                        }
                    });
                }
            }

        }]);
