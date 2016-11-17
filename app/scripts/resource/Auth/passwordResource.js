'use strict';

/**
 * @ngdoc function
 * @name bizmerkApp.service:AuthResource
 * @description
 * # AuthResource
 * Resource of the AuthCtrl
 */
angular.module('bizmerkApp')
  .service('passwordResource', function ($resource,Config) {
    var host = Config.apiUrl;
    var endpoints = Config.apiEndpoints;
    console.log(host+endpoints.recovery.reset);
    return $resource(host+endpoints.recovery.reset+'/:token',{ token:'@token'}, {
      changePassword: {method:'POST'}
    });
  })
;
