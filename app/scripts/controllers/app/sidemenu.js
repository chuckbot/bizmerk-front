'use strict';

/**
 * @ngdoc function
 * @name bizmerkApp.controller:SidemenuCtrl
 * @description
 * # SidemenuctrlCtrl
 * Controller of the bizmerkApp
 */
angular.module('bizmerkApp')
  .controller('SidemenuCtrl', function ($scope) {
    $scope.modules = [{
        icon: 'icon-dashboard',
        title: 'DASHBOARDS',
        link: 'app.dashboard'
      },
      {
        icon: 'icon-campanas',
        title: 'CAMPAIGNS',
        link: 'app.campaigns'
      },
      {
        icon: 'icon-landingpage',
        title: 'LANDGING_PAGES',
        link: 'app.landings'
      },
      {
        icon: 'icon-contactos',
        title: 'CONTACTS',
        link: 'app.contacts'
      },
      {
        icon: 'icon-leadnurturing',
        title: 'LEAD_NURTURING',
        link: 'app.leads'
      },
      {
        icon: 'icon-reportes',
        title: 'REPORTS',
        link: 'app.reports'
      }];







    $scope.minSidemenu = function (){
      var main = angular.element('#bz-main');
      var arrow = angular.element('.arrow-icon');
      if($scope.classSidemenu == "")
      {
        $scope.classSidemenu = "bz-sidemenu-show";
        main.addClass("bz-content-show");
        arrow.addClass("icon-izquierda");
        arrow.removeClass("icon-derecha");
        $scope.classTitle = "bz-title-show";
      }
      else
      {
        $scope.classSidemenu = "";
        arrow.addClass("icon-derecha");
        arrow.removeClass("icon-izquierda");
        main.removeClass("bz-content-show");
        $scope.classTitle = "";
      } 
    }
    $scope.shMenu = function() {
      var btnMin = angular.element('#btn-min-sm');
      var main = angular.element('#bz-main');

      if($scope.classSidemenu == "menu-show")
      {
        $scope.classSidemenu = ""; 
        main.removeClass("content-low");
        btnMin.removeClass("hide");
        $scope.classTitle = "";
      }
      else
      {
        $scope.classSidemenu = "menu-show";
        main.addClass("content-low");
        btnMin.addClass("hide");
        $scope.classTitle = "bz-title-show";
       
      }

    }
  }); 
