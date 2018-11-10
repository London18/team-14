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
              $state.go('dashboard');
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
      .state('dashboard', {
        url: '/dashboard',
        controller: 'DashboardCtrl as DashboardCtrl',
        templateUrl: 'dashboard/dashboard.html',
      })
      .state('questionForm', {
        url: '/form',
        controller: 'FormCtrl as FormCtrl',
        templateUrl: 'groups/questionForm.html',
        resolve: {
          groups: function(Groups) {
            return Groups.$loaded();
          },
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
      apiKey: "AIzaSyD-ekjWWT3RRwKJINyG_w6iz4fzkg9fFmw",
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
