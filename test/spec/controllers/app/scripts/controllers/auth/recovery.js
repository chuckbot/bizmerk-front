'use strict';

describe('Controller: AppScriptsControllersAuthRecoveryctrlCtrl', function () {

  // load the controller's modules
  beforeEach(module('bizmerkApp'));

  var AppScriptsControllersAuthRecoveryctrlCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AppScriptsControllersAuthRecoveryctrlCtrl = $controller('AppScriptsControllersAuthRecoveryctrlCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(AppScriptsControllersAuthRecoveryctrlCtrl.awesomeThings.length).toBe(3);
  });
});
