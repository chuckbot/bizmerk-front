'use strict';
/**
 * @ngdoc function
 * @name bizmerkApp.controller:SignupCtrl
 * @description
 * # SignupCtrl
 * Controller of the bizmerkApp
 */
angular.module('bizmerkApp')
  .controller('SignupCtrl', function ($scope, $state, $stateParams, $auth) {


    $scope.signUp = function (User) {
          var num = angular.element('#phone').val();
          var us = {
            username: User.username,
            firstName: User.firstname,
            lastName: User.lastname,
            email: User.email,
            password: User.password,
            company: User.company,
            phone: num
          };
      console.log(us);
      $auth.signup(us).then(function (data) {
            // Si se ha logueado correctamente, lo tratamos aquí.
            // Podemos también redirigirle a una ruta
            $state.go('auth.sentemail');
          })
            .catch(function (response) {
              // Si ha habido errores llegamos a esta parte
              $scope.emailError = response.data.errors.email;
              $scope.usernameError = response.data.errors.username;
            });
      };
    $scope.verify = function (User) {
      if (User.password ==  User.confirmation) {
         $scope.passwordConf = 'icon-activo';
       } else {
        $scope.passwordConf = 'icon-inactivo';
      }
    };
  })
  .directive("compareTo",function() {
    return {
      require: "ngModel",
      scope: {
        otherModelValue: "=compareTo"
      },
      link: function(scope, element, attributes, ngModel) {

        ngModel.$validators.compareTo = function(modelValue) {
          return modelValue == scope.otherModelValue;
        };

        scope.$watch("otherModelValue", function() {
          ngModel.$validate();
        });
      }
    };
  } )
  .directive('onlyLettersInput',
    function onlyLettersInput() {
  return {
    require: 'ngModel',
    link: function(scope, element, attr, ngModelCtrl) {
      function fromUser(text) {
        var transformedInput = text.replace(/[^a-zA-Z]/g, '');
        //console.log(transformedInput);
        if (transformedInput !== text) {
          ngModelCtrl.$setViewValue(transformedInput);
          ngModelCtrl.$render();
        }
        return transformedInput;
      }
      ngModelCtrl.$parsers.push(fromUser);
    }
  };
})
  .directive('onlyNumbersInput',
  function onlyLettersInput() {
    return {
      require: 'ngModel',
      link: function(scope, element, attr, ngModelCtrl) {
        function fromUser(text) {
          var transformedInput = text.replace(/[^0-9]$/g, '');
          //console.log(transformedInput);
          if (transformedInput !== text) {
            ngModelCtrl.$setViewValue(transformedInput);
            ngModelCtrl.$render();
          }
          return transformedInput;
        }
        ngModelCtrl.$parsers.push(fromUser);
      }
    };
  });
