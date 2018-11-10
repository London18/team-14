'use strict';
/**
 * @name messages.service:Messages
 * @description
 *
 * Returns an array of object with all the entries unde the groups table
 *
 * @requires $firebaseArray
 */
app.factory('Messages', function($firebaseArray) {
  var groupMessagesRef = firebase.database().ref('groupMessages');
  var userMessagesRef = firebase.database().ref('userMessages');

  return {
    /**
     * @name forGroup
     * @description
     *
     * Gives the announcemnts of a group when given an uid
     *
     * @param {number} groupId selected group id
     * @return {Array.<Object>} array of selected group messages
     */
    forGroup: function(groupId) {
      return $firebaseArray(groupMessagesRef.child(groupId));
    },

    /**
     * @name forUsers
     * @description
     *
     * Gives the messages between two admins when given the uid of admin
     *
     * @param uid1 first user
     * @param uid2 second user
     * @return {Array.<Object>} array of admin messages
     */
    forUsers: function(uid1, uid2) {
      var path = uid1 < uid2 ? uid1 + '/' + uid2 : uid2 + '/' + uid1; //the admin with a lower id will hold the conversation with the one who has a higher id

      return $firebaseArray(userMessagesRef.child(path));
    }
  };
});
