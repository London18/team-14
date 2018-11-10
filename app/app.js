'use strict';

/**
 * @ngdoc overview
 * @name Braniac
 * @description
 * # Braniac
 *
 * Main module of the application.
 */
var app = angular.module('Braniac', [
    'ngMaterial',
    'firebase',
    'angular-md5',
    'ui.router'
  ])
  .config(function($mdThemingProvider, $stateProvider, $urlRouterProvider, $qProvider) {
    $qProvider.errorOnUnhandledRejections(false);
    // Use that theme for the primary intentions
    $mdThemingProvider.theme('default')
      .primaryPalette('indigo')
      .accentPalette('red');
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'home/home.html',
        resolve: {
          requireNoAuth: function($state, Auth) {
            return Auth.$requireSignIn().then(function(auth) {
              $state.go('groups');
            }, function(error) {
              return;
            });
          }
        }
      })
      .state('login', {
        url: '/login',
        controller: 'AuthCtrl as authCtrl',
        templateUrl: 'auth/login.html',
        resolve: {
          requireNoAuth: function($state, Auth) {
            return Auth.$requireSignIn().then(function(auth) {
              $state.go('home');
            }, function(error) {
              return;
            });
          }
        }
      })
      .state('register', {
        url: '/register',
        controller: 'AuthCtrl as authCtrl',
        templateUrl: 'auth/register.html',
        resolve: {
          requireNoAuth: function($state, Auth) {
            return Auth.$requireSignIn().then(function(auth) {
              $state.go('home');
            }, function(error) {
              return;
            });
          }
        }
      })
      .state('groups', {
        url: '/groups',
        controller: 'GroupsCtrl as groupsCtrl',
        templateUrl: 'groups/groups.html',
        resolve: {
          groups: function(Groups) {
            return Groups.$loaded();
          },
          profile: function($state, Auth, Users) {
            return Auth.$requireSignIn().then(function(auth) {
              return Users.getProfile(auth.uid).$loaded().then(function(profile) {
                if (profile.displayName) {
                  return profile;
                } else {
                  $state.go('profile');
                }
              });
            }, function(error) {
              $state.go('home');
            });
          }
        }
      })
      .state('groups.messages', {
        url: '/{groupId}/messages',
        controller: 'MessagesCtrl as messagesCtrl',
        templateUrl: 'groups/messages.html',
        resolve: {
          messages: function($stateParams, Messages) {
            return Messages.forGroup($stateParams.groupId).$loaded();
          },
          groupName: function($stateParams, groups) {
            return groups.$getRecord($stateParams.groupId).name;
          },
          groupMembers: function($stateParams, groups) {
            return groups.$getRecord($stateParams.groupId).studentMembers;
          }
        }
      })
      .state('groups.direct', {
        url: '/{uid}/messages/direct',
        controller: 'AdminMessagesCtrl as messagesCtrl',
        templateUrl: 'groups/adminMessages.html',
        resolve: {
          messages: function($stateParams, Messages, profile) {
            return Messages.forUsers($stateParams.uid, profile.$id).$loaded();
          },
          groupName: function($stateParams, Users) {
            return Users.all.$loaded().then(function() {
              return Users.getDisplayName($stateParams.uid);
            });
          }
        }
      })
      .state('profile', {
        url: '/profile',
        controller: 'ProfileCtrl as profileCtrl',
        templateUrl: 'users/profile.html',
        resolve: {
          auth: function($state, Users, Auth) {
            return Auth.$requireSignIn().catch(function() {
              $state.go('home'); // redirect to home page if not authenticated
            });
          },

          profile: function(Users, Auth) {
            return Auth.$requireSignIn().then(function(auth) {
              return Users.getProfile(auth.uid).$loaded();
            });
          }
        }
      });

    $urlRouterProvider.otherwise('/');
  })
  .config(function() {
    var config = {
      apiKey: "",
      authDomain: "brainiac-89cda.firebaseapp.com",
      databaseURL: "https://brainiac-89cda.firebaseio.com",
      projectId: "brainiac-89cda",
      storageBucket: "brainiac-89cda.appspot.com",
      messagingSenderId: "976391771090"
    };

    if (!firebase.apps.length) {
       firebase.initializeApp(config);
    }
  });
