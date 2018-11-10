'use strict';
/**
 * @name student.service:Students
 * @description
 *
 * The purpose of this factory is to provide specific admin's data or to get a list of all of our users.
 *
 * @requires $firebaseArray
 * @return {Array.<Object>} array of user object
 */
app.factory('Users', function($firebaseArray, $firebaseObject) {
  var usersRef = firebase.database().ref('users'); //reference to the users node
  var connectedRef = firebase.database().ref('.info/connected');
  var users = $firebaseArray(usersRef); //create a firebase array using the reference

  var Users = {
    /**
     * @name getProfile
     * @description
     *
     * Gives us a $firebaseObject of a specific admin's profile
     *
     * @param {string} uid Uniqie id of admin
     * @returns {string} admin profile
     */
    getProfile: function(uid) {
      return $firebaseObject(usersRef.child(uid));
    },

    /**
     * @name getDisplayName
     * @description
     *
     * Gives a admin's displayName when given an uid
     *
     * @param {string} uid Uniqie id of admin
     * @returns {string} admin name
     */
    getDisplayName: function(uid) {
      return users.$getRecord(uid).displayName;
    },

    /**
     * @name getSignature
     * @description
     *
     * Gives a admin's signiture when given an uid
     *
     * @param {string} uid Uniqie id of admin
     * @returns {string} admin signature
     */
    getSignature: function(uid) {
      return users.$getRecord(uid).signature;
    },

    /**
     * @name getEmail
     * @description
     *
     * Gives a admin's email when given an uid
     *
     * @param {string} uid Uniqie id of admin
     * @returns {number} admin email
     */
    getEmail: function(uid) {
      return users.$getRecord(uid).email;
    },

    /**
     * @name setOnline
     * @description
     *
     * Set an admin online for a given uid
     *
     * @param {string} uid Uniqie id of admin
     */
    setOnline: function(uid) {
      var connected = $firebaseObject(connectedRef); // var to check if online
      var online = $firebaseArray(usersRef.child(uid + '/online')); // array to add online people

      connected.$watch(function() {
        if (connected.$value === true) {
          online.$add(true).then(function(connectedRef) {
            connectedRef.onDisconnect().remove();
          });
        }
      });
    },
    all: users // all returns a $firebaseArray of all the admins
  };

  return Users;

});