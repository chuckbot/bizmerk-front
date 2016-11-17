'use strict';

/**
 * @ngdoc overview
 * @name bizmerkApp
 * @description
 * # bizmerkApp
 *
 * Main module of the application.
 */
angular.module('underscore', [])
  .factory('_', function() {
    return window._; // assumes underscore has already been loaded on the page
  });
angular
  .module('bizmerkApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.router',
    'smart-table',
    'ui.bootstrap',
    'satellizer',
    'pascalprecht.translate',
    'angular-table',
    'underscore',
    'smart-table',
    'angular-loading-bar',
    'toaster',
    'puigcerber.countryPicker'

  ])
  .config(['$httpProvider', 'SatellizerConfig', '$translateProvider', function($httpProvider, config, $translateProvider) {
    $httpProvider.interceptors.push(['$q', function($q) {
      var tokenName = config.tokenPrefix ? config.tokenPrefix + '_' + config.tokenName : config.tokenName;
      return {
        request: function(httpConfig) {
          var token = localStorage.getItem(tokenName);
          if (token && config.httpInterceptor) {
            token = config.authHeader === 'Authorization' ? 'Bearer ' + token : token;
            httpConfig.headers[config.authHeader] = token;
          }
          return httpConfig;
        },
        responseError: function(response) {
          return $q.reject(response);
        }
      };
    }]);
    $translateProvider.useStaticFilesLoader({
        prefix: '/languages/',
        suffix: '.json'
    });
    $translateProvider.preferredLanguage('es_ES');
    $translateProvider.useSanitizeValueStrategy('escape');
  }])
  .config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
    cfpLoadingBarProvider.includeBar = true;
  }])
/* Setup Rounting For All Pages */
.config(['$stateProvider', '$urlRouterProvider','$locationProvider', function($stateProvider, $urlRouterProvider,$locationProvider) {
  // Redirect any unmatched url

  $locationProvider.html5Mode(false);
  $urlRouterProvider.otherwise('/auth/login');

  $stateProvider

  // Auth
    .state('auth', {
      url: '/auth',
      templateUrl: 'views/auth/auth.html',
      abstract:true
    })
    .state('auth.login', {
      url: '/login',
      templateUrl: 'views/auth/login.html',
      data: {pageTitle: 'Login to Bizmerk App'},
      controller: 'LoginCtrl'
    })
    .state('auth.signup', {
      url: '/signup',
      templateUrl: 'views/auth/signup.html',
      data: {pageTitle: 'Sign up to Bizmerk App'},
      controller: 'SignupCtrl'
    })
    .state('auth.sentemail', {
      url: '/sentemail',
      templateUrl: 'views/auth/sentemail.html',
      data: {pageTitle: 'Confirmation Bizmerk App'},
      controller: 'sentMailCtrl'
    })
    .state('auth.recoverymail', {
      url: '/recoverymail',
      templateUrl: 'views/auth/recoverymail.html',
      data: {pageTitle: 'Confirmation Bizmerk App'}
    })
    .state('auth.confirmation', {
      url: '/confirm/:confirmation',

      templateUrl: 'views/auth/confirmation.html',
      data: {pageTitle: 'Confirmation Bizmerk App'},
      controller: 'ConfirmationCtrl'
    })
    .state('auth.recovery', {
      url: '/recovery',
      templateUrl: 'views/auth/recovery.html',
      data: {pageTitle: 'Forgot Password Bizmerk App'},
      controller: 'RecoveryCtrl'
    })
    .state('auth.changePassword', {
      url: '/changePassword/:token',
      templateUrl: 'views/auth/changePassword.html',
      data: {pageTitle: 'Forgot Password Bizmerk App'},
      controller: 'PasswordCtrl'
    })
    .state('auth.details', {
      url: '/details',
      templateUrl: 'views/auth/signup.detail.html',
      data: {pageTitle: 'Sign up to Bizmerk App',requiredLogin: true},
      controller: 'SignupCtrl'
    })

  // Dashboard
    .state('app', {
      url: '',
      abstract:true,
      templateUrl: 'views/app.html',
      data: {pageTitle: 'Welcome to bizmerk',requiredLogin: true},
      controller: 'AppCtrl'
    })
    .state('app.dashboard', {
      url: '/dashboard',
      templateUrl: 'views/components/dashboard/dashboard.html',
    })
    .state('app.campaigns', {
      url: '/campaigns',
      templateUrl: 'views/components/modules/Campaigns.html',
      data: {pageTitle: 'Campaigns',requiredLogin: true},
      controller: 'CampaignsCtrl'
    })
    .state('app.contacts', {
      url: '/contacts',
      templateUrl: 'views/components/modules/contactTable.html',
      data: {pageTitle: 'Contacts',requiredLogin: true},
      controller: 'ContactCtrl'
    })
    .state('app.contactDetails', {
      url: '/contactDetails/:idContact',
      templateUrl: 'views/components/modules/contactDetails.html',
      data: {pageTitle: 'Contact Details',requiredLogin: true},
      controller: 'ContactDetail'
    })
    .state('app.newContacts', {
      url: '/newContact',
      templateUrl: 'views/components/modules/Contacts.html',
      data: {pageTitle: 'New Contacts',requiredLogin: true},
      controller: 'NewContact'
    })
    .state('app.editContact', {
      url: '/editContact/:idContact',
      templateUrl: 'views/components/modules/editContact.html',
      data: {pageTitle: 'Edit Contact',requiredLogin: true},
      controller: 'EditContact'
    })
    //se debe llamar config
    .state('app.profile', {
      url: '/showme',
      templateUrl: 'views/components/settings/profile.html',
      data: {pageTitle: 'Profile',requiredLogin: true},
      controller: 'ProfileCtrl'
    });
}])
  .run(function ($rootScope, $state, $auth) {
  $rootScope.$on('$stateChangeStart',
    function (event, toState) {
      var requiredLogin = false;
      // check if this state need login
      if (toState.data && toState.data.requiredLogin) {
        requiredLogin = true;
      }

      // if yes and if this user is not logged in, redirect him to login page
      if (requiredLogin && !$auth.isAuthenticated()) {
        event.preventDefault();
        $state.go('auth.login');
      }
    });
    $rootScope.$on('auth.login',
      function (event, toState) {
        // if yes and if this user is not logged in, redirect him to login page
        if ($auth.isAuthenticated()) {
          event.preventDefault();
          $state.go('app.dashboard');
        }
      });
});
