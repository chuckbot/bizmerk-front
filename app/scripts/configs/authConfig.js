'use strict';

/**
 * @ngdoc function
 * @name bizmerkApp.service:AuthConfig
 * @description
 * # AuthConfig
 * Config of the AuthCtrl
 */
angular.module('bizmerkApp')
  .config(function($authProvider,Config) {
    // Parametros de configuración

    $authProvider.loginUrl = Config.apiUrl+'login';
    $authProvider.signupUrl = Config.apiUrl+'users';
    // $authProvider.tokenName = Config.tokenName;
    $authProvider.tokenPrefix = Config.tokenPrefix;
  })
  ;
