'use strict';

angular.module('bizmerkApp')
  .service('ConfirmationResource', function ($resource,Config) {
    var host = Config.apiUrl;
    var endpoints = Config.apiEndpoints;
    console.log(host+endpoints.confirmation);
    return $resource(host+endpoints.confirmation+'/:confirmation',{}, {
      get: {method:'GET',  params:{confirmation:'@confirmation'}}
    });
  })
;
