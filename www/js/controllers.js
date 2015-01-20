angular.module('starter.controllers', [])

  .controller('PlayCtrl', function($scope, Settings, Player, $window, $ionicPopup) {

    $scope.quizStart = function(){
      $scope.progress = 0;

      Player.startQuiz(Settings.choices).then(function () {
        if (Player.hasQuestion()) {
          nextQuestion('Sorry!', 'Vocabulary is not big enough.');
        }
      }, function() {
        $ionicPopup.alert({
          title: 'Unable to start quiz',
          template: 'Vocabulary too small, please add more words.'
        });
      });
    };

    $scope.quizStop = function(){
      var popup = $ionicPopup.confirm({
        title: 'Quiz termination',
        template: 'Do you really want to stop this quiz?'
      });

      popup.then(function(res){
        if(res) {
          $scope.quizRunning = false;
        }
      });
    };

    function nextQuestion(popupTitle, popupContent){
      if (Player.hasQuestion()){
        var question = Player.nextQuestion();
        $scope.question = question.question;
        $scope.choices = question.answers;
        $scope.attempts = [];
        $scope.quizRunning = true;
      } else {
        var popup = $ionicPopup.alert({
          title: popupTitle,
          template: popupContent
        });

        popup.then(function(){
          $scope.quizRunning = false;
        });
      }
    }

    $scope.choose = function(index){
      if (Player.answer(index)) {
        nextQuestion('Congratulation!','You have finished the quiz.');
      } else {
        $scope.attempts[index] = true;
      }

      $scope.progress = Player.getProgress();
    }
  })

  .controller('SettingsCtrl', function($scope, Settings) {
    $scope.settings = Settings;
  })

  .controller('VocabularyCtrl', function($scope, vocabulary) {
    $scope.vocabulary = vocabulary.members;
  });
