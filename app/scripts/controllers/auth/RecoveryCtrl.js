'use strict';

/**
 * @ngdoc function
 * @name bizmerkApp.controller:RecoveryCtrl
 * @description
 * # RecoveryCtrl
 * Controller of the bizmerkApp
 */
angular.module('bizmerkApp')
  .controller('RecoveryCtrl', function ($scope, RecoveryResource,$state) {
    var User= {};

    $scope.RecoveryUser = function (data) {
      User = {
        email: data
      };
      console.log(User);
      RecoveryResource.post(User, function (data) {
        if (data.mensaje == 'Usuario no registrado') {
          $scope.recoveryError = data.mensaje;
        } else {
          $state.go('auth.recoverymail');
        }
      });
    };

  });
