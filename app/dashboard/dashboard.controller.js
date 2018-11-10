app.controller('DashboardCtrl', function(Dashboard, Auth, $state, $timeout, $q, $log) {
  var self = this;

    self.simulateQuery = false;
    self.isDisabled    = false;
    self.questions = Dashboard.getArray();

    self.states        = loadAll();
    self.querySearch   = querySearch;
    self.selectedItemChange = selectedItemChange;
    self.searchTextChange   = searchTextChange;


    self.logout = function() {
      self.profile.online = null;
      self.profile.$save().then(function() {
        Auth.$signOut().then(function() {
          $state.go('home');
        });
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

   function addToArray () {
     var array = []
     for (var i = 0; i < self.questions.length; i++) {
       arrray.push(self.questions[i])
     }
     return array
    };

    console.log(addToArray())

    function querySearch (query) {
      var results = query ? self.states.filter( createFilterFor(query) ) : self.states,
          deferred;
      if (self.simulateQuery) {
        deferred = $q.defer();
        $timeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);
        return deferred.promise;
      } else {
        return results;
      }
    }

    function searchTextChange(text) {
      $log.info('Text changed to ' + text);
    }

    function selectedItemChange(item) {
      $log.info('Item changed to ' + JSON.stringify(item));
    }

    /**
     * Build `states` list of key/value pairs
     */
    function loadAll() {
      var allStates = ""

      return allStates.split(/, +/g).map( function (state) {
        return {
          value: state.toLowerCase(),
          display: state
        };
      });
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
