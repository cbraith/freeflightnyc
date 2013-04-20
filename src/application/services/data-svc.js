/*
 * HBO.com
 * Data Service
 * - An angular service that loads data from a url.
 *
 * Copyright (c) 2013 Home Box Office, Inc. as an unpublished
 * work. Neither this material nor any portion hereof may be copied
 * or distributed without the express written consent of Home Box Office, Inc.
 *
 * This material also contains proprietary and confidential information
 * of Home Box Office, Inc. and its suppliers, and may not be used by or
 * disclosed to any person, in whole or in part, without the prior written
 * consent of Home Box Office, Inc.
 */
hbo.namespace('hbo.core');
hbo.core.services = hbo.core.services || angular.module('hbo.core.services', []);

hbo.core.services.service('data', [ '$rootScope', '$http', '$timeout', '$httpBackend',
    function ($rootScope, $http, $timeout, $httpBackend) {
        'use strict';


        /**
         * @param   options object  Contains options for handling the data returned
         *
         * options attributes
         * -- url           string      'Required' The url from which to load data.
         * -- scope         object      'Optional' Scope object of the controller that's calling this service. The load
         *                                          method assumes a 'model' attribute exists on the scope to receive
         *                                          the data (i.e. $scope.model) if model is not provided.
         * -- model         string      'Optional' The name of an attribute on scope to assign the data to.
         * -- resultHandler function    'Optional' A function to handle the returned data.
         * -- faultHandler  function    'Optional' A function to run if there is an error with loading the data.
         */

        this.loading = false;
        this.options = {};
        var svc = this;

        this.failure = function (response) {
            //on error in response
            console.log('Data Service Failed');
            svc.loading = false;
            // handle some faults
            if (svc.options.faultHandler) {
                svc.options.faultHandler(response);
                return;
            }

            //Otherwise load the 404 page, use timeout to avoid calling $digest
            //TODO: put error template path into a constant
            $timeout(function () {
                $rootScope.templates = { layout: '/application/partials/errorbody.ptl.html' };
            }, 0);
            console.log("The 404/error template was loaded via the data service's load method's integrated fault handling");

        };

        this.load = function load (options) {
            svc.loading = true;
            console.log('headers', $httpBackend.options);
            $http({ method: 'GET', url: options.url }).
                then(function (response) {
                    console.log(response.data, 'heres the raw response text');
                    var data = response.data,
                        model = options.model || 'model';

                    //Handle html 404 with 200 status code
                    if (typeof data !== "object") {
                        svc.failure(response);
                        return;
                    }
                    // Handle some results
                    if (options.resultHandler) {
                        options.resultHandler(data);


                    }
                    else if (options.scope) {
                        options.scope[model] = data;
                        options.scope.$broadcast('model-loaded');
                    }
                    //    response.data = null;
                    //    response = null;
                    //   svc.loading=false;
                }, this.failure);
        }
    }]);
