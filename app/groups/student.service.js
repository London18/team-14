'use strict';
/**
 * @name student.service:Students
 * @description
 *
 * The purpose of this factory is to provide specific student's data or to get a list of all of our students.
 *
 * @requires $firebaseArray
 * @return {Array.<Object>} array of student object
 */
app.factory('Students', function($firebaseArray) {
  var studentsRef = firebase.database().ref('students'); //reference to the students node
  var students = $firebaseArray(studentsRef); //create a firebase array using the reference

  var Students = {
    /**
     * @name getFcmToken
     * @description
     *
     * Gives a student's fcmToken when given an uid
     *
     * @param {string} uid Uniqie id of students
     * @returns {number} fcmToken
     */
    getFcmToken: function(uid) {
      return students.$getRecord(uid).fcmToken;
    },

    /**
     * @name getFcmToken
     * @description
     *
     * Gives a student's displayName when given an uid
     *
     * @param {string} uid Uniqie id of students
     * @returns {string} student name
     */
    getDisplayName: function(uid) {
      return students.$getRecord(uid).displayName;
    },

    /**
     * @name getFcmToken
     * @description
     *
     * Gives a student's email when given an uid
     *
     * @param {string} uid Uniqie id of students
     * @returns {string} student email
     */
    getEmail: function(uid) {
      return students.$getRecord(uid).email;
    },
    all: students //  all returns a $firebaseArray of all the students
  };

  return Students;
});
