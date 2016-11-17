'use strict';

/**
 * @ngdoc function
 * @name bizmerkApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the bizmerkApp
 */
angular.module('bizmerkApp')
  .controller('LoginCtrl', function ($scope,$timeout,$state, $auth) {
    $scope.User= {};
    if ($auth.isAuthenticated()) {
      console.log(true);
      $state.go('app.dashboard');
    }else {
      console.log(false);
    }

    $scope.LoginUser = function (data) {
       $scope.User = {
        email: data.email,
        password: data.password
      };
      $auth.login($scope.User).then(function (data) {
          // Si se ha logueado correctamente, lo tratamos aquí.
          // Podemos también redirigirle a una ruta
          console.log(data);
        $state.go('app.dashboard');
        })
        .catch(function (response) {
          // Si ha habido errores llegamos a esta parte
          console.log(response.data.error);
          $scope.loginError = response.data.error;
        });
    };

  });
