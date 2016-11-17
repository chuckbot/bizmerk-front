'use strict';
  angular.module('bizmerkApp')
    .controller('CampaignsCtrl', function ($filter,$scope, $rootScope,$uibModal, toaster,CampResource) {
      $scope.idSelectedItem = null;
      $scope.setSelected = function (item) {
        $scope.idSelectedItem = item;
      };
      $scope.list = $scope.$parent.personList;
      $scope.config = {
        itemsPerPage: 5,
        fillLastPage: true
      };
      function campList() {
        CampResource.getCampaigns(function (data) {
          $scope.campaigns = [];
          $scope.keeper= data.total;
          $scope.itemsByPage = data.per_page;
          $scope.currentPage = data.current_page;
          $scope.displayedPages = data.last_page;
          data.data.forEach(function (data) {
            var newDate = new Date(data.created_at);
            var campaign = {
              id: data.id,
              name : data.name,
              status: data.status,
              created_at: $filter('date')(newDate,"yyyy.MMM.dd")
            };
            $scope.campaigns.push(campaign);
          });
          var draft = {
            status: 'INA'
          };
          CampResource.getCampaigns(draft, function (response) {
            $scope.campdraft = response.total;
          });
          var pub = {
            status: 'ACT'
          };
          CampResource.getCampaigns(pub, function (response) {
            $scope.camppublic = response.total;
          });
        });
      }
      campList();
      $rootScope.$on("callCampList", function(){
        campList();
      });
      $scope.draftSearch = function () {
        var draft = {
          status: 'INA'
        };
        CampResource.getCampaigns(draft,function (data) {
          $scope.campaigns = [];
          $scope.keeper= data.total;
          $scope.itemsByPage = data.per_page;
          $scope.currentPage = data.current_page;
          $scope.displayedPages = data.last_page;
          data.data.forEach(function (data) {
            var newDate = new Date(data.created_at);
            var campaign = {
              id: data.id,
              name : data.name,
              status: data.status,
              created_at: $filter('date')(newDate,"yyyy.MMM.dd")
            };
            $scope.campaigns.push(campaign);
          });
        });

      };
      $scope.publicSearch = function () {
        var pub = {
          status: 'ACT'
        };
        CampResource.getCampaigns(pub,function (data) {
          $scope.campaigns = [];
          $scope.keeper= data.total;
          $scope.itemsByPage = data.per_page;
          $scope.currentPage = data.current_page;
          $scope.displayedPages = data.last_page;
          data.data.forEach(function (data) {
            var newDate = new Date(data.created_at);
            var campaign = {
              id: data.id,
              name : data.name,
              status: data.status,
              created_at: $filter('date')(newDate,"yyyy.MMM.dd")
            };
            $scope.campaigns.push(campaign);
          });
        });
      };

      $scope.allSearch = function () {
        CampResource.getCampaigns(function (data) {
          $scope.campaigns = [];
          $scope.keeper= data.total;
          $scope.itemsByPage = data.per_page;
          $scope.currentPage = data.current_page;
          $scope.displayedPages = data.last_page;
          data.data.forEach(function (data) {
            var newDate = new Date(data.created_at);
            var campaign = {
              id: data.id,
              name : data.name,
              status: data.status,
              created_at: $filter('date')(newDate,"yyyy.MMM.dd")
            };
            $scope.campaigns.push(campaign);
          });
        });
      };

      $scope.range = function (size,start, end) {
        var ret = [];
        if (size < end) {
          end = size;
          start = size-$scope.displayedPages;
        }
        for (var i = start; i < end; i++) {
          ret.push(i);
        }
        return ret;
      };

      $scope.prevPage = function () {
        if ($scope.currentPage > 0) {
          $scope.currentPage--;
        }
      };

      $scope.nextPage = function () {
        if ($scope.currentPage < $scope.displayedPages.length - 1) {
          $scope.currentPage++;
        }
      };

      $scope.setQuery = function (query) {
        CampResource.getCampaigns(query,function (data) {
          $scope.campaigns = [];
          $scope.keeper= data.total;
          $scope.itemsByPage = data.per_page;
          $scope.currentPage = data.current_page;
          $scope.displayedPages = data.last_page;
          data.data.forEach(function (data) {
            var newDate = new Date(data.created_at);
            var campaign = {
              id: data.id,
              name : data.name,
              status: data.status,
              created_at: $filter('date')(newDate,"yyyy.MMM.dd")
            };
            $scope.campaigns.push(campaign);
          });
        });
      };

      $scope.setPage = function (a) {
        $scope.currentPage = this.n;
        var page = {
          currentPage: a
        };
        CampResource.getCampaigns(page,function (data) {
          $scope.campaigns = [];
          data.data.forEach(function (data) {
            var newDate = new Date(data.created_at);
            var campaign = {
              id: data.id,
              name : data.name,
              status: data.status,
              created_at: $filter('date')(newDate,"yyyy.MMM.dd")
            };
            $scope.campaigns.push(campaign);
          });

        });
      };

      $scope.newCampaign = function (campaign) {
        CampResource.newCampaign(campaign,function (data) {
          campList();
          $scope.Campaign.name = "";
          $scope.Campaign.status = "";
          $rootScope.$emit('validate', ('success',{type:'success',message:'¡Campaña Creada!'}));
        },function (err) {
          console.log(err);
          $rootScope.$emit('validate', ('success',{type:'error',message:'¡No se pudo borrar la campaña'}));
        });
      };


      $scope.animationsEnabled = true;

      $scope.open = function (item) {
        $uibModal.open({
          animation: $scope.animationsEnabled,
          url: '/edit',
          templateUrl: 'modal.html',
          controller: 'CampUpdateCtrl',
          resolve: {
            items: function () {
              return item;
            }
          }
        });

      };
      $scope.delete = function (item) {
        $uibModal.open({
          animation: $scope.animationsEnabled,
          url: '/edit',
          templateUrl: 'deletemodal.html',
          controller: 'CampDeleteCtrl',
          resolve: {
            items: function () {
              return item;
            }
          }
        });
      };




      $scope.dateOptions = {
        formatYear: 'yy',
        maxDate: new Date(2020, 5, 22),
        minDate: new Date(),
        startingDay: 1
      };
      $scope.open1 = function() {
        $scope.popup1.opened = true;
      };

      $scope.open2 = function() {
        $scope.popup2.opened = true;
      };

      $scope.popup1 = {
        opened: false
      };

      $scope.popup2 = {
        opened: false
      };
    })
    .controller('CampDeleteCtrl', function ($scope,$filter, $rootScope,$uibModalInstance, items, CampResource) {
      $scope.camp = items;
      $scope.DeleteCamp = function (object) {
        var campId= {
          id: object
        };
        CampResource.deleteCampaign(campId, function () {
          $rootScope.$emit("callCampList", {});
          $rootScope.$emit('validate', ('success',{type:'success',message:'¡Campaña Borrada!'}));
        },function (err) {
          console.log(err);
          $rootScope.$emit('validate', ('success',{type:'error',message:'¡No se pudo borrar el contacto'}));
        });
        $uibModalInstance.close();
      };

      $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
      };
    })
    .controller('CampUpdateCtrl', function ($scope, $filter,$rootScope, $uibModalInstance, items, CampResource) {
      $scope.editable = items;
      $scope.selection = [{id: 'ACT', label: 'PUBLISHED'}, {id: 'INA', label: 'DRAFT'}];
      $scope.updateCamp = function (object) {
        $scope.upcamp = {
          id: object.id,
          name: object.name,
          status: object.status,
          updated_at: object.updated_at,
          user_id: object.user_id
        };
        CampResource.updateCampaign($scope.upcamp, function () {
          $rootScope.$emit("callCampList", {});
          $rootScope.$emit('validate', ('success',{type:'success',message:'¡Campaña Editada!'}));
        },function (err) {
          console.log(err);
          $rootScope.$emit('validate', ('success',{type:'error',message:'¡No se pudo borrar el contacto'}));
        });
        $uibModalInstance.close();
      };

      $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
      };
    });
