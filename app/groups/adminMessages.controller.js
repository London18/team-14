'use strict';
/**
 * @name adminMessages.controller:AdminMessagesCtrl
 * @description
 *
 * @requires profile
 * @requires groupName
 * @requires messages
 */
app.controller('AdminMessagesCtrl', function(profile, groupName, messages) {
  var messagesCtrl = this;

  messagesCtrl.messages = messages;
  messagesCtrl.adminName = groupName;
  messagesCtrl.message = '';

  /**
   * @name  sendMessage
   * @methodOf adminMessagesCtrl.controller:AdminMessagesCtrl
   * @description
   *
   * Adds a new message to the database giving it uid, body(message itself) and a timestamp
   *
   */
  messagesCtrl.sendMessage = function() {
    if (messagesCtrl.message.length > 0) {
      messagesCtrl.messages.$add({ //$add adds the message to firebase
        uid: profile.$id,
        body: messagesCtrl.message,
        timestamp: firebase.database.ServerValue.TIMESTAMP
      }).then(function() { //if everything goes well(adding the message to firebase) reset the message field to blank
        messagesCtrl.message = '';
      });
    }
  };
});
