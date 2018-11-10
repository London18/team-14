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
app.factory('Dashboard', function($firebaseObject, $firebaseArray) {
  var ref = firebase.database().ref('Questions');
  var questions = $firebaseArray(ref);

  var Questions = {

    getAll: function() {
      return $firebaseObject(ref);
    },

    getArray: function() {
      return questions;
    },

    getAnswer: function(uid) {
      return questions.$getRecord(uid).Answer;
    },

    getTags: function(uid) {
      return questions.$getRecord(uid).signature;
    },

    getQuestion: function(uid) {
      return questions.$getRecord(uid).Question;
    },

    all: questions // all returns a $firebaseArray of all the admins
  };

  return Questions;
});
