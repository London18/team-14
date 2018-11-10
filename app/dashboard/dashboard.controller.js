app.controller('DashboardCtrl', function(Dashboard, Auth, $state, $timeout, $q, $log) {
  var self = this;

    self.questions = Dashboard.all;


    self.logout = function() {
        Auth.$signOut().then(function() {
          $state.go('home');
        });
    };

    self.newQuestion = {
      question: '',
      answer: '',
      tags: ''
    };

    self.createEntry = function() {
       self.questions.$add({
         Answer: self.newQuestion.answer,
         Question: self.newQuestion.question,
         Tags: self.newQuestion.tags
       }).then(function(ref) {
         $state.go('dashboard');
       });
       self.availableUsers = self.users; // re-initialise the available users
   };



    self.loadAll = function() {
      var allQuestions = [];

      for (var i = 0; i <   self.questions.length; i++) {
        if (self.questions[i]) {
          allQuestions.push(self.questions[i].Question);
        }
      }

      return allQuestions.map(function(question) {
        return question.toLowerCase();
      });
    };

    self.querySearch = function(query) {
      var results = query ? self.loadAll().filter( createFilterFor(query) ) : self.loadAll()
        return results;
    }

    /**
     * Create filter function for a query string
     */
    function createFilterFor(query) {
      var lowercaseQuery = query.toLowerCase();

      return function filterFn(state) {
        return (state.value.indexOf(lowercaseQuery) === 0);
      };

    }
  });
