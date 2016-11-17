'use strict';

/**
 * @ngdoc function
 * @name bizmerkApp.service: HeaderData
 * @description
 * # HeaderData
 * Resource of the HeaderCtrl
 */
angular.module('bizmerkApp')
  .service('HeaderData', function ($resource,Config) {
    var host = Config.apiUrl;
    var endpoints = Config.apiEndpoints;

    return $resource(host+endpoints.showme,{}, {
      me: {method:'GET', isArray: false}
    });
  });
