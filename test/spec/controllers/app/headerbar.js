'use strict';

describe('Controller: AppHeaderbarCtrl', function () {

  // load the controller's modules
  beforeEach(module('bizmerkApp'));

  var AppHeaderbarCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AppHeaderbarCtrl = $controller('AppHeaderbarCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(AppHeaderbarCtrl.awesomeThings.length).toBe(3);
  });
});
