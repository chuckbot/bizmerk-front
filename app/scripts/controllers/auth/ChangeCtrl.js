'use strict';

angular.module('bizmerkApp')
  .controller('PasswordCtrl', function ($scope,$state, $stateParams, passwordResource) {
    console.log($stateParams);
    $scope.changePassword = function (data) {
      var newPassword = {
        token: $stateParams.token,
        password: data.password,
        passwordConfirmation: data.confirm
      };
      passwordResource.changePassword(newPassword, function (data) {
        console.log(data);
        $state.go('auth.login');
      })
    };
  });
