'use strict';

describe('Controller: ModuleCampaignsCtrl', function () {

  // load the controller's modules
  beforeEach(module('bizmerkApp'));

  var ModuleCampaignsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ModuleCampaignsCtrl = $controller('ModuleCampaignsCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ModuleCampaignsCtrl.awesomeThings.length).toBe(3);
  });
});
