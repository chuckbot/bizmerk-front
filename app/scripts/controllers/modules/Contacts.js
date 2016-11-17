angular.module('bizmerkApp')
	.controller('ContactCtrl', function ($scope, $uibModal,$state,$filter, toaster, ContactData, $rootScope) {
    // Get list
		function contactList (query) {
      $scope.contacts= [];
	      	ContactData.query(query,function (response) {
            $scope.itemsByPage = response.contacts.per_page;
            $scope.currentPage = response.contacts.current_page;
            $scope.displayedPages = response.contacts.last_page;
            $scope.totalContact = response.contacts.total;
            response.contacts.data.forEach(function (data) {
              console.log(data);
              var newDate = new Date(data.created_at);
              var contact = {
                id: data.id,
                firstName : data.firstName,
                lastName : data.lastName,
                email : data.email,
                country : data.country,
                address : data.address,
                phone : data.phone,
                postalCode : data.postalCode,
                companyName : data.companyName,
                webSite : data.webSite,
                published: data.published,
                priority: data.priority,
                status: data.status,
                campaign: data.campaing_id,
                addList: data.addList,
                tags: data.tags,
                created_at: $filter('date')(newDate,"yyyy.MMM.dd")
              };
              $scope.contacts.push(contact);
            })
	      	});
	    }
    contactList();
    $scope.allSearch = function () {
      contactList();
    };

// Contact Query and Pagination
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
      console.log(query);
      contactList(query);
    };

    $scope.setPage = function (a) {
      $scope.currentPage = this.n;
      var page = {
        currentPage: a
      };
      console.log(page.currentPage);
      console.log(a);
      contactList(page);
    };

// Open dates
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



    $scope.animationsEnabled = true;
    $rootScope.$on("callContactlist", function(){
      contactList();
    });

    $scope.edit = function (item) {
      $uibModal.open({
        animation: $scope.animationsEnabled,
        url: '/edit',
        templateUrl: 'contactmodal.html',
        controller: 'ModalInstanceCtrl',
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
        url: '/delete',
        templateUrl: 'delcontactmodal.html',
        controller: 'ModalDeleteCtrl',
        resolve: {
          items: function () {
            return item;
          }
        }
      });
    };
      })


  .controller('ContactDetail', function ($scope, $stateParams, $state,$filter, ContactData) {
    ContactData.query({id:$stateParams.idContact}, function (response) {
      $scope.contact = response.contacts;

    })
  })

  .controller('NewContact', function ($scope,$rootScope, $stateParams, $state, $filter, ContactData,CampResource) {
    CampResource.getCampaigns(function (campaigns) {
      console.log(campaigns.data);
      $scope.campaigns = campaigns.data;
    });
    // New contact
    $scope.addNewContact = function (data) {
      console.log(data);
      var contact = {
        firstName : data.firstName,
        lastName : data.lastName,
        email : data.email,
        country : data.country,
        address : data.address,
        phone : data.phone,
        postalCode : data.postalCode,
        companyName : data.companyName,
        webSite : data.webSite,
        published: data.published,
        priority: data.priority,
        status: data.status,
        campaing_id: data.campaing_id,
        addList: data.addList,
        tags: data.tags
      };
      console.log(contact);
      ContactData.newContact(contact, function  (response) {
        console.log(response);
        $rootScope.$emit("callContactlist", {});
        $state.go('app.contacts');
        $rootScope.$emit('validate', ('success',{type:'success',message:'¡Contacto Creado'}));
      },function (err) {
        console.log(err);
        $rootScope.$emit('validate', ('success',{type:'error',message:'¡No se pudo crear el contacto'}));
      });
    };
  })

  .controller('EditContact', function ($scope,$rootScope, $stateParams, $state, $filter, ContactData,CampResource) {
    ContactData.query({id:$stateParams.idContact}, function (response) {
      $scope.contact = response.contacts;
      console.log(response);
    });
    CampResource.getCampaigns(function (campaigns) {
      console.log(campaigns.data);
      $scope.campaigns = campaigns.data;
    });

    $scope.editContact = function () {
      ContactData.update({id: $scope.contact.id},$scope.contact, function  (response) {
        console.log(response);
        $rootScope.$emit('validate', ('success',{type:'success',message:'¡Contacto Editado'}));
        $state.go('app.contacts');
      },function (err) {
        console.log(err);
        $rootScope.$emit('validate', ('success',{type:'error',message:'¡No se pudo editar el contacto'}));
      });
    };
  })


  .controller('ModalDeleteCtrl', function ($rootScope, $scope,$filter, $uibModalInstance, $state, items, ContactData) {
    $scope.cont = items;
    console.log(items);

    $scope.contactDel = function () {
      ContactData.delete({id:items.id},function () {
        $rootScope.$emit("callContactlist", {});
        console.log('here');
        $rootScope.$emit('validate', ('success',{type:'success',message:'¡Contacto Borrado'}));

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
