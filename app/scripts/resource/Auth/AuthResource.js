'use strict';

/**
 * @ngdoc function
 * @name bizmerkApp.service:AuthResource
 * @description
 * # AuthResource
 * Resource of the AuthCtrl
 */
angular.module('bizmerkApp')
  .service('RecoveryResource', function ($resource,Config) {
    var host = Config.apiUrl;
    var endpoints = Config.apiEndpoints;
    console.log(host+endpoints.recovery.post);
    return $resource(host+endpoints.recovery.post,{ }, {
      post: {method:'POST', isArray: false}
    });
  })
;
