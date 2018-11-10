'use strict';
/**
 * @name groups.service:Groups
 * @description
 *
 * Returns an array of object with all the entries under the groups table
 *
 * @requires $firebaseArray
 * @return {Array.<Object>} array of objects under the groups table
 */
app.factory('Tags', function($firebaseObject, $firebaseArray) {
  var ref = firebase.database().ref('Tags');
  var tags = $firebaseArray(ref);

  return tags;
});
