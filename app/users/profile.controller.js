'use strict';
/**
 * @name profile.controller:ProfileCtrl
 * @description
 *
 * Handle the update of a profile
 *
 * @requires $state
 * @requires md5
 * @requires auth
 * @requires profile
 **/
app.controller('ProfileCtrl', function($state, md5, auth, profile) {
  var profileCtrl = this;

  profileCtrl.profile = profile;

  /**
   * @name updateProfile
   * @description
   *
   * Update a profile's dyispaly name
   *
   */
  profileCtrl.updateProfile = function() {
    profileCtrl.profile.email = auth.email;
    profileCtrl.profile.$save().then(function() {
      $state.go('groups');
    });
  };

});