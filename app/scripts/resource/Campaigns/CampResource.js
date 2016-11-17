'use strict';

/**
 * @ngdoc function
 * @name bizmerkApp.service: CampResource
 * @description
 * # CampResource
 * Resource of the AuthCtrl
 */
angular.module('bizmerkApp')
.service('CampResource', function ($resource,Config) {
  var host = Config.apiUrl;
  var endpoints = Config.apiEndpoints;

  return $resource(host+endpoints.campaings+'/:id',{ id:'@id' }, {
    newCampaign: {method:'POST'},
    updateCampaign: {method:'PUT'},
    deleteCampaign: {method:'DELETE'},
    queryCampaigns:{method:'GET'},
    getCampaigns: {method:'GET', isArray: false}
  });
});
