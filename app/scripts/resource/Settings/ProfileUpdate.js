'use strict';

/**
 * @ngdoc function
 * @name bizmerkApp.service: Profile
 * @description
 * # Profile
 * Resource of the ProfileCtrl
 */
angular.module('bizmerkApp')
  .service('ProfileUpdate', function ($resource,Config) {
    var host = Config.apiUrl;
    var endpoints = Config.apiEndpoints;

    return $resource(host+endpoints.updatememe,{}, {
      me: {method:'PUT'}
    });
  });
