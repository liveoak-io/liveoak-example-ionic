angular.module('starter.services', [])

  .factory('LiveOak', function ($log) {
    var liveoak = new LiveOak({host: 'localhost', port: 8080});

    return liveoak;
  })

  .factory('Quiz', function(LiveOak, $log, $q) {
    return {
      all: function() {
        var defered = $q.defer();

        LiveOak.connect( function() {
          LiveOak.read('/ionic/storage/quiz?fields=*(*)', {
            success: function(data) {
              defered.resolve(data);
            },
            error: function(data) {
              defered.reject(data);
              $log("Error: Unable to read quiz data.");
            }
          });
        });

        return defered.promise;
      }
    }
  })

  .factory('Player', function(Quiz, Settings) {

    var neededAttempts = 3;
    var quiz = [];
    var vocabulary = [];
    var pointer = 0;
    var l2r;

    function shuffle(array) {
      var currentIndex = array.length, temporaryValue, randomIndex ;

      // While there remain elements to shuffle...
      while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }

      return array;
    }

    function pickRandom(dstArray, srcArray, myCount){
      if (myCount === 0) {
        return dstArray
      }

      var random = Math.floor((Math.random() * srcArray.length));

      dstArray.push(l2r ? srcArray[random].right : srcArray[random].left);
      srcArray.splice(random, 1);

      return pickRandom(dstArray, srcArray, --myCount);
    }

    return {
      startQuiz: function(choiceCount) {
        l2r = Settings.l2r;

        var startPromise = Quiz.all().then(function(data){
          console.log(data);

          vocabulary = data.members;

          if (choiceCount > vocabulary.length){
            throw 'Vocabulary too small.';
          }

          quiz = [];
          pointer = -1;

          for (var i = 0; i < vocabulary.length; i++){
            var pair = vocabulary[i];
            var srcArray = vocabulary.slice();
            srcArray.splice(i, 1);

            var answers = shuffle(pickRandom([l2r ? pair.right : pair.left], srcArray, choiceCount - 1));
            var question = l2r ? pair.left : pair.right;
            var answer = l2r ? pair.right : pair.left;

            quiz.push({
              question: question,
              answers: answers,
              answer: answer,
              attempts: 0
            })
          }

          return shuffle(quiz);
        });

        return startPromise;
      },
      hasQuestion: function(){
        return quiz.length > 0;
      },
      nextQuestion: function(){
        pointer++;

        if (pointer >= quiz.length){
          pointer = 0;
        }

        return quiz[pointer];
      },
      answer: function(i){
        if (quiz[pointer].answers[i] === quiz[pointer].answer) {
          quiz[pointer].attempts++;
          if (quiz[pointer].attempts > (neededAttempts - 1)) {
            quiz.splice(pointer,1);
          }
          return true;
        } else {
          quiz[pointer].attempts = 0;
          return false;
        }
      },
      getProgress: function(){
        var sum = 0;

        for (var i = 0; i < quiz.length; i++){
          sum += quiz[i].attempts;
        }

        sum += 3*(vocabulary.length - quiz.length);

        return sum/(vocabulary.length * neededAttempts);
      }
    }
  })

  .factory('Settings', function() {
    return {
     choices: 4,
      l2r: true
    }
  });
