'use strict';
/**
 * @name auth.controller:AuthCtrl
 * @description
 *
 * Handles application authentication and authorization.
 *
 * @requires $state
 * @requires $firebaseArray
 * @requires Auth
 * @requires AdminEmails
 */
app.controller('AuthCtrl', function($state, $firebaseArray, Auth) {
  var authCtrl = this;
  
  authCtrl.newAdmin = { // create newAdmin object
    email: ''
  };
  authCtrl.user = { // create user Object
    email: '',
    password: ''
  };

  /**
   * @name login
   * @methodOf auth.controller:AuthCtrl
   * @description
   *
   * Handles sign in into the platform and if successful redirects you to the home page
   *
   */
  authCtrl.login = function() {
    Auth.$signInWithEmailAndPassword(authCtrl.user.email, authCtrl.user.password).then(function(auth) {
      $state.go('home');
    }, function(error) {
      authCtrl.error = error;
    });
  };

  /**
   * @name register
   * @methodOf auth.controller:AuthCtrl
   * @description
   *
   * Checks if the mail is valid and then creates a new admin in firebase database
   *
   */
  authCtrl.register = function() {
      Auth.$createUserWithEmailAndPassword(authCtrl.user.email, authCtrl.user.password).then(function(user) {
        $state.go('profile');
      }, function(error) {
        authCtrl.error = error;
      });
  };
});
