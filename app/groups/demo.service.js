'use strict';
/**
 * @name demo.service:Demo
 * @description
 *
 * Returns an array of object with all the entries under the groups table
 *
 * @requires $firebaseArray
 * @return {Array.<Object>} array of objects under the groups table
 */
app.factory('Demo', function($firebaseArray) {
  var ref = firebase.database().ref('Questions');
  var questions = $firebaseArray(ref);

  return questions;
});
