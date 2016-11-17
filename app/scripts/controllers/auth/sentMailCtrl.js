'use strict';

/**
 * @ngdoc function
 * @name bizmerkApp.controller:AuthCtrl
 * @description
 * # AuthCtrl
 * Controller of the bizmerkApp
 */
angular.module('bizmerkApp')
  .controller('sentMailCtrl', function ($state, $timeout) {
    $timeout(function() {
      $state.go('auth.login');
    }, 3000);
  });
