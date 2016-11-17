'use strict';

/**
 * @ngdoc function
 * @name bizmerkApp.controller:AuthCtrl
 * @description
 * # AuthCtrl
 * Controller of the bizmerkApp
 */
angular.module('bizmerkApp')
  .controller('AuthCtrl', function ($state, ConfirmationResource) {
    ConfirmationResource.get(function (data) {
      console.log(data);
      $state.go('auth.login');
    })
  });
