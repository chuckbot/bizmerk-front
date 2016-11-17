'use strict';

/**
 * @ngdoc function
 * @name bizmerkApp.controller:HeaderbarCtrl
 * @description
 * # HeaderbarCtrl
 * Controller of the bizmerkApp
 */
angular.module('bizmerkApp')
  .controller('AppCtrl', function ($auth, $scope,$rootScope ,toaster, $state, HeaderData) {
    $rootScope.$on("validate", function(event,data){
      toaster.pop({
        type: data.type,
        title: data.message
      });
    });
  });
