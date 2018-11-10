'use strict';
/**
 * @name groups.controller:GroupsCtrl
 * @description
 *
 * Handles
 *
 * @requires $state
 * @requires $firebaseArray
 * @requires $timeout
 * @requires $q
 * @requires $log
 * @requires Auth
 * @requires Users
 * @requires Students
 * @requires profile
 * @requires groups
 */
app.controller('GroupsCtrl', function($state, $firebaseArray, Auth, Users, Students, $mdSidenav, profile, groups, $window, $timeout, $q, $log) {
  var groupsCtrl = this;

  groupsCtrl.location = $window.location.href.split('/');
  console.log(groupsCtrl.location[groupsCtrl.location.length - 1]);

  groupsCtrl.profile = profile;
  groupsCtrl.groups = groups;

  groupsCtrl.users = Users.all; // this is how you access all the users
  groupsCtrl.students = Students.all;

  groupsCtrl.availableUsers = groupsCtrl.users;
  groupsCtrl.availableStudents = groupsCtrl.students;

  groupsCtrl.getDisplayName = Users.getDisplayName;
  groupsCtrl.getGravatar = Users.getGravatar;

  groupsCtrl.studentEmails = []; // this is where the student emails of the group will be saved
  groupsCtrl.adminEmails = []; // this is where the admin emails of the group will be saved

  groupsCtrl.newGroup = { // create newGroup object
    name: '',
    studentMembers: [],
    adminMembers: []
  };

  Users.setOnline(profile.$id); //set current user online

  /**
   * @name logout
   * @methodOf groups.controller:GroupsCtrl
   * @description
   *
   * Logout from platform and if successful go to home page
   *
   */
  groupsCtrl.logout = function() {
    groupsCtrl.profile.online = null;
    groupsCtrl.profile.$save().then(function() {
      Auth.$signOut().then(function() {
        $state.go('home');
      });
    });
  };

  groupsCtrl.invisibleTitle = false;

  groupsCtrl.buildToggler = function(componentId) {
    return function() {
      console.log('works');
      $mdSidenav(componentId).toggle();
    };
  };

  groupsCtrl.toggleLeft = groupsCtrl.buildToggler('left');
  groupsCtrl.toggleRight = groupsCtrl.buildToggler('right');

  /**
   * @name addMembers
   * @methodOf groups.controller:GroupsCtrl
   * @description
   *
   * Convert string into an array of emails
   *
   * @param {string} emails
   * @returns {Array.{string}} list of  students
   */
  groupsCtrl.addMembers = function(emails) {
    var actualMembers = [];

    if (typeof(emails) === 'string') { // if a string is pasted here we convert it into a list of emails
      emails = emails.replace(/\n/g, ' ').split(' ');
      for (var i = 0; i < emails.length; i++) {
        actualMembers.push(emails[i]);
      }
    } else { // check which of the possibleMembers are also in our database
      for (var i = 0; i < emails.length; i++) {
        for (var j = 0; j < groupsCtrl.users.length; j++) {
          if (emails[i] === groupsCtrl.users[j].email) {
            actualMembers.push(groupsCtrl.users[j]);
          }
        }
      }
    }
    return actualMembers;
  };

  /**
   * @name checkEmailInGroup
   * @methodOf groups.controller:GroupsCtrl
   * @description
   *
   * Check if email is in group
   *
   * @param {Array.<Object>} members
   * @param {string} email
   * @returns {Array.<Object>}1
   */
  groupsCtrl.checkEmailInGroup = function(members, email) {
    return members.filter(function(arr) {
      return arr.email === email;
    }).length > 0;
  };

  /**
   * @name createGroup
   * @methodOf groups.controller:GroupsCtrl
   * @description
   *
   * Add a new group to the in the database
   *
   */
  groupsCtrl.createGroup = function() {
    groupsCtrl.groups.$add({
      name: groupsCtrl.newGroup.name,
      studentMembers: groupsCtrl.addMembers(groupsCtrl.studentEmails),
      adminMembers: groupsCtrl.addMembers(groupsCtrl.adminEmails).concat([groupsCtrl.profile]) // add the creator of the group as admin
    }).then(function(ref) {
      $state.go('groups.messages', {
        groupId: ref.key
      });
    });
    groupsCtrl.availableUsers = groupsCtrl.users; // re-initialise the available users
  };

  /**
   * @name loadAll
   * @methodOf groups.controller:GroupsCtrl
   * @description
   *
   * Build `states` list of key/value pairs
   *
   */
  groupsCtrl.loadAll = function() {
    var emails = [];

    for (var i = 0; i < groupsCtrl.users.length; i++) {
      if (groupsCtrl.users[i].email) {
        emails.push(groupsCtrl.users[i].email);
      }
    }

    return emails.map(function(email) {
      return email.toLowerCase();
    });
  };

  groupsCtrl.emails = groupsCtrl.loadAll();

  /**
   * @name querySearch
   * @methodOf groups.controller:GroupsCtrl
   * @description
   *
   * Query search
   *
   * @param {string} query
   * @returns {string} results
   */
  groupsCtrl.querySearch = function(query) {
    var results = query ? groupsCtrl.emails.filter(groupsCtrl.createFilterFor(query)) : groupsCtrl.emails,
      deferred;
    if (groupsCtrl.simulateQuery) {
      deferred = $q.defer();
      $timeout(function() {
        deferred.resolve(results);
      }, Math.random() * 1000, false);
      return deferred.promise;
    } else {
      return results;
    }
  };

  /**
   * @name createFilterFor
   * @methodOf groups.controller:GroupsCtrl
   * @description
   *
   * Filter
   *
   * @param {string} query
   * @returns {Object}
   */
  groupsCtrl.createFilterFor = function(query) {
    var lowercaseQuery = angular.lowercase(query);

    return function filterFn(email) {
      return (email.indexOf(lowercaseQuery) === 0);
    };
  };

  /**
   * @name searchTextChange
   * @methodOf groups.controller:GroupsCtrl
   * @description
   *
   * Search text change
   *
   * @param {string} text
   */
  groupsCtrl.searchTextChange = function(text) {
    $log.info('Text changed to ' + text);
  };

  /**
   * @name selectedItemChange
   * @methodOf groups.controller:GroupsCtrl
   * @description
   *
   * Selected Item change
   *
   * @param {string} item
   */
  groupsCtrl.selectedItemChange = function(item) {
    $log.info('Item changed to ' + item);
  };
});
