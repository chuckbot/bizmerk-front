'use strict';

describe('Controller: NewControllerCtrl', function () {

  // load the controller's modules
  beforeEach(module('bizmerkApp'));

  var NewControllerCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    NewControllerCtrl = $controller('NewControllerCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(NewControllerCtrl.awesomeThings.length).toBe(3);
  });
});
