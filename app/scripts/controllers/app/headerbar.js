'use strict';

/**
 * @ngdoc function
 * @name bizmerkApp.controller:HeaderbarCtrl
 * @description
 * # HeaderbarCtrl
 * Controller of the bizmerkApp
 */
angular.module('bizmerkApp')
  .controller('HeaderbarCtrl', function ($auth, $scope , $state, HeaderData) {
    $scope.profile = $auth.getPayload();
    $scope.logout = function () {
      $auth.logout();
      $state.go("auth.login");
    };
  });
