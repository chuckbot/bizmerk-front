'use strict';

/**
 * @ngdoc function
 * @name bizmerkApp.service: CampResource
 * @description
 * # CampResource
 * Resource of the AuthCtrl
 */
angular.module('bizmerkApp')
.service('ContactData', function ($resource,Config) {
  var host = Config.apiUrl;
  var endpoints = Config.apiEndpoints;
  return $resource(host+endpoints.contacts+'/:id',{ id:'@id' }, {
    newContact: {method:'POST'},
    update: {method:'PUT'},
    query:{method:'GET'}
  });
});
