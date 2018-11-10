describe(' MessagesCtrl', function() {
  beforeEach(angular.mock.module('Braniac'));

  var $controller;

  beforeEach(inject(function($controller) {
    $controller = $controller;
  }));

  // describe('Testing Messages Controller', function() {
  //
  //   var $scope, controller;
  // 
  //   beforeEach(function() {
  //     $scope = {};
  //
  //     controller = $controller('MessagesCtrl', {
  //       $scope: $scope
  //     });
  //
  //   });
  //
  //   it('should have a MessagesCtrl controller', function() {
  //     expect(controller).not.toEqual(null);
  //   });
  //
  //
  //   it('should have messages defined', function() {
  //     expect(controller.messages).not.toEqual(null);
  //   });
  //
  //   it('should have groupName defined', function() {
  //     expect(controller.groupName).not.toEqual(null);
  //   });
  //
  //   it('should have sendMessage defined', function() {
  //     expect(controller.sendMessage).not.toEqual(null);
  //   });
  //
  // });

});