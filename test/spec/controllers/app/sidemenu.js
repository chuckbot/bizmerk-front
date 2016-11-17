'use strict';

describe('Controller: AppSidemenuctrlCtrl', function () {

  // load the controller's modules
  beforeEach(module('bizmerkApp'));

  var AppSidemenuctrlCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AppSidemenuctrlCtrl = $controller('AppSidemenuctrlCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(AppSidemenuctrlCtrl.awesomeThings.length).toBe(3);
  });
});
