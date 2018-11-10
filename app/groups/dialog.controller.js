'use strict';
/**
 * @name dialog.controller:DialogCtrl
 * @description
 *
 * Handles dialog for detailed announcement
 *
 * @requires $mdThemingProvider
 * @requires $mdDialog
 * @requires $scope
 */
app.config(function($mdThemingProvider) {
  $mdThemingProvider.theme('red')
    .primaryPalette('red');

  $mdThemingProvider.theme('blue')
    .primaryPalette('blue');
}).controller('DialogCtrl', function($scope, $mdDialog) {
  $scope.theme = 'blue';
  $scope.status = '';
  $scope.customFullscreen = false;

  /**
   * @name  sendMessage
   * @methodOf adminMessagesCtrl.controller:AdminMessagesCtrl
   * @description
   *
   * Changes theme if message is inportant
   *
   * @requires message
   */
  $scope.changeTheme = function(message) {
    if (message.important === true) {
      $scope.theme = 'red';
    }
  };

  /**
   * @name  sendMessage
   * @methodOf adminMessagesCtrl.controller:AdminMessagesCtrl
   * @description
   *
   *  Display dialog with all the details about the announcemnt and implements delete button
   *
   * @requires ev
   * @requires message
   * @requires messages
   */
  $scope.showAdvanced = function(ev, message, messages) {
    $mdDialog.show({
      controller: DialogController,
      templateUrl: 'groups/dialog.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose: true,
      locals: {
        message: $scope.message
      }
    }).then(function(answer) {
      if (answer === true) { //if delete button pressed
        messages.$remove(message);
      }
    }, function() {
      $scope.status = 'You cancelled the dialog.';
    });
  };

  /**
   * @name  DialogController
   * @methodOf adminMessagesCtrl.controller:AdminMessagesCtrl
   * @description
   *
   * Handles diffrent states of the dialog
   *
   * @requires $scope
   * @requires $mdDialog
   * @requires message
   */
  function DialogController($scope, $mdDialog, message) {
    $scope.message = message;
    $scope.hide = function() {
      $mdDialog.hide();
    };

    $scope.cancel = function() {
      $mdDialog.cancel();
    };

    $scope.answer = function(answer) {
      $mdDialog.hide(answer);
    };
  }
});
