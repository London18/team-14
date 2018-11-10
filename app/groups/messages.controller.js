'use strict';
/**
 * @name nessages.controller:MessagesCtrl
 * @description
 *
 *
 * @requires $firebaseArray
 * @requires $http
 * @requires Students
 * @requires profile
 * @requires groupName
 * @requires messages
 * @requires groupMembers
 */
app.controller('MessagesCtrl', function($firebaseArray, $http, $window, Students, profile, groupName, messages, groupMembers) {
  var messagesCtrl = this;

  messagesCtrl.messages = messages;
  messagesCtrl.groupName = groupName;
  messagesCtrl.groupMembers = groupMembers;
  messagesCtrl.tokens = Students.all;

  messagesCtrl.message = '' + '\n--- \n' + profile.signature; // add signiture to annoucement description
  messagesCtrl.title = '';
  messagesCtrl.important = false;
  messagesCtrl.notificationPriority = '';

  /**
   * @name onChange
   * @description
   *
   * If toggle button pressed set priority as important and push notification priority as high
   *
   */
  messagesCtrl.onChange = function(cbState) {
    if (cbState) {
      messagesCtrl.important = true;
      messagesCtrl.notificationPriority = 'high';
    } else {
      messagesCtrl.important = false;
      messagesCtrl.notificationPriority = 'normal';
    }
  };

  /**
   * @name sendMessage
   * @description
   *
   * Adds a new annoucement to the database and if successful sends push notification to student members og that group
   *
   */
  messagesCtrl.sendMessage = function() {
    if (messagesCtrl.message.length > 0) {
      messagesCtrl.messages.$add({ // $add adds the message to firebase
        author: profile.displayName,
        authorUID: profile.$id,
        title: messagesCtrl.title,
        important: messagesCtrl.important,
        body: messagesCtrl.message,
        timestamp: firebase.database.ServerValue.TIMESTAMP
      }).then(function() { // if everything goes well(adding the message to firebase) send push notification and reset the message field to blank
        //filters students that have the app and  can receive notifications
        var tokens = [];
        for (var i = 0; i < messagesCtrl.tokens.length; i++) {
          for (var j = 0; j < messagesCtrl.groupMembers.length; j++) {
            if (messagesCtrl.tokens[i].email === messagesCtrl.groupMembers[j]) {
              tokens.push(messagesCtrl.tokens[i].fcmToken);
            }
          }
        }

        if (tokens.length > 0) { //if there is at least one token than send a push notification
          $http({
            method: 'POST',
            dataType: 'jsonp',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'key=' + 'AAAAPm5zcMc:APA91bHdHgPlgMRYOEnUFXIPe9dcYw3KgKk2_PatQXsBm-BtlvHVeb1OuSPCccc0yTGu_hRkqsAI9rGnHqWAfL3z7Rje9GD3tLOAYqv2N-y-eX9SSmhIT4deS98AjTvp1Br5NtuT-7Wd'
            },
            url: 'https://fcm.googleapis.com/fcm/send',
            data: JSON.stringify({
              'notification': {
                'body': messagesCtrl.message,
                'title': messagesCtrl.title,
              },
              'priority': messagesCtrl.notificationPriority,
              'registration_ids': tokens
            })
          });
        }

        messagesCtrl.message = '';
        messagesCtrl.title = '';
      });
    }
  };
});
