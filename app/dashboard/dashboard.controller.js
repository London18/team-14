const stopWords = new Set(["a","a's","able","about","above","according","accordingly","across","actually","after","afterwards","again","against","ain't","all","allow","allows","almost","alone","along","already","also","although","always","am","among","amongst","an","and","another","any","anybody","anyhow","anyone","anything","anyway","anyways","anywhere","apart","appear","appreciate","appropriate","are","aren't","around","as","aside","ask","asking","associated","at","available","away","awfully","b","be","became","because","become","becomes","becoming","been","before","beforehand","behind","being","believe","below","beside","besides","best","better","between","beyond","both","brief","but","by","c","c'mon","c's","came","can","can't","cannot","cant","cause","causes","certain","certainly","changes","clearly","co","com","come","comes","concerning","consequently","consider","considering","contain","containing","contains","corresponding","could","couldn't","course","currently","d","definitely","described","despite","did","didn't","different","do","does","doesn't","doing","don't","done","down","downwards","during","e","each","edu","eg","eight","either","else","elsewhere","enough","entirely","especially","et","etc","even","ever","every","everybody","everyone","everything","everywhere","ex","exactly","example","except","f","far","few","fifth","first","five","followed","following","follows","for","former","formerly","forth","four","from","further","furthermore","g","get","gets","getting","given","gives","go","goes","going","gone","got","gotten","greetings","h","had","hadn't","happens","hardly","has","hasn't","have","haven't","having","he","he's","hello","help","hence","her","here","here's","hereafter","hereby","herein","hereupon","hers","herself","hi","him","himself","his","hither","hopefully","how","howbeit","however","i","i'd","i'll","i'm","i've","ie","if","ignored","immediate","in","inasmuch","inc","indeed","indicate","indicated","indicates","inner","insofar","instead","into","inward","is","isn't","it","it'd","it'll","it's","its","itself","j","just","k","keep","keeps","kept","know","known","knows","l","last","lately","later","latter","latterly","least","less","lest","let","let's","like","liked","likely","little","look","looking","looks","ltd","m","mainly","many","may","maybe","me","mean","meanwhile","merely","might","more","moreover","most","mostly","much","must","my","myself","n","name","namely","nd","near","nearly","necessary","need","needs","neither","never","nevertheless","new","next","nine","no","nobody","non","none","noone","nor","normally","not","nothing","novel","now","nowhere","o","obviously","of","off","often","oh","ok","okay","old","on","once","one","ones","only","onto","or","other","others","otherwise","ought","our","ours","ourselves","out","outside","over","overall","own","p","particular","particularly","per","perhaps","placed","please","plus","possible","presumably","probably","provides","q","que","quite","qv","r","rather","rd","re","really","reasonably","regarding","regardless","regards","relatively","respectively","right","s","said","same","saw","say","saying","says","second","secondly","see","seeing","seem","seemed","seeming","seems","seen","self","selves","sensible","sent","serious","seriously","seven","several","shall","she","should","shouldn't","since","six","so","some","somebody","somehow","someone","something","sometime","sometimes","somewhat","somewhere","soon","sorry","specified","specify","specifying","still","sub","such","sup","sure","t","t's","take","taken","tell","tends","th","than","thank","thanks","thanx","that","that's","thats","the","their","theirs","them","themselves","then","thence","there","there's","thereafter","thereby","therefore","therein","theres","thereupon","these","they","they'd","they'll","they're","they've","think","third","this","thorough","thoroughly","those","though","three","through","throughout","thru","thus","to","together","too","took","toward","towards","tried","tries","truly","try","trying","twice","two","u","un","under","unfortunately","unless","unlikely","until","unto","up","upon","us","use","used","useful","uses","using","usually","uucp","v","value","various","very","via","viz","vs","w","want","wants","was","wasn't","way","we","we'd","we'll","we're","we've","welcome","well","went","were","weren't","what","what's","whatever","when","whence","whenever","where","where's","whereafter","whereas","whereby","wherein","whereupon","wherever","whether","which","while","whither","who","who's","whoever","whole","whom","whose","why","will","willing","wish","with","within","without","won't","wonder","would","wouldn't","x","y","yes","yet","you","you'd","you'll","you're","you've","your","yours","yourself","yourselves","z","zero"]);


app.controller('DashboardCtrl', function(Dashboard, Auth,$scope, $mdDialog, $state, $timeout, $q, $log) {
  var self = this;

    self.questions = Dashboard.all;
    self.selectedItem = null;



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

    self.querySearch = function(query) {
      if(query === "") return [];
      var results = query ? self.questions.filter( createFilterFor(query) ) : self.questions;
      console.log(results)
      return results;
    }

    /**
     * Create filter function for a query string
     */
    function createFilterFor(query) {
      var queryWords = query.toLowerCase().split(" ");
      return function filterFn(state) {
        return (state.Question.toLowerCase().split(" ").filter(word =>{
          return !stopWords.has(word)
        }).find((word) => {
          return queryWords.find(queryWord => {
            return word.indexOf(queryWord) >= 0
          })
        }));
      };
    }

    self.selectedItemChange = function(item){
      self.selectedItem = item;
    }

  $scope.showPrompt = function(ev) {
   // Appending dialog to document.body to cover sidenav in docs app
   var confirm = $mdDialog.prompt()
     .title('Please add a new question')
     .placeholder('New Question')
     .ariaLabel('New Question')``
     .initialValue('')
     .targetEvent(ev)
     .required(true)
     .ok('Done');

   $mdDialog.show(confirm).then(function(result) {
     $scope.status = 'You decided to name your dog ' + result + '.';
   }, function() {
     $scope.status = 'You didn\'t name your dog.';
   });
 };

  });
