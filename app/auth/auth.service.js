/**
 * @name auth.service:Auth
 * @description
 *
 * Returns the $firebaseAuth service associated with our Firebase.
 *
 * @requires $firebaseAuth
 * @return {Object} $firebaseAuth service associated with our Firebase
 */
app.factory('Auth', function($firebaseAuth) {
  var auth = $firebaseAuth();

  return auth;
});