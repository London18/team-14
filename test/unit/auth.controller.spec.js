describe('AuthCtrl', function() {
  beforeEach(angular.mock.module('Braniac'));

  var $controller;

  beforeEach(inject(function($controller) {
    $controller = $controller;
  }));

  // describe('Testing Authentication Controller', function() {
  //   var $scope, controller;
  //
  //   beforeEach(function() {
  //     $scope = {};
  //     controller = $controller('AuthCtrl', {
  //       $scope: $scope
  //     });
  //   });
  //
  //   it('should have a AuthCtrl controller', function() {
  //     expect(controller).not.toEqual(null);
  //   });
  //
  //   it('should have adminEmails defined and with size 0', function() {
  //     var length = (controller.adminEmails).length;
  //     expect(controller.adminEmails).not.toEqual(null);
  //     expect(length).toBe(0);
  //
  //     $scope.newAdmin = {
  //       email: 'testEmail@kcl.ac.uk'
  //     };
  //   });
  //
  //   it('should have login defined', function() {
  //     expect(controller.login).not.toEqual(null);
  //   });
  //
  //   it('should have register defined', function() {
  //     expect(controller.register).not.toEqual(null);
  //   });
  //
  //   it('should have isValidAdmin defined', function() {
  //     expect(controller.isValidAdmin).not.toEqual(null);
  //   });
  //
  //   it('should have addAdmin defined', function() {
  //     expect(controller.addAdmin).not.toEqual(null);
  //   });
  //
  //   it('should have addAdmin defined', function() {
  //     expect(controller.testFalse).not.toEqual(null);
  //   });
  //
  //   it('should have a defined scope', function() {
  //     expect($scope).toBeDefined();
  //   });
  //
  // });
});