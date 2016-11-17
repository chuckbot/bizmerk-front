'use strict';

/**
 * @ngdoc function
 * @name bizmerkApp.controller:AuthCtrl
 * @description
 * # AuthCtrl
 * Controller of the bizmerkApp
 */
angular.module('bizmerkApp')
  .controller('ConfirmationCtrl', function ($state, $stateParams, ConfirmationResource) {
    var token = $stateParams;
    console.log(token);
    
    ConfirmationResource.get(token,function (data) {
      console.log(data);
      $state.go('auth.login');
    })
  });
